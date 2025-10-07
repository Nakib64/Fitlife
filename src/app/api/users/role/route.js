import { updateUser, findUserByEmail } from "@/lib/user";
import { getToken } from "next-auth/jwt";

export async function PATCH(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Only admins can update roles
  if (!token || token.role !== "admin") {
    return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
  }

  try {
    const { email, role } = await req.json();

    // Validate input
    if (!email || !role) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const validRoles = ["user", "admin", "coach"];
    if (!validRoles.includes(role)) {
      return new Response(JSON.stringify({ error: "Invalid role" }), { status: 400 });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    await updateUser(email, { role });

    return new Response(JSON.stringify({ ok: true, role }), { status: 200 });
  } catch (error) {
    console.error("Error updating role:", error);
    return new Response(JSON.stringify({ error: "Failed to update role" }), { status: 500 });
  }
}
