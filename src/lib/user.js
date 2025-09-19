import bcrypt from "bcrypt";
import dbConnect from "./dbConnect";

export const findUserByEmail = async (email) => {
  const users = await dbConnect("users");
  return users.findOne({ email });
};

export const createUser = async ({ name, email, password }) => {
  const users = await dbConnect("users");
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    email,
    password: hashedPassword,
    createdAt: new Date()
  }

  const result = await users.insertOne(newUser)
  return result
};
