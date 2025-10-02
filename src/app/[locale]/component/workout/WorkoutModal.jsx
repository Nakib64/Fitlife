"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import WorkoutStepForm from "./WorkoutForm";

const steps = [
  { key: "age", emojiKey: "step1_emoji", titleKey: "step1_title", isNumber: true },
  { 
    key: "gender", 
    emojiKey: "step2_emoji", 
    titleKey: "step2_title", 
    optionsKeys: ["step2_option1","step2_option2"] 
  },
  { 
    key: "goal", 
    emojiKey: "step3_emoji", 
    titleKey: "step3_title", 
    optionsKeys: ["step3_option1","step3_option2","step3_option3"] 
  },
  { 
    key: "fitness_level", 
    emojiKey: "step4_emoji", 
    titleKey: "step4_title", 
    optionsKeys: ["step4_option1","step4_option2","step4_option3"] 
  },
  { 
    key: "equipment", 
    emojiKey: "step5_emoji", 
    titleKey: "step5_title", 
    optionsKeys: ["step5_option1","step5_option2"] 
  },
  { 
    key: "days_per_week", 
    emojiKey: "step6_emoji", 
    titleKey: "step6_title", 
    optionsKeys: ["step6_option1","step6_option2", "step6_option3","step6_option4","step6_option5", "step6_option6"] 
  },
  { key: "time_per_session_minutes", emojiKey: "step7_emoji", titleKey: "step7_title", isClock: true },
];

export default function WorkoutModal({ onGenerate }) {
  const t = useTranslations("workout.modal"); // next-intl hook
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    goal: "",
    fitness_level: "",
    equipment: "",
    days_per_week: 3,
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
      equipment: "",
      days_per_week: 3,
      time_per_session_minutes: "",
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 text-lg font-bold">
          {t("generate_btn")}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md h-[400px]">
          <Dialog.Title className="text-2xl font-bold mb-4 text-center">
            {t("dialog_title")}
          </Dialog.Title>

          <div className="relative w-full h-[180px] md:h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={steps[currentStep].key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <WorkoutStepForm
                  step={currentStep}
                  value={formData[steps[currentStep].key]}
                  onChange={handleChange}
                  options={
                    steps[currentStep].optionsKeys
                      ? steps[currentStep].optionsKeys.map((key) => ({
                          label: t(key),
                          value: t(key),
                        }))
                      : []
                  }
                  emoji={t(steps[currentStep].emojiKey)}
                  title={t(steps[currentStep].titleKey)}
                  isNumber={steps[currentStep].isNumber || false}
                  isClock={steps[currentStep].isClock || false}
                  keyName={steps[currentStep].key}
                />
              </motion.div>
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
              {t("previous_btn")}
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
              {currentStep === steps.length - 1
                ? t("submit_btn")
                : t("next_btn")}
            </button>
          </div>

          <div className="mt-4 text-center text-gray-500 text-sm">
            {t("step_progress", { current: currentStep + 1, total: steps.length })}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
