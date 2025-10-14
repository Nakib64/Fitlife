import dbConnect from "@/lib/dbConnect";
import { getToken } from "next-auth/jwt";

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return new Response(
      JSON.stringify({ error: "Unauthorized access" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const usersCollection = await dbConnect("users");

    // Parse query params
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const roleFilter = searchParams.get("role") || ""; // role filter
    const search = searchParams.get("search") || ""; // optional search by name/email
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    if (roleFilter && roleFilter !== "all") query.role = roleFilter;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Role priority for sorting
    const rolePriority = {
      admin: 1,
      coach: 2,
      controller: 3,
      "premium-user": 4,
      user: 5,
    };

    // Get total count with filter
    const total = await usersCollection.countDocuments(query);

    // Fetch users with pagination, filtering, and custom role sort
    const users = await usersCollection
      .aggregate([
        { $match: query },
        {
          $addFields: {
            roleOrder: {
              $switch: {
                branches: Object.entries(rolePriority).map(([role, order]) => ({
                  case: { $eq: ["$role", role] },
                  then: order,
                })),
                default: 99,
              },
            },
          },
        },
        { $sort: { roleOrder: 1, name: 1 } }, // admin first, then name
        { $skip: skip },
        { $limit: limit },
      ])
      .toArray();

    // Remove sensitive fields
    const safeUsers = users.map(({ password, otpCode, otpExpires, ...rest }) => rest);

    // Pagination info
    const pagination = {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };

    return new Response(
      JSON.stringify({ users: safeUsers, pagination }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch users" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
