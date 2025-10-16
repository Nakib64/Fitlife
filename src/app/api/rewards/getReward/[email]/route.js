// /app/api/rewards/getReward/[email]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET(req, { params }) {
  try {
    const { email } = await params;
    if (!email)
      return NextResponse.json({ message: "Email required" }, { status: 400 });

    const rewards = await dbConnect("rewards");
    let rewardData = await rewards.findOne({ email });

    // 🆕 If no reward found, create a default empty one
    if (!rewardData) {
      rewardData = {
        email,
        xp: 0,
        totalCompleted: 0,
        level: 1,
        nextLevelXP: 1000,
        streak: 0,
        lastWorkoutDate: null,
        badges: [],
        createdAt: new Date(),
      };

      // ✅ Optionally insert this new reward into DB
      await rewards.insertOne(rewardData);

      console.log(`New reward profile created for ${email}`);
    }

    return NextResponse.json({ reward: rewardData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reward:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
