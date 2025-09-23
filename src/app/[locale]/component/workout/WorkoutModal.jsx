"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import WorkoutStepForm from "./WorkoutForm";

const steps = [
	{ key: "age", emoji: "🎂", title: "Enter your age", isNumber: true },
	{
		key: "gender",
		emoji: "🚻",
		title: "Select your gender",
		options: [
			{ label: "Male 🚹", value: "male" },
			{ label: "Female 🚺", value: "female" },
		],
	},
	{
		key: "goal",
		emoji: "🎯",
		title: "What is your goal?",
		options: [
			{ label: "Build Muscle 💪", value: "build_muscle" },
			{ label: "Lose Fat 🔥", value: "lose_fat" },
			{ label: "Maintain ⚖️", value: "maintain" },
		],
	},
	{
		key: "fitness_level",
		emoji: "🏋️",
		title: "Select your fitness level",
		options: [
			{ label: "Beginner 🐣", value: "beginner" },
			{ label: "Intermediate 💪", value: "intermediate" },
			{ label: "Advanced 🦾", value: "advanced" },
		],
	},
	{
		key: "equipment",
		emoji: "🏋️",
		title: "Do you have gym equipment?",
		options: [
			{ label: "Yes 🏋️‍♂️", value: "yes" },
			{ label: "No 🚫", value: "no" },
		],
	},
	{
		key: "days_per_week",
		emoji: "📅",
		title: "How many days per week?",
		options: [
			{ label: "1", value: 1 },
			{ label: "2", value: 2 },
			{ label: "3", value: 3 },
			{ label: "4", value: 4 },
			{ label: "5", value: 5 },
			{ label: "6", value: 6 },
		],
	},
	{
		key: "time_per_session_minutes",
		emoji: "⏱️",
		title: "How long will each session be?",
		isClock: true, // flag to render clock selection
	},
];

export default function WorkoutModal({ onGenerate }) {
	const [open, setOpen] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState({
		age: "",
		gender: "",
		goal: "",
		fitness_level: "",
		location: "",
		days_per_week: "",
		time_per_session_minutes: "",
	});

	const handleChange = (value) => {
		const key = steps[currentStep].key;
		setFormData((prev) => ({ ...prev, [key]: value }));
	};

	const next = () => {
		const key = steps[currentStep].key;
		const val = formData[key];
		if (!val || val.toString().trim() === "") return;

		if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
		else handleSubmit();
	};

	const previous = () => {
		if (currentStep > 0) setCurrentStep(currentStep - 1);
	};

	const handleSubmit = () => {
		onGenerate(formData);
		setOpen(false);
		setCurrentStep(0);
		setFormData({
			age: "",
			gender: "",
			goal: "",
			fitness_level: "",
			location: "",
			days_per_week: "",
			time_per_session_minutes: "",
		});
	};

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 text-lg font-bold">
					Generate Workout 💪
				</button>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/50" />
				<Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md h-[380px]">
					<Dialog.Title className="text-2xl font-bold mb-4 text-center">
						Your Workout Plan 🏋️
					</Dialog.Title>

					<div className="relative w-full h-[220px]">
						<AnimatePresence mode="wait">
							<WorkoutStepForm
								key={steps[currentStep].key}
								step={currentStep}
								value={formData[steps[currentStep].key]}
								onChange={handleChange}
								options={steps[currentStep].options || []} // provide default empty array
								emoji={steps[currentStep].emoji}
								title={steps[currentStep].title || ""} // default empty string
								isNumber={steps[currentStep].isNumber || false}
								isClock={steps[currentStep].isClock || false}
								keyName={steps[currentStep].key}
							/>
						</AnimatePresence>
					</div>

					<div className="flex justify-between mt-6">
						<button
							onClick={previous}
							disabled={currentStep === 0}
							className={`px-4 py-2 rounded-lg font-bold ${
								currentStep === 0
									? "bg-gray-300 cursor-not-allowed"
									: "bg-gray-200 hover:bg-gray-300"
							}`}
						>
							Previous ⬅️
						</button>
						<button
							onClick={next}
							disabled={
								!formData[steps[currentStep].key] ||
								formData[steps[currentStep].key].toString().trim() === ""
							}
							className={`px-4 py-2 rounded-lg font-bold text-white ${
								!formData[steps[currentStep].key] ||
								formData[steps[currentStep].key].toString().trim() === ""
									? "bg-gray-400 cursor-not-allowed"
									: "bg-green-500 hover:bg-green-600"
							}`}
						>
							{currentStep === steps.length - 1 ? "Submit ✅" : "Next ➡️"}
						</button>
					</div>

					<div className="mt-4 text-center text-gray-500 text-sm">
						Step {currentStep + 1} of {steps.length}
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
