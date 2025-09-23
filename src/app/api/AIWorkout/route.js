export async function POST(req) {
	try {
		const userData = await req.json();

		const response = await fetch(
			"https://openrouter.ai/api/v1/chat/completions",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
				},
				body: JSON.stringify({
					model: "x-ai/grok-4-fast:free", // swap with any available model
					messages: [
						{
							role: "system",
							content:
								"You are a fitness coach. Generate 1 month's structured workout plans in JSON format.",
						},
						{
							role: "user",
							content: `Generate a ${userData.days_per_week}-day workout plan for 4 weeks (1 month). 
            The intensity should gradually increase week by week. 
            User details: 
            - Age: ${userData.age} years old
            - Gender: ${userData.gender}
            - Goal: ${userData.goal}
            - Fitness Level: ${userData.fitness_level}
            - gym equipment: ${userData.equipment}
            - Time per session: ${userData.time_per_session_minutes} minutes

            Use only **common exercises that most people know**, such as:
            - Push-ups, Squats, Lunges, Plank, Sit-ups, Crunches, Mountain Climbers, Jumping Jacks, Pull-ups, Dips, Running, Walking, Burpees, Deadlifts, Bench Press, Shoulder Press, Bicep Curls.

            Do not use complex gym machine names or unusual exercises.
			if user don't have gym equipment, use only exercises which does not need equipment.

            Respond ONLY with valid JSON in this exact structure:
            {
              "plan": [
                { "day": "Day 1", "exercises": [ { "name": "Push-ups", "sets": 3, "reps": 12 } ] },
                { "day": "Day 2", "exercises": [ { "name": "Squats", "sets": 3, "reps": 15 } ] }
              ]
            }
            Do not include explanations, markdown, or extra text. Only JSON.`
						},
					],
				}),
			}
		);

		const data = await response.json();

		// Parse AI response (safe fallback)
		let plan = [];
		try {
			plan = JSON.parse(data.choices[0].message.content).plan;
		} catch (e) {
			console.error("Parsing error:", e);
		}

		return new Response(JSON.stringify({ plan }), { status: 200 });
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ error: "Failed to generate workout" }), {
			status: 500,
		});
	}
}
