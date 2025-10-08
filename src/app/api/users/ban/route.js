import { updateUser, findUserByEmail } from "@/lib/user";
import { getToken } from "next-auth/jwt";

export async function PATCH(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token ) {
    return new Response(JSON.stringify({ error: "unauthorized access" }), { status: 401 });
  }

  try {
    const { email } = await req.json();

    // fetch current user
    const user = await findUserByEmail(email);
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // toggle isBanned
    const newStatus = !user.isBanned;
    await updateUser(email, { isBanned: newStatus });

    return new Response(JSON.stringify({ ok: true, isBanned: newStatus }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to update user" }), { status: 500 });
  }
}
