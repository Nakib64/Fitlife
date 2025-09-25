import { sendOtpEmail } from "@/lib/mailer";
const { findUserByEmail, createUser, setUserOtp } = require("@/lib/user");
const { NextResponse } = require("next/server");

export const POST = async (req) => {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    await createUser({ name, email, password });

    // generate and save OTP and email it
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await setUserOtp(email, otp);

    try {
      await sendOtpEmail(email, otp);
    } catch (err) {
      console.error("Failed to send OTP email:", err);
     
    }


    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
