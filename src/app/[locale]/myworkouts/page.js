"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import WorkoutModal from "../component/workout/WorkoutModal";
import { useTranslations } from "next-intl";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/navigation";
import AIThinkingLoader from "../component/workoutLoading/WorkoutLoading";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";

export default function Home({ params }) {
	const [workoutPlan, setWorkoutPlan] = useState([]);
	const [loading, setLoading] = useState(false);
	const [activeWeek, setActiveWeek] = useState(1);
	const [daysPerWeek, setDaysPerWeek] = useState();
	const [isSaved, setIsSaved] = useState(false);
	const [hasFetched, setHasFetched] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	const t = useTranslations("workout.result");
	const { locale } = use(params);
	const { data: session } = useSession();
	const router = useRouter();

	// --- Fetch user workout only once ---
	useEffect(() => {
		if (!session?.user || hasFetched) return;

		setLoading(true);
		axios
			.get(`/api/userWorkout?email=${session.user.email}`)
			.then((res) => {
				setWorkoutPlan(res?.data?.data || []);
				setIsSaved(res?.data?.data || []);
				setHasFetched(true);
			})
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}, [session, hasFetched]);

	// --- Generate AI Workout ---
	const generateWorkout = async (userData) => {
		userData.language = locale;
		setLoading(true);

		try {
			const res = await fetch("/api/AIWorkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(userData),
			});
			const data = await res.json();
			setWorkoutPlan(data.plan || []);
			setDaysPerWeek(parseInt(userData.days_per_week));
			setActiveWeek(1);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	// --- Save workout ---
	const handleSave = () => {
		if (session?.user) {
			setIsSaving(true);
			axios
				.post("/api/userWorkout", {
					email: session?.user?.email,
					data: [...workoutPlan],
				})
				.then(() => {
					setIsSaving(false);
					toast("Saved Successfully!");
					router.push("/dashBoard/progressTracker");
				});
		} else {
			toast("⚡ You must login first to save your workout!");
			router.push(
				`/login?callbackUrl=${encodeURIComponent(window.location.href)}`
			);
		}
	};

	// --- Prepare weeks ---
	const weeks = [];
	if (workoutPlan?.length > 0) {
		const daysInWeek = workoutPlan.length / 4;
		for (let i = 0; i < 4; i++) {
			weeks.push(
				workoutPlan.slice(
					i * parseInt(daysInWeek),
					i * parseInt(daysInWeek) + parseInt(daysInWeek)
				)
			);
		}
	}

	return (
		<div className="p-6 max-w-7xl mx-auto relative">
			{/* Loader Overlay */}
			{loading && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
					<AIThinkingLoader />
				</div>
			)}

			{/* Main Content */}
			<div className={`${loading ? "blur-xl pointer-events-none" : ""}`}>
				{/* Hero Section */}
				{workoutPlan.length === 0 && (
					<div className="flex flex-col items-center mt-12 space-y-4 text-center">
						<div className="text-7xl animate-bounce">🏋️‍♂️💪</div>
						<h1 className="text-4xl font-extrabold">{t("heroTitle")}</h1>
						<p className="text-gray-700 max-w-md text-lg">{t("heroSubtitle")}</p>
						<p className="text-gray-500">{t("heroStart")}</p>
					</div>
				)}

				{/* Modal Trigger */}
				<div className="flex justify-center mt-8">
					<WorkoutModal onGenerate={generateWorkout} />
				</div>

				{/* Motivational Section */}
				{workoutPlan.length === 0 && (
					<div className="mt-12 flex flex-col items-center space-y-4 text-center">
						<div className="text-6xl">🔥⚡</div>
						<p className="text-gray-600 max-w-md">{t("motive1")}</p>
						<div className="text-6xl">🕒🎯</div>
						<p className="text-gray-500">{t("motive2")}</p>
					</div>
				)}

				{/* Generated Workout */}
				{workoutPlan.length > 0 && (
					<div className="mt-12">
						{/* Save Button */}
						<div className="flex justify-center flex-col md:flex-row gap-3 mb-6">
							<Button
								className={` bg-gradient-to-r from-green-400 to-blue-500 text-white  font-bold hover:scale-105 transition-transform`}
								disabled={isSaved == workoutPlan}
								onClick={handleSave}
							>
								{isSaved == workoutPlan ? "Already saved" : "Save"}
							</Button>
							{isSaved == workoutPlan && <Link href={'/dashBoard/progressTracker'}>
							<Button 
								className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold hover:scale-105 transition-transform ">

								Start your workout
							</Button>
							</Link>}
						</div>

						{/* Week Tabs */}
						<div className="flex justify-center gap-3 mb-6 flex-wrap">
							{weeks.map((_, idx) => (
								<button
									key={idx}
									onClick={() => setActiveWeek(idx + 1)}
									className={`px-5 py-2 rounded-lg font-semibold transition-all ${
										activeWeek === idx + 1
											? "bg-lime-400 text-white shadow-lg scale-105"
											: "bg-gray-200 text-gray-700 hover:bg-gray-300"
									}`}
								>
									{t("week")} {idx + 1} {activeWeek === idx + 1 && "🔥"}
								</button>
							))}
						</div>

						{/* Exercises for Active Week */}
						{weeks[activeWeek - 1].map((day, i) => (
							<motion.div
								key={day.day}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
								className="bg-white rounded-xl shadow-md p-6 mb-4 border border-gray-100 hover:shadow-lg"
							>
								<h3 className="text-xl font-bold mb-3 flex items-center gap-2">
									{day.day}
								</h3>

								<Swiper
									modules={[Navigation, Pagination]}
									navigation
									pagination={{ clickable: true }}
									spaceBetween={16}
									slidesPerView={1}
									breakpoints={{
										640: { slidesPerView: 1 },
										768: { slidesPerView: 2 },
										1024: { slidesPerView: 3 },
									}}
								>
									{day.exercises.map((ex, idx) => (
										<SwiperSlide key={idx}>
											<div className="flex flex-col bg-green-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow h-full">
												<div className="relative w-full h-48 mb-2">
													{ex.gifUrl ? (
														<Image
															src={ex.gifUrl}
															alt={ex.name}
															fill
															className="object-contain rounded-lg"
														/>
													) : (
														<div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
															<span className="text-gray-500">No GIF</span>
														</div>
													)}
												</div>
												<span className="text-lg font-semibold">{ex.name} 🏋️‍♂️</span>
												<span className="text-gray-600 mt-1">
													{t("sets")}: {ex.sets}
												</span>
												<span className="text-gray-600">
													{t("reps")}: {ex.reps}
												</span>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
							</motion.div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
