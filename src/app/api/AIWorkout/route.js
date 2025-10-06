export async function POST(req) {
	try {
		const userData = await req.json();

		// --- Step 1: Make API Call ---
		const response = await fetch(
			"https://openrouter.ai/api/v1/chat/completions",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
				},
				body: JSON.stringify({
					model: "deepseek/deepseek-chat-v3.1:free", // ⚡ Faster model
					messages: [
						{
							role: "system",
							content:
								"You are a professional fitness coach. Respond ONLY with a object 'plan', nothing else",
						},
						{
							role: "user",
							content: `
Generate a ${userData.days_per_week}-day workout plan for 4 weeks and total day objects will be 4*${userData.days_per_week}.
The plan should gradually increase in intensity each week.

Translate exercise names into ${userData.language}, 
but keep JSON keys ("day", "exercises", "name", "sets", "reps") in English.

User details:
- Age: ${userData.age}
- Gender: ${userData.gender}
- Goal: ${userData.goal}
- Fitness level: ${userData.fitness_level}
- Equipment: ${userData.equipment}
- Session length: ${userData.time_per_session_minutes} minutes

Only use simple, common exercises (e.g., Push-ups, Squats, Lunges, Plank).
If no equipment, only use bodyweight exercises.

Respond in this format:
{
  "plan": [
    { "day": "Day 1", "exercises": [ { "name": "Push-ups", "sets": 3, "reps": 12 } ] }
  ]
}
`,
						},
					],
				}),
			}
		);

		const data = await response.json();

		let plan = [];

		// --- Step 2: Parse AI Response ---
		try {
			console.log(data.choices?.[0]?.message?.content);
			if (data?.choices?.[0]?.message?.content) {
				let content = data.choices[0].message.content;

				// Remove markdown fences
				content = content.replace(/```json|```/g, "");

				// Keep only from the first { onward
				const firstBraceIndex = content.indexOf("{");
				if (firstBraceIndex !== -1) {
					content = content.slice(firstBraceIndex);
				}

				// Trim whitespace
				content = content.trim();

				try {
					const parsed = JSON.parse(content);
					plan = parsed.plan || [];
					console.log("✅ Plan parsed successfully:", plan);
				} catch (error) {
					console.error("⚠️ Parsing error:", error);
				}
			}
		} catch (error) {
			console.error("⚠️ Parsing error:", error);
		}

		// --- Step 3: Handle Invalid Response ---
		if (!plan.length) {
			return new Response(
				JSON.stringify({
					error: "AI failed to generate a valid workout plan. Please try again.",
				}),
				{ status: 400 }
			);
		}

		// --- Step 4: Return Plan ---
		return new Response(JSON.stringify({ plan }), { status: 200 });
	} catch (err) {
		console.error("❌ Server error:", err);
		return new Response(
			JSON.stringify({ error: "Failed to generate workout plan." }),
			{ status: 500 }
		);
	}
}
