"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaRulerVertical,
  FaWeight,
  FaVenusMars,
  FaRunning,
  FaAppleAlt,
  FaSyncAlt,
  FaCookieBite,
  FaMoneyBillWave
} from "react-icons/fa";

/* ---------- Utility Inputs ---------- */
function FormInput({ icon, label, placeholder, value, onChange, type = "text" }) {
  return (
    <label className="block">
      <div className="text-xs text-gray-500 font-semibold mb-2">{label}</div>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">{icon}</div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#ecfbf3] border border-transparent focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>
    </label>
  );
}

function SelectInput({ icon, label, value, onChange, options = [] }) {
  return (
    <label className="block">
      <div className="text-xs text-gray-500 font-semibold mb-2">{label}</div>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">{icon}</div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#ecfbf3] border border-transparent focus:outline-none focus:ring-2 focus:ring-green-200"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}

/* ---------- Tab Button ---------- */
function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-semibold ${
        active ? "bg-green-600 text-white shadow-md" : "text-gray-600 bg-white"
      }`}
    >
      {label}
    </button>
  );
}

/* ---------- Basic Form ---------- */
function BasicForm({ form, setField, toggleMealType }) {
  return (
    <motion.div
      key="basic"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <FormInput
        icon={<FaUser className="text-green-600" />}
        label="Age"
        placeholder="30"
        value={form.age}
        onChange={(v) => setField("age", v)}
        type="number"
      />
      <FormInput
        icon={<FaRulerVertical className="text-green-600" />}
        label="Height (ft)"
        placeholder="5"
        value={form.heightFt}
        onChange={(v) => setField("heightFt", v)}
        type="number"
      />
      <FormInput
        icon={<FaWeight className="text-green-600" />}
        label="Weight (lbs)"
        placeholder="180"
        value={form.weight}
        onChange={(v) => setField("weight", v)}
        type="number"
      />
      <FormInput
        icon={<FaAppleAlt className="text-green-600" />}
        label="BMI (optional)"
        placeholder="e.g. 24.5"
        value={form.bmi || ""}
        onChange={(v) => setField("bmi", v)}
        type="number"
      />
      <SelectInput
        icon={<FaVenusMars className="text-green-600" />}
        label="Gender"
        value={form.gender}
        onChange={(v) => setField("gender", v)}
        options={["Male", "Female", "Other"]}
      />
      <SelectInput
        icon={<FaRunning className="text-green-600" />}
        label="Activity Level"
        value={form.activity}
        onChange={(v) => setField("activity", v)}
        options={["Sedentary","Lightly Active","Moderately Active","Active","Very Active"]}
      />
      <SelectInput
        icon={<FaAppleAlt className="text-green-600" />}
        label="Goal"
        value={form.goal}
        onChange={(v) => setField("goal", v)}
        options={["Lose Fat","Build Muscle","Maintain Weight"]}
      />

      {/* Meals */}
      <div className="md:col-span-2">
        <label className="text-sm font-semibold text-gray-600 mb-2 block">Daily Meals</label>
        <div className="flex flex-wrap gap-3">
          {["Breakfast","Lunch","Dinner","Snack"].map((m) => {
            const active = form.meals.includes(m);
            return (
              <button
                key={m}
                onClick={() => toggleMealType(m)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  active
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-[#f4fbf7] text-gray-700 border border-transparent"
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      <SelectInput
        icon={<FaCookieBite className="text-green-600" />}
        label="Diet Type"
        value={form.dietType}
        onChange={(v) => setField("dietType", v)}
        options={["Anything","Keto","Vegetarian","Vegan","High-Protein"]}
      />
    </motion.div>
  );
}

/* ---------- Advanced Form ---------- */
function AdvancedForm({ form, setField, updateTarget, toggleAllergy, allergyOptions }) {
  return (
    <motion.div
      key="advanced"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="grid grid-cols-1 gap-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          icon={<FaAppleAlt className="text-green-600" />}
          label="Target Calories"
          placeholder="e.g. 2200"
          value={form.calories}
          onChange={(v) => setField("calories", v)}
          type="number"
        />
        <FormInput
          icon={<FaUser className="text-green-600" />}
          label="Protein target (g)"
          placeholder="e.g. 150"
          value={form.protein}
          onChange={(v) => setField("protein", v)}
          type="number"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          icon={<FaCookieBite className="text-green-600" />}
          label="Carbs target (g)"
          placeholder="e.g. 200"
          value={form.carbs}
          onChange={(v) => setField("carbs", v)}
          type="number"
        />
        <FormInput
          icon={<FaWeight className="text-green-600" />}
          label="Fat target (g)"
          placeholder="e.g. 70"
          value={form.fat}
          onChange={(v) => setField("fat", v)}
          type="number"
        />
      </div>

      {/* Nutrition Targets */}
      <div className="mt-2">
        <label className="text-sm font-semibold text-gray-600 mb-2 block">Nutrition Targets</label>
        <div className="space-y-3">
          {form.targets.map((t, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={t.enabled}
                onChange={(e) => updateTarget(i, "enabled", e.target.checked)}
                className="h-5 w-5 text-green-600"
              />
              <select
                value={t.mode}
                onChange={(e) => updateTarget(i, "mode", e.target.value)}
                className="border rounded-md px-2 py-1 text-sm"
              >
                <option value="at most">at most</option>
                <option value="at least">at least</option>
              </select>
              <input
                type="number"
                value={t.value}
                onChange={(e) => updateTarget(i, "value", e.target.value)}
                placeholder="0"
                className="w-20 border rounded-md px-2 py-1 text-sm"
              />
              <select
                value={t.unit}
                onChange={(e) => updateTarget(i, "unit", e.target.value)}
                className="border rounded-md px-2 py-1 text-sm"
              >
                <option>g</option>
                <option>cal</option>
              </select>
              <select
                value={t.nutrient}
                onChange={(e) => updateTarget(i, "nutrient", e.target.value)}
                className="border rounded-md px-2 py-1 text-sm"
              >
                <option value="protein">protein</option>
                <option value="fat">fat</option>
                <option value="carbs">carbs</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Allergies */}
      <div className="mt-4">
        <label className="block font-semibold mb-2">Food Allergies</label>
        <div className="flex flex-wrap gap-3">
          {allergyOptions.map((a) => {
            const active = form.allergies.includes(a);
            return (
              <button
                key={a}
                onClick={() => toggleAllergy(a)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition ${
                  active ? "bg-green-600 text-white shadow-md" : "bg-white text-gray-700 border border-gray-200"
                }`}
              >
                {a}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Meal Cards ---------- */
function MealCard({ meal }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl shadow-lg p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">{meal.name}</h3>
        <div className="text-sm text-gray-500">{meal.calories} kcal</div>
      </div>
      <p className="text-sm text-gray-600 mb-3">{meal.sample}</p>
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-gray-600">
        <MacroBadge label="Protein" value={meal.protein} />
        <MacroBadge label="Carbs" value={meal.carbs} />
        <MacroBadge label="Fat" value={meal.fat} />
      </div>
    </motion.div>
  );
}

function MacroBadge({ label, value }) {
  return (
    <div className="bg-[#f7faf7] rounded-md p-2 text-center">
      <div className="font-semibold">{value} g</div>
      <div>{label}</div>
    </div>
  );
}

/* ---------- Utility: Sample Dishes ---------- */
function sampleDishForMeal(mealName, dietType) {
  const base = {
    Breakfast: ["Avocado toast with egg and cherry tomatoes","Oatmeal with almond butter and banana","Greek yogurt with mixed berries & granola"],
    Lunch: ["Grilled salmon, quinoa & steamed greens","Chicken & brown rice bowl with veggies","Lentil salad with roasted vegetables"],
    Dinner: ["Turkey meatballs with zucchini noodles","Grilled steak, sweet potato & broccoli","Tofu stir-fry with brown rice"],
    Snack: ["Protein smoothie (banana + whey + peanut butter)","Apple with almond butter","Cottage cheese & berries"],
  };
  const arr = base[mealName] || base["Lunch"];
  if (dietType === "Vegetarian") return arr.find((s) => s.toLowerCase().includes("tofu") || s.toLowerCase().includes("lentil")) || arr[0];
  if (dietType === "Vegan") return arr.find((s) => !s.toLowerCase().includes("chicken") && !s.toLowerCase().includes("salmon")) || arr[0];
  if (dietType === "Keto") return arr.find((s) => s.toLowerCase().includes("steak") || s.toLowerCase().includes("meat")) || arr[0];
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ---------- Main Page ---------- */
export default function MyMealsPage() {
  const [tab, setTab] = useState("basic");
  const [form, setForm] = useState({
    gender: "Male",
    age: "",
    heightFt: "",
    weight: "",
    bmi: "",
    activity: "Sedentary",
    goal: "Lose Fat",
    meals: ["Breakfast", "Lunch", "Dinner", "Snack"],
    dietType: "Anything",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    targets: [
      { enabled: true, mode: "at most", value: "", unit: "g", nutrient: "protein" },
      { enabled: true, mode: "at least", value: "", unit: "g", nutrient: "fat" },
      { enabled: false, mode: "at most", value: "", unit: "g", nutrient: "carbs" },
    ],
    allergies: [],
  });

  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const allergyOptions = ["Dairy","Eggs","Peanuts","Tree nuts","Soy","Gluten","Fish","Shellfish"];

  function setField(name, value) {
    setForm((p) => ({ ...p, [name]: value }));
  }

  function toggleMealType(value) {
    setForm((p) => {
      const has = p.meals.includes(value);
      return { ...p, meals: has ? p.meals.filter((m) => m !== value) : [...p.meals, value] };
    });
  }

  function toggleAllergy(tag) {
    setForm((p) => {
      const has = p.allergies.includes(tag);
      return { ...p, allergies: has ? p.allergies.filter((a) => a !== tag) : [...p.allergies, tag] };
    });
  }

  function updateTarget(idx, key, val) {
    setForm((p) => {
      const t = [...p.targets];
      t[idx] = { ...t[idx], [key]: val };
      return { ...p, targets: t };
    });
  }

  function handleGenerate() {
    setLoading(true);
    setMealPlan(null);

    const targetCalories = Number(form.calories) || 2000;
    setTimeout(() => {
      const distribution = {
        Breakfast: Math.round(targetCalories * 0.25),
        Lunch: Math.round(targetCalories * 0.3),
        Dinner: Math.round(targetCalories * 0.3),
        Snack: Math.round(targetCalories * 0.15),
      };

      const meals = Object.keys(distribution).map((m) => {
        const cals = distribution[m];
        const proteinG = Math.round((cals * 0.3) / 4);
        const carbsG = Math.round((cals * 0.45) / 4);
        const fatG = Math.round((cals * 0.25) / 9);

        return {
          name: m,
          calories: cals,
          protein: proteinG,
          carbs: carbsG,
          fat: fatG,
          sample: sampleDishForMeal(m, form.dietType),
        };
      });

      setMealPlan({ generatedAt: new Date(), meals });
      setLoading(false);

      setTimeout(() => {
        const el = document.getElementById("meal-results");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 900);
  }

  return (
    <div className="min-h-screen bg-white text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h1 className="text-4xl font-extrabold">Custom Macro Meal Planner</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Generate meal plans based on your macros and goals. Switch between Basic and Advanced for more customization.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-4">
              <TabButton label="Basic" active={tab === "basic"} onClick={() => setTab("basic")} />
              <TabButton label="Advanced" active={tab === "advanced"} onClick={() => setTab("advanced")} />
            </div>
            <div className="text-sm text-gray-400">Step 1 of 2</div>
          </div>

          <AnimatePresence mode="wait">
            {tab === "basic" ? (
              <BasicForm form={form} setField={setField} toggleMealType={toggleMealType} />
            ) : (
              <AdvancedForm form={form} setField={setField} updateTarget={updateTarget} toggleAllergy={toggleAllergy} allergyOptions={allergyOptions} />
            )}
          </AnimatePresence>

          <div className="mt-6">
            <button onClick={handleGenerate} className="w-full bg-green-600 text-white py-4 rounded-full font-bold text-lg shadow-xl hover:bg-green-700 transform hover:-translate-y-0.5 transition">
              <span className="inline-flex items-center gap-3 justify-center">
                <FaSyncAlt /> {loading ? "Generating..." : "Generate Macro Plan"}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Results */}
        <div id="meal-results" className="mt-12">
          <AnimatePresence>
            {mealPlan && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mealPlan.meals.map((m) => (
                  <MealCard key={m.name} meal={m} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Instructions */}
        <div className="mt-16 bg-[#f4f9f7] p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">How This Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Fill in your personal details: age, height, weight, and optionally BMI.</li>
            <li>Select your gender, activity level, fitness goal, meals per day, and diet type.</li>
            <li>Switch to "Advanced" to set macro targets, calories, and food allergies.</li>
            <li>Click "Generate Macro Plan" to create a personalized meal plan.</li>
            <li>Scroll down to view your weekly meal plan with calorie and macronutrient breakdown.</li>
            <li>Follow the plan and adjust based on your progress.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

