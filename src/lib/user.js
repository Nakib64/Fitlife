import bcrypt from "bcrypt";
import dbConnect from "./dbConnect";
import { ObjectId } from "mongodb";

export const findUserByEmail = async (email) => {
  const users = await dbConnect("users");
  return users.findOne({ email });
};

export const findUserById = async (id) => {
  const users = await dbConnect("users");
  return users.findOne({ _id: new ObjectId(id) });
};

export const createUser = async ({ name, email, password }) => {
  const users = await dbConnect("users");
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
    failedLoginAttempts: 0,
    lockUntil: null,
    role: "user",
    isBanned: false,
  };

  const result = await users.insertOne(newUser);
  return result;
};

//function to update user by email
export const updateUser = async (identifier, updateFields) => {
  const users = await dbConnect("users");
  const filter =
    typeof identifier === "string" && identifier.includes("@")
      ? { email: identifier }
      : { _id: new ObjectId(identifier) };

  return users.updateOne(filter, { $set: updateFields });
};

//set new otp on users login
export const setUserOtp = async (email, otp, ttlMs = 5 * 60 * 1000) => {
  const users = await dbConnect("users");
  const otpExpires = Date.now() + ttlMs;
  await users.updateOne({ email }, { $set: { otpCode: otp, otpExpires } });
};

//verify otp and clear it on success
export const verifyOtp = async (email, otp) => {
  const users = await dbConnect("users");
  const user = await users.findOne({ email });
  // console.log("User in DB:", user);

  if (!user || !user.otpCode || !user.otpExpires) {
    return false;
  }

  // console.log("Comparing OTP:", otp, "with stored OTP:", user.otpCode);
  // console.log("Expiry check:", user.otpExpires > Date.now());

  if (
    String(user.otpCode) === String(otp) &&
    new Date(user.otpExpires).getTime() > Date.now()
  ) {
    await users.updateOne({ email }, { $unset: { otpCode: 1, otpExpires: 1 } });
    return true;
  }
  return false;
};

// clear OTP
export const clearUserOtp = async (email) => {
  const users = await dbConnect("users");
  await users.updateOne({ email }, { $unset: { otpCode: "", otpExpires: "" } });
};
