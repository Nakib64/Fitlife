import { getGifUrlsByWorkouts } from "@/lib/exerciseApi";

export async function POST(req) {
  try {
    const userData = await req.json();

    // --- Step 1: Call OpenRouter (AI model) ---
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b:free",
        messages: [
          {
            role: "system",
            content: "You are a professional fitness coach. Respond ONLY with a JSON object named 'plan'.",
          },
          {
            role: "user",
            content: `Generate a ${userData.days_per_week}-day-per-week workout plan for 4 weeks 
(total ${4 * userData.days_per_week} day objects). 
The plan should gradually increase in intensity each week.

All exercise names must remain in English exactly as stored in the official ExerciseDB API.
Do not translate exercise names. Only translate other text if necessary, 
but keep all JSON keys and exercise names in English.

User details:
- Age: ${userData.age}
- Gender: ${userData.gender}
- Goal: ${userData.goal}
- Fitness level: ${userData.fitness_level}
- Equipment: ${userData.equipment}
- Session length: ${userData.time_per_session_minutes} minutes

Guidelines:
- Use only simple, common exercises available in the official ExerciseDB API (e.g., "push-up", "squat", "plank", "lunge", etc.).
- If equipment = "none", use only bodyweight exercises.
- Gradually increase sets or reps each week to show progression.
- Exercise names must be lowercase, singular, and API-compatible.
- The "exerciseNames" array must contain all unique exercise names used across the entire plan.

Respond in this JSON format only:
{
  "plan": [
    {
      "day": "Day 1",
      "exercises": [
        { "name": "push-up", "sets": 3, "reps": 12 },
        { "name": "squat", "sets": 3, "reps": 15 }
      ]
    }
  ],
  "exerciseNames": [
    "push-up",
    "squat"
  ]
}
`,
          },
        ],
      }),
    });

    const data = await response.json();
    let plan = [];
    let exerciseNames = [];

    // --- Step 2: Parse AI response ---
    try {
      const content = data?.choices?.[0]?.message?.content?.replace(/```json|```/g, "")?.trim() || "";
      const firstBraceIndex = content.indexOf("{");
      const jsonStr = firstBraceIndex !== -1 ? content.slice(firstBraceIndex) : content;
      const parsed = JSON.parse(jsonStr);

      plan = parsed.plan || [];
      exerciseNames = parsed.exerciseNames || [];
      console.log("✅ Plan parsed successfully:", plan.length, "days");
    } catch (err) {
      console.error("⚠️ Parsing error:", err);
    }

    if (!plan.length || !exerciseNames.length) {
      return new Response(
        JSON.stringify({ error: "AI failed to generate a valid workout plan." }),
        { status: 400 }
      );
    }

    // --- Step 3: Fetch GIF URLs for each exercise ---
    const gifUrls = await getGifUrlsByWorkouts(exerciseNames);

    // --- Step 4: Merge GIF URLs into the plan ---
    const planWithGifs = plan.map((day) => ({
      ...day,
      exercises: day.exercises.map((ex) => {
        const idx = exerciseNames.indexOf(ex.name.toLowerCase());
        return {
          ...ex,
          gifUrl: gifUrls[idx] || null,
        };
      }),
    }));

	console.log(planWithGifs);
    // --- Step 5: Return the completed plan ---
    return new Response(JSON.stringify({ plan: planWithGifs }), { status: 200 });
  } catch (err) {
    console.error("❌ Server error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to generate workout plan." }),
      { status: 500 }
    );
  }
}
