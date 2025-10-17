"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBed, FaHeartbeat, FaBrain, FaSyncAlt, FaFire,
  FaClock, FaBolt, FaMoon, FaUndo, FaInfoCircle
} from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast, Toaster } from "sonner";

// --- Loader Component ---
const WORD = "FitLife";
const LETTERS = WORD.split("");
const WORD_LENGTH = LETTERS.length;
const messages = [
  "Generating workout...",
  "Analyzing your fitness data...",
  "Customizing exercises for you...",
  "Almost done...",
  "Preparing your personalized plan..."
];

const AnimatedLetter = ({ char, index, swapStep }) => {
  let finalIndex = index;
  if (index === 0) finalIndex = swapStep;
  else if (index <= swapStep && index > 0) finalIndex = index - 1;
  const transformX = finalIndex - index;
  return (
    <span
      className="inline-block relative transition-transform duration-500 ease-in-out"
      style={{ transform: `translateX(${transformX}ch)`, width: "1ch" }}
    >
      {char}
    </span>
  );
};

function FitLifeLoader() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [swapStep, setSwapStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setMessageIndex((prev) => (prev + 1) % messages.length), 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setSwapStep((prev) => (prev + 1) % (WORD_LENGTH + 1)), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="flex text-lime-400 text-6xl font-extrabold mb-8">
        {LETTERS.map((char, index) => (
          <AnimatedLetter key={index} char={char} index={index} swapStep={swapStep} />
        ))}
      </div>
      <div className="h-10 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={messageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full text-lime-400 text-xl font-bold text-center flex items-center justify-center h-full"
          >
            {messages[messageIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- Constants ---
const EMPTY_FORM_STATE = {
  sleepHours: 7, sleepEfficiency: 85, hrvScore: 60, rpe: 6,
  workoutDuration: 45, RHRateDrop: 25, cognitiveFatigue: 5
};

const METRIC_INFO = {
  sleepHours: "Total hours of sleep last night.",
  sleepEfficiency: "Percentage of time asleep while in bed.",
  hrvScore: "Heart Rate Variability, higher is better.",
  rpe: "Rate of Perceived Exertion (1-10) during workout.",
  workoutDuration: "Workout duration in minutes.",
  RHRateDrop: "Heart rate drop during recovery in BPM.",
  cognitiveFatigue: "Mental fatigue on scale 1-10."
};

// --- Input Card ---
function MetricInputCard({ label, icon, value, onChange, unit, min, max, step=1, error, name, useSlider=false }) {
  return (
    <motion.div
      className={`p-4 rounded-2xl shadow-lg border ${error ? 'border-red-500' : 'border-gray-200'} bg-white relative transition-all hover:shadow-2xl hover:-translate-y-1 hover:scale-105`}
    >
      <div className="flex items-center gap-2 mb-2 text-gray-700 font-semibold text-sm">
        {icon} {label}
        <FaInfoCircle className="ml-1 text-gray-400 cursor-pointer" title={METRIC_INFO[name]} />
      </div>
      {useSlider ? (
        <div className="relative">
          <input
            type="range"
            value={value}
            onChange={e => onChange(Number(e.target.value))}
            min={min} max={max} step={step}
            className="w-full h-2 accent-green-500 rounded-full"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>{min}</span>
            <span>{value} {unit}</span>
            <span>{max}</span>
          </div>
        </div>
      ) : (
        <input
          type="number"
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          placeholder={unit}
          className="w-full p-2 text-lg font-medium border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1">Required</p>}
    </motion.div>
  );
}

// --- Risk Badge ---
function RiskBadge({ level }) {
  const colors = {
    LOW: "bg-green-100 text-green-800 border-green-400",
    MODERATE: "bg-yellow-100 text-yellow-800 border-yellow-400",
    HIGH: "bg-orange-100 text-orange-800 border-orange-400",
    CRITICAL: "bg-red-100 text-red-800 border-red-400"
  };
  return (
    <span className={`px-3 py-1 rounded-full font-semibold border ${colors[level] || "bg-gray-100 text-gray-800 border-gray-300"}`}>
      {level}
    </span>
  );
}

// --- Line Chart ---
function MetricLineChart({ data, dataKey, color, title, yLabel }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" label={{ value: "Day", position: "insideBottomRight", offset: -5 }} />
          <YAxis label={{ value: yLabel, angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={{ r:3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// --- Main Component ---
export default function HealthAdvisorPage() {
  const [form, setForm] = useState(EMPTY_FORM_STATE);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const resultRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("healthAdvisorForm");
    if(saved) setForm(JSON.parse(saved));
  }, []);

  const setField = useCallback((name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
    if(validationErrors[name]) setValidationErrors(prev => ({ ...prev, [name]: false }));
  }, [validationErrors]);

  const validateForm = () => {
    const errors = {};
    let valid = true;
    Object.keys(EMPTY_FORM_STATE).forEach(key => {
      if(form[key] === "" || isNaN(Number(form[key]))) {
        errors[key] = true;
        valid = false;
      }
    });
    setValidationErrors(errors);
    if(!valid) toast.error("Please fill all fields correctly!");
    return valid;
  };

  const handleAnalyze = async () => {
    if(!validateForm()) return;
    setLoading(true);
    setResult(null);
    localStorage.setItem("healthAdvisorForm", JSON.stringify(form));

    try {
      const response = await fetch('/api/health-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userData: form }),
      });
      const data = await response.json();
      if(response.ok) setResult(data);
      else toast.error(data.error || "Failed to fetch AI data.");
    } catch(err) {
      console.error(err);
      toast.error("Connection failed.");
    } finally {
      setLoading(false);
      setTimeout(()=>resultRef.current?.scrollIntoView({behavior:"smooth"}), 300);
    }
  };

  const handleReset = () => {
    setForm(EMPTY_FORM_STATE);
    setResult(null);
    setValidationErrors({});
    localStorage.removeItem("healthAdvisorForm");
  };

  const sleepMetrics = [
    { label: "Sleep Hours", icon: <FaBed className="text-blue-500"/>, name:"sleepHours", min:4, max:12, step:0.5, unit:"h", useSlider:true },
    { label: "Sleep Efficiency", icon: <FaMoon className="text-indigo-500"/>, name:"sleepEfficiency", min:50, max:100, step:1, unit:"%", useSlider:true },
    { label: "HRV Score", icon: <FaHeartbeat className="text-red-500"/>, name:"hrvScore", min:20, max:120, step:1, unit:"ms", useSlider:true },
    { label: "Recovery HR Drop", icon: <FaBolt className="text-yellow-500"/>, name:"RHRateDrop", min:5, max:50, step:1, unit:"BPM/min", useSlider:true }
  ];

  const workoutCognitiveMetrics = [
    { label: "Workout RPE", icon: <FaFire className="text-red-400"/>, name:"rpe", min:1, max:10, step:1, unit:"/10" },
    { label: "Workout Duration", icon: <FaClock className="text-purple-500"/>, name:"workoutDuration", min:10, max:120, step:5, unit:"min" },
    { label: "Cognitive Fatigue", icon: <FaBrain className="text-green-500"/>, name:"cognitiveFatigue", min:0, max:10, step:1, unit:"/10" }
  ];

  return (
    <div className="min-h-screen relative py-10 px-6 bg-gray-50 text-gray-900">
      <Toaster position="top-right" />
      {loading && <FitLifeLoader />}

      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 relative z-0">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-gray-800">AI Health Risk Dashboard</h1>
        <p className="text-center text-gray-500 mb-10 max-w-3xl mx-auto">
          Input your metrics to get AI-powered analysis and personalized recovery plan.
        </p>

        {/* Sleep Metrics */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">Sleep Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {sleepMetrics.map(metric=>(
              <MetricInputCard
                key={metric.name}
                {...metric}
                value={form[metric.name]}
                onChange={v=>setField(metric.name,v)}
                error={validationErrors[metric.name]}
              />
            ))}
          </div>
        </div>

        {/* Workout + Cognitive Metrics in same row */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">Workout & Cognitive Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6">
            {workoutCognitiveMetrics.map(metric=>(
              <MetricInputCard
                key={metric.name}
                {...metric}
                value={form[metric.name]}
                onChange={v=>setField(metric.name,v)}
                error={validationErrors[metric.name]}
              />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 justify-center">
  <button
    onClick={handleAnalyze}
    disabled={loading}
    className="w-full md:w-auto bg-[#9AE600] hover:bg-green-400 text-white py-3 px-8 rounded-2xl font-bold flex justify-center items-center gap-3 shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl disabled:opacity-50"
  >
    <FaSyncAlt className={loading ? "animate-spin" : ""} /> {loading ? "Analyzing..." : "Analyze"}
  </button>
  <button
    onClick={handleReset}
    disabled={loading}
    className="w-full md:w-auto bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-8 rounded-2xl font-bold flex justify-center items-center gap-3 shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl disabled:opacity-50"
  >
    <FaUndo /> Reset
  </button>
</div>

        {/* Results */}
        <div ref={resultRef}>
          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} className="space-y-8">

                {/* Risk Summary */}
                <div className="p-6 rounded-2xl shadow-lg border-l-8 bg-red-50 border-red-500">
                  <h2 className="text-2xl font-bold mb-2">Risk Level: <RiskBadge level={result.riskLevel} /></h2>
                  <p><strong>Physiological:</strong> {result.physiologicalRisk}</p>
                  <p><strong>Cognitive:</strong> {result.psychologicalRisk}</p>
                </div>

                {/* AI Summary */}
                {result.aiSummary && (
                  <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 shadow-inner">
                    <h3 className="font-bold text-lg mb-2">AI Summary</h3>
                    <p>{result.aiSummary}</p>
                  </div>
                )}

                {/* Graphs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {result.visualizationData?.hrvHistory && <MetricLineChart data={result.visualizationData.hrvHistory.map((v,i)=>({day:i+1, hrv:v}))} dataKey="hrv" color="#82ca9d" title="HRV Trend" yLabel="HRV (ms)"/>}
                  {result.visualizationData?.strainHistory && <MetricLineChart data={result.visualizationData.strainHistory.map((v,i)=>({day:i+1, strain:v}))} dataKey="strain" color="#f97316" title="Strain Score Trend" yLabel="Strain"/>}
                  {result.visualizationData?.recoveryHRDropHistory && <MetricLineChart data={result.visualizationData.recoveryHRDropHistory.map((v,i)=>({day:i+1, recHR:v}))} dataKey="recHR" color="#3b82f6" title="Recovery HR Drop Trend" yLabel="BPM/min"/>}
                </div>

                {/* Action Protocols */}
                {result.actionProtocol && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {result.actionProtocol.map((act,i)=>{
                      const colorMap = { PHYSICAL:"bg-red-50 border-red-400", MENTAL:"bg-yellow-50 border-yellow-400", SLEEP:"bg-green-50 border-green-400" };
                      return (
                        <motion.div key={i} className={`p-4 rounded-2xl shadow-md border-l-4 ${colorMap[act.category] || "bg-gray-50 border-gray-300"}`} initial={{opacity:0}} animate={{opacity:1}}>
                          <h4 className="font-bold text-lg mb-1">{act.category}</h4>
                          <p>{act.details}</p>
                          <p className="text-sm text-gray-500 mt-1">Impact: {act.metricImpact}</p>
                        </motion.div>
                      )
                    })}
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
