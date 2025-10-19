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

function generateFallbackPlan(form) {
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

  return {
    generatedAt: new Date().toISOString(),
    summary: `Auto-generated fallback plan ~${targetCalories} kcal`,
    meals,
    source: "Fallback",
  };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const form = body.form || {};
    const apiKey = process.env.OPENROUTER_API_KEY_MEAL;

    if (!apiKey) {
      console.warn("⚠️ No OpenRouter API key found — using fallback data.");
      return NextResponse.json({ plan: generateFallbackPlan(form) });
    }

    // Build prompt
    const prompt = `
You are a registered dietitian. Given the user JSON below, generate a realistic one-day meal plan as JSON only.

USER:
${JSON.stringify(form)}

OUTPUT FORMAT (JSON):
{
  "generatedAt": "<ISO timestamp>",
  "summary": "short summary",
  "meals": [
    { "name": "Breakfast", "calories": 0, "protein": 0, "carbs": 0, "fat": 0, "sample": "short dish name" }
  ]
}
`;

    const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful dietitian and respond only in JSON." },
          { role: "user", content: prompt },
        ],
        max_tokens: 1000,
        temperature: 0.2,
      }),
    });

    const data = await resp.json();

    const text =
      data?.choices?.[0]?.message?.content?.trim() ||
      data?.output?.[0]?.content?.trim() ||
      "";

    if (!text) {
      console.warn("Empty response from AI, using fallback plan.");
      return NextResponse.json({ plan: generateFallbackPlan(form) });
    }

    try {
      const plan = JSON.parse(text);
      plan.source = "AI";
      return NextResponse.json({ plan });
    } catch (err) {
      console.warn("⚠️ Failed to parse AI JSON, using fallback plan.");
      return NextResponse.json({ plan: generateFallbackPlan(form) });
    }
  } catch (err) {
    console.error("❌ Error in /api/nutrition:", err);
    return NextResponse.json({ plan: generateFallbackPlan({}) });
  }
}
