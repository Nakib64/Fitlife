"use client";
import { motion } from "framer-motion";

const timeOptions = [15, 30, 45, 60]; // session minutes

export default function WorkoutStepForm({
	step,
	value,
	onChange,
	options,
	emoji,
	title,
	isNumber,
	isClock,
	keyName,
}) {
	return (
		<motion.div
			key={step}
			initial={{ opacity: 0, x: 50 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -50 }}
			className="flex flex-col items-center gap-4 absolute top-0 left-0 w-full h-full"
		>
			{/* Dynamic Title */}
			<div className="text-lg font-semibold text-center">{title || keyName}</div>
			<div className="text-5xl">{emoji}</div>

			{isNumber ? (
				<input
					type="number"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					// placeholder={keyName || "Enter number"} // dynamic placeholder
					className="w-2/3 border p-4 rounded-lg shadow-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none
             [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance]:textfield"
				/>
			) : isClock ? (
				<div className="flex gap-4 mt-2">
					{timeOptions.map((t) => (
						<button
							key={t}
							onClick={() => onChange(t)}
							className={`px-4 py-3 rounded-full shadow-lg font-bold text-lg transition-all ${
								value === t
									? "bg-green-500 text-white scale-110"
									: "bg-gray-200 hover:bg-gray-300"
							}`}
						>
							{t} min ⏱️
						</button>
					))}
				</div>
			) : (
				<div className="flex flex-wrap justify-center gap-3 mt-2">
					{options.map((opt) => (
						<button
							key={opt.value}
							onClick={() => onChange(opt.value)}
							className={`px-4 py-3 rounded-xl shadow-lg text-lg font-bold transition-all ${
								value === opt.value
									? "bg-green-500 text-white scale-105"
									: "bg-gray-200 hover:bg-gray-300"
							}`}
						>
							{opt.label}
						</button>
					))}
				</div>
			)}
		</motion.div>
	);
}
