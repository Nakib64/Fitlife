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
} from "react-icons/fa";
import FitLifeLoader from "../component/workoutLoading/WorkoutLoading";

/* ---------- Utility Inputs ---------- */
function FormInput({
	icon,
	label,
	placeholder,
	value,
	onChange,
	type = "text",
}) {
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
					className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
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
					className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
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
			className={`px-4 py-2 rounded-full font-semibold transition-all ${
				active
					? "bg-[#7CCF00] text-[#1A3438] shadow-lg hover:bg-[#6ABA00]"
					: "bg-gray-100 text-gray-600 hover:bg-gray-200"
			}`}
		>
			{label}
		</button>
	);
}

/* ---------- Meal Card ---------- */

function MealCard({ meal }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: "easeOut" }}
			whileHover={{ scale: 1.02 }}
			className="w-full bg-white rounded-3xl shadow-md border border-gray-100
                 p-6 hover:shadow-md hover:border-green-200 
                 transition-all duration-300"
		>
			{/* Header */}
			<div className="mb-4">
				<div className="flex items-center justify-between">
					<h3 className="font-bold text-2xl text-gray-800 tracking-wide">
						{meal.name}
					</h3>
					<span className="text-gray-500 font-semibold">{meal.calories} kcal</span>
				</div>

				{/* 🔹 Animated underline */}
				<motion.div
					initial={{ scaleX: 0 }}
					animate={{ scaleX: 1 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="mt-2 h-0.5 w-full origin-left bg-gray-100 rounded-full"
				/>
			</div>

			{/* Description */}
			<p className="text-gray-600 sm:text-lg mb-6 leading-relaxed">
				{meal.sample}
			</p>

			{/* Macros */}
			<div className="flex flex-wrap gap-3">
				<MacroBadge
					label="Protein"
					value={`${meal.protein} g`}
					color="bg-green-100 text-green-700"
				/>
				<MacroBadge
					label="Carbs"
					value={`${meal.carbs} g`}
					color="bg-yellow-100 text-yellow-700"
				/>
				<MacroBadge
					label="Fat"
					value={`${meal.fat} g`}
					color="bg-red-100 text-red-700"
				/>
			</div>
		</motion.div>
	);
}

function MacroBadge({ label, value, color }) {
	return (
		<div
			className={`flex flex-col items-center justify-center px-5 py-2 rounded-2xl
                  text-sm font-medium shadow-sm ${color}`}
		>
			<span className="font-bold">{value}</span>
			<span className="text-xs">{label}</span>
		</div>
	);
}

/* ---------- Loading Animation ---------- */
function LoadingAnimation() {
	return (
		<div className="flex flex-col items-center justify-center py-12">
			<motion.div
				className="w-16 h-16 border-4 border-green-500 border-t-transparent bg-gradient-to-l from-green-300 to-green-400 rounded-full animate-spin"
				initial={{ rotate: 0 }}
				animate={{ rotate: 360 }}
				transition={{ repeat: Infinity, duration: 1 }}
			/>
			<motion.p
				className="mt-6 text-gray-700 font-semibold text-xl text-center"
				initial={{ opacity: 0.3 }}
				animate={{ opacity: [0.3, 1, 0.3] }}
				transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
			>
				AI is generating your personalized plan...
			</motion.p>
		</div>
	);
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
			{
				enabled: true,
				mode: "at most",
				value: "",
				unit: "g",
				nutrient: "protein",
			},
			{ enabled: true, mode: "at least", value: "", unit: "g", nutrient: "fat" },
			{ enabled: false, mode: "at most", value: "", unit: "g", nutrient: "carbs" },
		],
		allergies: [],
	});
	const [mealPlan, setMealPlan] = useState(null);
	const [loading, setLoading] = useState(false);

	/* ---------- Handlers ---------- */
	const setField = (name, value) => setForm((p) => ({ ...p, [name]: value }));
	const toggleMealType = (value) =>
		setForm((p) => {
			const has = p.meals.includes(value);
			return {
				...p,
				meals: has ? p.meals.filter((m) => m !== value) : [...p.meals, value],
			};
		});
	const toggleAllergy = (tag) =>
		setForm((p) => {
			const has = p.allergies.includes(tag);
			return {
				...p,
				allergies: has
					? p.allergies.filter((a) => a !== tag)
					: [...p.allergies, tag],
			};
		});
	const updateTarget = (idx, key, val) => {
		setForm((p) => {
			const t = [...p.targets];
			t[idx] = { ...t[idx], [key]: val };
			return { ...p, targets: t };
		});
	};

	/* ---------- Generate ---------- */
	const handleGenerate = async () => {
		setLoading(true);
		setMealPlan(null);
		try {
			const res = await fetch("/api/nutrition", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ form }),
			});
			const data = await res.json();
			if (data.error) alert("Server error: " + data.error);
			else if (data.plan) setMealPlan(data.plan);
			else if (data.planText)
				setMealPlan({
					rawText: data.planText,
					generatedAt: new Date().toISOString(),
				});
			else alert("Unexpected response from server");
		} catch (err) {
			console.error(err);
			alert("Failed to call API. See console.");
		} finally {
			setLoading(false);
			setTimeout(() => {
				const el = document.getElementById("meal-results");
				if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
			}, 100);
		}
	};

	const allergyOptions = [
		"Dairy",
		"Eggs",
		"Peanuts",
		"Tree nuts",
		"Soy",
		"Gluten",
		"Fish",
		"Shellfish",
	];

	return (
		<div className="min-h-screen  text-gray-900 py-12 px-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<h1 className="text-4xl md:text-5xl font-extrabold">
						Custom Macro Meal Planner
					</h1>
					<p className="mt-3 text-gray-600 max-w-2xl mx-auto">
						Generate AI-powered meal plans based on your macros and goals. Switch
						between <b>Basic</b> and <b>Advanced</b> modes.
					</p>
				</motion.div>

				{/* Form */}
				<motion.div
					initial={{ opacity: 0, x: -30 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className="relative bg-white rounded-3xl shadow-2xl p-8 border border-green-100"
				>
					{/* Tabs */}
					<div className="flex items-center justify-between mb-6">
						<div className="flex space-x-4">
							<TabButton
								label="Basic"
								active={tab === "basic"}
								onClick={() => setTab("basic")}
							/>
							<TabButton
								label="Advanced"
								active={tab === "advanced"}
								onClick={() => setTab("advanced")}
							/>
						</div>
					</div>

					{/* Tab Content */}
					<AnimatePresence mode="wait">
						{tab === "basic" ? (
							<BasicForm
								form={form}
								setField={setField}
								toggleMealType={toggleMealType}
							/>
						) : (
							<AdvancedForm
								form={form}
								setField={setField}
								updateTarget={updateTarget}
								toggleAllergy={toggleAllergy}
								allergyOptions={allergyOptions}
							/>
						)}
					</AnimatePresence>

					{/* Generate Button */}
					<div className="mt-8">
						<button
							onClick={handleGenerate}
							disabled={loading}
							className="w-full bg-[#7CCF00] hover:bg-[#6ABA00] text-[#1A3438] py-4 rounded-full font-bold text-lg shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-60 flex justify-center items-center gap-3 cursor-pointer"
						>
							<FaSyncAlt className={loading ? "animate-spin" : ""} />
							{loading ? "Generating…" : "Generate Macro Plan"}
						</button>
					</div>

					{/* Loading Overlay */}
					<AnimatePresence>{loading && <FitLifeLoader />}</AnimatePresence>
				</motion.div>

				{/* Results */}
				<div id="meal-results" className="mt-16 py-16">
					<AnimatePresence>
						{mealPlan && (
							<motion.div
								initial={{ opacity: 0, y: 12 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 12 }}
								transition={{ duration: 0.4 }}
							>
								{/* 🔹 Title Section */}
								<h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
									🍽️ Your Personalized Meal Plan
								</h2>

								{mealPlan.meals ? (
									<div className="grid grid-cols-1 sm:grid-cols-2  gap-6 ">
										{mealPlan.meals.map((m) => (
											<MealCard key={m.name} meal={m} />
										))}
									</div>
								) : mealPlan.rawText ? (
									<div className="bg-white rounded-2xl shadow p-6">
										<h3 className="font-semibold mb-3">Generated Plan (raw)</h3>
										<pre className="whitespace-pre-wrap text-sm text-gray-700">
											{mealPlan.rawText}
										</pre>
									</div>
								) : (
									<div className="bg-white rounded-2xl shadow p-6">
										No meals returned.
									</div>
								)}
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}

/* ---------- Forms ---------- */
function BasicForm({ form, setField, toggleMealType }) {
	return (
		<motion.div
			key="basic"
			initial={{ opacity: 0, x: -8 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 8 }}
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
				options={[
					"Sedentary",
					"Lightly Active",
					"Moderately Active",
					"Active",
					"Very Active",
				]}
			/>
			<SelectInput
				icon={<FaAppleAlt className="text-green-600" />}
				label="Goal"
				value={form.goal}
				onChange={(v) => setField("goal", v)}
				options={["Lose Fat", "Build Muscle", "Maintain Weight"]}
			/>

			<div className="md:col-span-2">
				<label className="text-sm font-semibold text-gray-600 mb-2 block">
					Daily Meals
				</label>
				<div className="flex flex-wrap gap-3">
					{["Breakfast", "Lunch", "Dinner", "Snack"].map((m) => {
						const active = form.meals.includes(m);
						return (
							<button
								key={m}
								onClick={() => toggleMealType(m)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
									active
										? "bg-[#7CCF00] text-[#1A3438] shadow-md hover:bg-[#6ABA00]"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
				options={["Anything", "Keto", "Vegetarian", "Vegan", "High-Protein"]}
			/>
		</motion.div>
	);
}

function AdvancedForm({
	form,
	setField,
	updateTarget,
	toggleAllergy,
	allergyOptions,
}) {
	const [customAllergy, setCustomAllergy] = useState("");
	const [typing, setTyping] = useState(false);

	const addCustomAllergy = () => {
		const trimmed = customAllergy.trim();
		if (trimmed && !form.allergies.includes(trimmed)) {
			setField("allergies", [...form.allergies, trimmed]);
			setCustomAllergy("");
			setTyping(false);
		}
	};

	const handleTyping = (value) => {
		setCustomAllergy(value);
		setTyping(value.length > 0);
	};
	return (
		<motion.div
			key="advanced"
			initial={{ opacity: 0, x: 8 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -8 }}
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

			{/* Nutrition Targets & Allergies */}
			<div className="mt-4">
				<label className="block font-semibold mb-2">Food Allergies</label>

				{/* Predefined allergies */}
				<div className="flex flex-wrap gap-3 mb-2">
					{allergyOptions.map((a) => {
						const active = form.allergies.includes(a);
						return (
							<motion.button
								key={a}
								onClick={() => toggleAllergy(a)}
								whileTap={{ scale: 0.95 }}
								className={`px-3 py-2 rounded-full text-sm font-medium transition ${
									active
										? "bg-green-600 text-white shadow-md"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
							>
								{a}
							</motion.button>
						);
					})}
				</div>

				{/* Custom allergy input */}
				<div className="flex gap-2 items-center mt-2">
					<input
						type="text"
						value={customAllergy}
						onChange={(e) => handleTyping(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && addCustomAllergy()}
						placeholder="Add other allergy..."
						className={`flex-1 px-4 py-2 rounded-xl border ${
							typing
								? "border-green-400 shadow-md animate-pulse"
								: "border-gray-200 focus:ring-2 focus:ring-green-200 focus:border-green-400"
						} focus:outline-none transition`}
					/>

					<button
						onClick={addCustomAllergy}
						className="px-4 py-2 bg-[#7CCF00] hover:bg-[#6ABA00] text-[#1A3438] rounded-xl font-semibold transition-all shadow hover:shadow-lg"
					>
						Add
					</button>
				</div>

				{/* Display custom allergies */}
				<div className="flex flex-wrap gap-2 mt-2">
					{form.allergies.map((a) => (
						<motion.div
							key={a}
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0 }}
							className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-1"
						>
							{a}
							<button
								onClick={() =>
									setField(
										"allergies",
										form.allergies.filter((al) => al !== a)
									)
								}
								className="text-[#7CCF00] font-bold text-xs ml-1 hover:text-[#6ABA00] transition-colors"
							>
								×
							</button>
						</motion.div>
					))}
				</div>
			</div>
		</motion.div>
	);
}
