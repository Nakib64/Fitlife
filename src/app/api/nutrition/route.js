// app/api/nutrition/route.js
import { NextResponse } from "next/server";

// Helper for fallback meal suggestions
function sampleDishForMeal(mealName, dietType) {
  const base = {
    Breakfast: [
      "Avocado toast with egg and cherry tomatoes",
      "Oatmeal with almond butter and banana",
      "Greek yogurt with mixed berries & granola",
    ],
    Lunch: [
      "Grilled salmon, quinoa & steamed greens",
      "Chicken & brown rice bowl with veggies",
      "Lentil salad with roasted vegetables",
    ],
    Dinner: [
      "Turkey meatballs with zucchini noodles",
      "Grilled steak, sweet potato & broccoli",
      "Tofu stir-fry with brown rice",
    ],
    Snack: [
      "Protein smoothie (banana + whey + peanut butter)",
      "Apple with almond butter",
      "Cottage cheese & berries",
    ],
  };
  const arr = base[mealName] || base["Lunch"];
  if (dietType === "Vegetarian")
    return arr.find((s) => s.toLowerCase().includes("tofu") || s.toLowerCase().includes("lentil")) || arr[0];
  if (dietType === "Vegan")
    return arr.find((s) => !s.toLowerCase().includes("chicken") && !s.toLowerCase().includes("salmon")) || arr[0];
  if (dietType === "Keto")
    return arr.find((s) => s.toLowerCase().includes("steak") || s.toLowerCase().includes("meat")) || arr[0];
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function POST(req) {
  try {
    const body = await req.json();
    const form = body.form || {};

    // AI prompt
    const prompt = `
You are a professional registered dietitian. Given the user JSON below, generate a ONE-DAY meal plan (or up to the selected meal types) that meets the user's calorie & macro targets if provided. Return ONLY valid JSON, nothing else.

USER:
${JSON.stringify(form)}

OUTPUT FORMAT (JSON):
{
  "generatedAt": "<ISO timestamp>",
  "summary": "short single-line summary",
  "meals": [
    {
      "name": "Breakfast",
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fat": 0,
      "sample": "Short dish name / 1-line description",
      "notes": "optional notes e.g. substitutions"
    }
  ]
}

If the user provided targets (calories/protein/carbs/fat), try to honour them approximately. Avoid ingredients based on dietType/allergies. Include only the meal types present in form.meals. Keep numbers realistic.
`;

    const OPENROUTER_API_KEY_MEAL = process.env.OPENROUTER_API_KEY_MEAL;

    if (OPENROUTER_API_KEY_MEAL) {
      console.log("Using OpenRouter AI");

      const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY_MEAL}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful dietitian and respond only in JSON as requested." },
            { role: "user", content: prompt },
          ],
          max_tokens: 1000,
          temperature: 0.2,
        }),
      });

      const data = await resp.json();

      // Extract text from response
      const text = data?.choices?.[0]?.message?.content ?? data?.output?.[0]?.content ?? "";

      // Try parsing AI JSON safely
      try {
        const plan = JSON.parse(text);
        plan.source = "AI"; // mark as AI-generated
        return NextResponse.json({ plan });
      } catch (err) {
        console.warn("Failed to parse AI JSON, returning raw text.", err);
        return NextResponse.json({ planText: text, source: "AI" });
      }

    } else {
      console.log("Using local fallback dummy data");

      const targetCalories = Number(form.calories) || 2000;
      const distribution = {
        Breakfast: Math.round(targetCalories * 0.25),
        Lunch: Math.round(targetCalories * 0.3),
        Dinner: Math.round(targetCalories * 0.3),
        Snack: Math.round(targetCalories * 0.15),
      };

      const meals = (form.meals || ["Breakfast", "Lunch", "Dinner", "Snack"]).map((m) => {
        const cals = distribution[m] || Math.round(targetCalories / 3);
        const proteinG = Math.round((cals * 0.3) / 4);
        const carbsG = Math.round((cals * 0.45) / 4);
        const fatG = Math.round((cals * 0.25) / 9);
        return {
          name: m,
          calories: cals,
          protein: proteinG,
          carbs: carbsG,
          fat: fatG,
          sample: sampleDishForMeal(m, form.dietType || "Anything"),
          notes: "",
        };
      });

      const plan = {
        generatedAt: new Date().toISOString(),
        summary: `Auto-generated fallback plan ~${targetCalories} kcal`,
        meals,
        source: "Dummy",
      };

      return NextResponse.json({ plan });
    }

  } catch (err) {
    console.error("Error in /api/nutrition:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
