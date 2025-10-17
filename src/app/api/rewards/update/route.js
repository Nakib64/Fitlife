// /app/api/rewards/update/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email)
      return NextResponse.json({ message: "Email required" }, { status: 400 });

    // Connect to collections
    const userWorkout = await dbConnect("userWorkout");
    const rewards = await dbConnect("rewards");

    // Fetch workout data
    const workoutData = await userWorkout.findOne({ email });
    if (!workoutData)
      return NextResponse.json({ message: "Workout not found" }, { status: 404 });

    // ✅ Count completed exercises properly
    let completedCount = 0;
    if (workoutData.data && Array.isArray(workoutData.data)) {
      workoutData.data.forEach((day) => {
        if (day.exercises && Array.isArray(day.exercises)) {
          day.exercises.forEach((ex) => {
            if (ex.completed) completedCount++;
          });
        }
      });
    }

    console.log(`User ${email} has completed ${completedCount} exercises.`);

    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // Fetch existing reward data
    let reward = await rewards.findOne({ email });

    // 🆕 Case 1: First-time user — initialize reward
    if (!reward) {
      const newReward = {
        email,
        xp: completedCount * 10, // XP for completed exercises
        totalCompleted: completedCount,
        level: 1,
        nextLevelXP: 1000,
        streak: completedCount > 0 ? 1 : 0,
        lastWorkoutDate: completedCount > 0 ? today : null,
        badges: [],
        createdAt: new Date(),
      };
      await rewards.insertOne(newReward);
      return NextResponse.json(
        { message: "New user reward initialized", reward: newReward },
        { status: 200 }
      );
    }

    // 🧮 Case 2: Existing user — update reward
    let {
      xp,
      level,
      nextLevelXP,
      streak,
      lastWorkoutDate,
      badges = [],
      totalCompleted = 0,
    } = reward;

    const newCompleted = completedCount - totalCompleted;
    const gainedXP = newCompleted > 0 ? newCompleted * 10 : 0;
    let newXP = xp + gainedXP;
    let newLevel = level;
    let newStreak = streak;

    // 🔥 Streak logic
    if (lastWorkoutDate === yesterday.toDateString()) {
      newStreak += 1;
    } else if (lastWorkoutDate !== today) {
      newStreak = completedCount > 0 ? 1 : 0;
    }

    // 🆙 Level-up logic
    while (newXP >= nextLevelXP) {
      newLevel++;
      newXP -= nextLevelXP;
    }

    // 🏅 Badge logic
    if (newStreak === 3 && !badges.includes("🔥 3-Day Streak"))
      badges.push("🔥 3-Day Streak");
    if (newStreak === 7 && !badges.includes("🏅 Weekly Warrior"))
      badges.push("🏅 Weekly Warrior");
    if (newLevel >= 5 && !badges.includes("💪 Fitness Pro"))
      badges.push("💪 Fitness Pro");
    if (completedCount >= 100 && !badges.includes("⚡ Power Starter"))
      badges.push("⚡ Power Starter");

    // ✅ Update reward in DB
    await rewards.updateOne(
      { email },
      {
        $set: {
          xp: newXP,
          level: newLevel,
          nextLevelXP,
          streak: newStreak,
          totalCompleted: completedCount,
          lastWorkoutDate: completedCount > 0 ? today : lastWorkoutDate,
          badges,
        },
      }
    );

    reward = {
      ...reward,
      xp: newXP,
      level: newLevel,
      streak: newStreak,
      badges,
      totalCompleted: completedCount,
    };
console.log(totalCompleted);
    return NextResponse.json(
      { message: "Rewards updated successfully", reward },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating rewards:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
