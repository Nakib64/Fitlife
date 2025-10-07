import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/user";

export async function POST(req) {
  try {
    const body = await req.json();
    // console.log("Received body:", body);

    const { email, otp} = body;

    const ok = await verifyOtp(email, otp);
    // console.log("OTP verification result:", ok);

    if (ok) {
      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
    }
  } catch (err) {
    console.error("OTP route error:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
