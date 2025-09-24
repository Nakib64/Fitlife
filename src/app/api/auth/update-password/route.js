import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const { token, password } = await req.json();
    const users = await dbConnect("users");

    const user = await users.findOne({ resetToken: token });
    if (!user || new Date(user.resetTokenExpiry) < new Date()) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await users.updateOne(
      { resetToken: token },
      {
        $set: { password: hashedPassword },
        $unset: { resetToken: 1, resetTokenExpiry: 1 },
      }
    );

    return new Response(
      JSON.stringify({ message: "Password updated successfully" }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
