import dbConnect from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const usersCollection = await dbConnect("users");

    const users = await usersCollection.find({}).toArray();

    const safeUsers = users.map(({ password, otpCode, otpExpires, ...rest }) => rest);

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
