"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaTrophy, FaMedal, FaCrown, FaDumbbell, FaBolt, FaBrain } from "react-icons/fa";

export default function GamificationPage() {
  const [user, setUser] = useState({
    name: "Alex Carter",
    level: 8,
    xp: 7200,
    nextLevelXP: 10000,
    streak: 23,
    avatarColor: "#10b981",
    badges: ["🔥", "🏆", "💪", "⚡"],
    aiPower: 65,
  });

  const xpData = [
    { day: "Mon", xp: 400 },
    { day: "Tue", xp: 300 },
    { day: "Wed", xp: 600 },
    { day: "Thu", xp: 800 },
    { day: "Fri", xp: 900 },
    { day: "Sat", xp: 700 },
    { day: "Sun", xp: 1000 },
  ];

  const challenges = [
    { id: 1, title: "Complete 3 Workouts", xp: 500, icon: <FaDumbbell /> },
    { id: 2, title: "Generate Meal Plan", xp: 300, icon: <FaBolt /> },
    { id: 3, title: "Hit 10k Steps", xp: 400, icon: <FaDumbbell /> },
  ];

  const handleChallengeComplete = (xp) => {
    const newXP = user.xp + xp;
    const levelUp = newXP >= user.nextLevelXP;
    setUser({
      ...user,
      xp: levelUp ? newXP - user.nextLevelXP : newXP,
      level: levelUp ? user.level + 1 : user.level,
      streak: user.streak + 1,
      badges: levelUp ? [...user.badges, "🏅"] : user.badges,
    });
  };

  const cardShadow = "shadow-[0_8px_20px_rgba(0,0,0,0.08),0_0px_10px_rgba(0,0,0,0.05)]";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 md:px-10 py-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-6xl pb-5 font-extrabold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text mb-3">
            Gamify Your Fitness Journey
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 md:text-lg">
            Track progress, complete challenges, and unlock achievements!
          </p>
        </motion.div>

        {/* PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 p-6 rounded-3xl ${cardShadow} flex flex-col md:flex-row items-center justify-between gap-6 transition-colors duration-500`}
        >
          <div className="flex items-center gap-5">
            <div
              className="relative w-24 h-24 rounded-full shadow-lg flex items-center justify-center text-white text-3xl font-bold"
              style={{ backgroundColor: user.avatarColor }}
            >
              {user.name[0]}
              <div className="absolute bottom-0 right-0 text-yellow-400 text-2xl">
                <FaCrown />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-green-500 dark:text-green-400">
                Level {user.level} | Streak: {user.streak}🔥
              </p>
              <div className="w-52 bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-400 via-green-500 to-teal-400 h-3 rounded-full transition-all"
                  style={{ width: `${(user.xp / user.nextLevelXP) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                XP: {user.xp}/{user.nextLevelXP}
              </p>
            </div>
          </div>
          <div className="flex gap-3 text-3xl">
            {user.badges.map((b, i) => (
              <motion.span key={i} whileHover={{ scale: 1.3 }}>
                {b}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* AI POWER METER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`bg-white dark:bg-gray-800/80 p-5 rounded-3xl border border-gray-200 dark:border-gray-700 ${cardShadow} transition-colors duration-500`}
        >
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-purple-600">
            <FaBrain /> AI Power
          </h3>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
            <motion.div
              className="h-4 bg-gradient-to-r from-green-400 via-green-500 to-teal-400 rounded-full"
              animate={{ width: `${user.aiPower}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-gray-500 dark:text-gray-300 mt-1">{user.aiPower}% efficiency</p>
        </motion.div>

        {/* CHALLENGES */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-3 gap-5"
        >
          {challenges.map((ch) => (
            <motion.div
              key={ch.id}
              whileHover={{ scale: 1.05 }}
              className={`bg-white dark:bg-gray-800/80 p-5 rounded-2xl flex flex-col justify-between hover:shadow-xl transition-all duration-500 ${cardShadow}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">{ch.title}</h3>
                <span className="text-2xl text-green-400">{ch.icon}</span>
              </div>
              <p className="text-gray-500 dark:text-gray-300 mb-2">+{ch.xp} XP</p>
              <button
                onClick={() => handleChallengeComplete(ch.xp)}
                className="py-2 bg-gradient-to-r from-[#7CCF00] via-[#A8E600] to-[#7CCF00] text-gray-900 dark:text-gray-900 rounded-full hover:opacity-90 font-medium transition"
              >
                Complete
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* WEEKLY XP CHART */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`bg-white dark:bg-gray-800/80 p-5 rounded-3xl border border-gray-200 dark:border-gray-700 ${cardShadow} transition-colors duration-500`}
        >
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-green-600">
            <FaTrophy /> Weekly XP
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={xpData}>
              <XAxis stroke="#10b981" strokeWidth={1} dataKey="day" />
              <YAxis stroke="#10b981" strokeWidth={1} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  color: "#d1d5db",
                }}
              />
              <Line type="monotone" dataKey="xp" stroke="#10b981" strokeWidth={3} dot={{ fill: "#34d399" }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ACHIEVEMENTS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-3 gap-5"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`bg-white dark:bg-gray-800/80 p-5 rounded-3xl flex flex-col items-center text-center hover:shadow-xl transition-all duration-500 ${cardShadow}`}
            >
              <div className="text-4xl text-yellow-400 mb-2">
                <FaMedal />
              </div>
              <h4 className="font-semibold">Achievement #{i}</h4>
              <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
                Unlocked for milestones
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* LEADERBOARD */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`bg-white dark:bg-gray-800/80 p-5 rounded-3xl border border-gray-200 dark:border-gray-700 ${cardShadow} transition-colors duration-500`}
        >
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-yellow-400">
            <FaCrown /> Leaderboard
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[{ name: "Ava", xp: 9800 }, { name: "Liam", xp: 8700 }, { name: "Noah", xp: 8300 }].map((u, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className={`flex justify-between bg-white dark:bg-gray-800/80 p-4 rounded-2xl transition-all duration-500 shadow-md hover:shadow-xl`}
              >
                <p className="font-medium">#{i + 1} {u.name}</p>
                <p className="text-green-400 font-medium">{u.xp} XP</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
