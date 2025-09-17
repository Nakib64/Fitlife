"use client";

export default function Description() {
  return (
    <section className="w-full bg-[#e1f0e5]">
      {/* Heading Section */}
      <div className="py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-700">
          FitLife AI Coach – Smarter Fitness & Wellness
        </h2>
      </div>

      {/* Main Content Section */}
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <p className="text-gray-700 mb-6 text-lg">
              Achieve your <strong>fitness goals</strong> with personalized{" "}
              <em>workouts, meal plans, and wellness guidance</em>.  
              Our AI adapts to your progress, so you always stay on track.
            </p>

            <div className="space-y-6">
              <div className="transition duration-500 hover:translate-x-2">
                <h3 className="text-xl font-semibold text-gray-700">
                  AI-Powered Workouts
                </h3>
                <p className="text-gray-600">
                  Daily & weekly workout plans for home or gym. FitLife updates 
                  automatically as you log progress, ensuring consistent growth.
                </p>
              </div>

              <div className="transition duration-500 hover:translate-x-2">
                <h3 className="text-xl font-semibold text-gray-700">
                  Smart Nutrition & Meal Plans
                </h3>
                <p className="text-gray-600">
                  AI-based diet suggestions with calorie targets & alternatives 
                  (vegetarian, low-carb, high-protein). Simple meal logging keeps 
                  you accountable.
                </p>
              </div>

              <div className="transition duration-500 hover:translate-x-2">
                <h3 className="text-xl font-semibold text-gray-700">
                  Mindfulness & Wellness
                </h3>
                <p className="text-gray-600">
                  Guided breathing, stress-relief tips, and sleep hygiene to 
                  balance your lifestyle.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-4 mt-8 flex-wrap">
              <a
                href="#"
                className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl shadow hover:opacity-90 transition"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-6"
                />
              </a>
              <a
                href="#"
                className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl shadow hover:opacity-90 transition"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  className="h-6"
                />
              </a>
            </div>
            <p className="mt-4 text-gray-500 text-sm">
              Join thousands already transforming their life with FitLife
            </p>
          </div>

          {/* Right Images with Animation */}
          <div className="flex justify-center relative">
            <img
              src="https://i.ibb.co.com/99WCQ6D6/m1t.png"
              alt="FitLife workout"
              className="w-72 rounded-2xl shadow-xl border animate-fade-up"
            />
            <img
              src="https://i.ibb.co.com/twpVrfkj/m2t.png"
              alt="FitLife meals"
              className="w-72 rounded-2xl shadow-xl border absolute top-16 right-0 hidden md:block animate-fade-up delay-200"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
