export default function Description() {
  return (
    <section className="bg-green-50 py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side Content */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            FitLife AI Coach – Smarter Fitness & Wellness
          </h2>
          <p className="text-gray-700 mb-6">
            Achieve your <strong>fitness goals</strong> with personalized 
            <em> workouts, meal plans, and wellness guidance</em>.  
            Our AI adapts to your progress, so you always stay on track.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                AI-Powered Workouts
              </h3>
              <p className="text-gray-600">
                Get daily & weekly workout plans (home or gym). FitLife updates 
                automatically as you log progress, ensuring consistent growth.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Smart Nutrition & Meal Plans
              </h3>
              <p className="text-gray-600">
                AI-based diet suggestions with calorie targets & alternatives 
                (vegetarian, low-carb, high-protein). Simple meal logging keeps 
                you accountable.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Mindfulness & Wellness
              </h3>
              <p className="text-gray-600">
                Stay healthy inside & out. Guided breathing, stress-relief tips, 
                and better sleep recommendations to balance your lifestyle.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4 mt-8">
            <a
              href="#"
              className="bg-black text-white px-6 py-3 rounded-xl shadow hover:opacity-90"
            >
              Get on Google Play
            </a>
            <a
              href="#"
              className="bg-black text-white px-6 py-3 rounded-xl shadow hover:opacity-90"
            >
              Download on App Store
            </a>
          </div>
          <p className="mt-4 text-gray-500 text-sm">
            Join thousands already transforming their life with FitLife
          </p>
        </div>

        {/* Right Side Mockups */}
        <div className="flex justify-center relative">
          <img
            src="/images/fitlife-workout.png"
            alt="FitLife workout tracker"
            className="w-72 rounded-2xl shadow-xl border"
          />
          <img
            src="/images/fitlife-meals.png"
            alt="FitLife meal planner"
            className="w-72 rounded-2xl shadow-xl border absolute top-16 right-0 hidden md:block"
          />
        </div>
      </div>
    </section>
  );
}
