import dbConnect from "@/lib/dbConnect";
import { getToken } from "next-auth/jwt";

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized access" }), {
      status: 401,
    });
  }

  try {
    const usersCollection = await dbConnect("users");

    const users = await usersCollection.find({}).toArray();

    const safeUsers = users.map(
      ({ password, otpCode, otpExpires, ...rest }) => rest
    );

    return new Response(JSON.stringify(safeUsers), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}