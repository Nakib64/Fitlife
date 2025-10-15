import React from 'react';

// The main Noworkout component now displays the Workout Empty State Page.
const Noworkout = () => {

  // Function to simulate the button's action (redirecting/generating a workout).
  const handleRedirect = () => {
    // In a real Next.js application, you would use:
    // router.push('/myWorkouts'); 
    console.log("Action: Redirecting to the 'Generate Workout' or 'My Workouts' page.");
  };

  return (
    // Background and Layout Container (Dark theme for a modern look)
    <div className=" flex items-center justify-center min-h-screen p-4 sm:p-8">

      {/* Empty State Content Card - Centered and visually appealing */}
      <div className="flex flex-col items-center text-center p-8 sm:p-12 bg-gray-800 rounded-3xl shadow-2xl shadow-gray-900/50 max-w-lg w-full transition-all duration-300 border-t border-teal-600/30">

        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-white mb-2">
          <span className="text-teal-400">Fit</span>Life Workouts
        </h1>
        <p className="text-gray-400 mb-10 text-lg">
          Your Personal Fitness Journey Starts Now.
        </p>

        {/* Empty State Icon (Simple Barbell SVG) */}
        <div className="mb-10 p-6 rounded-full bg-gray-700/50 border-4 border-dashed border-teal-600 transition-transform duration-500 hover:scale-105">
            <svg 
                className="w-16 h-16 text-lime-300" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                {/* Simple Barbell representation */}
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <rect x="18" y="10" width="4" height="4" rx="1"></rect>
                <rect x="2" y="10" width="4" height="4" rx="1"></rect>
                <rect x="8" y="9" width="8" height="6" rx="1"></rect>
            </svg>
        </div>


        {/* Empty Message */}
        <h2 className="text-2xl font-bold text-white mb-3">
          No Workouts Found
        </h2>
        <p className="text-gray-400 mb-10 max-w-xs">
          It looks like you haven't created any routines yet. Click the button below to generate your first personalized workout plan!
        </p>

        {/* Action Button: Attractive and uses the requested lime-300 background */}
        <button 
          onClick={handleRedirect}
          className="bg-lime-300 text-gray-900 font-extrabold py-3 px-8 rounded-full shadow-xl shadow-lime-300/40 hover:shadow-2xl hover:bg-lime-400 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 text-lg w-full sm:w-auto tracking-wide"
        >
          Generate My First Workout
        </button>

        {/* Small Footer/Motivation */}
        <p className="mt-8 text-sm text-gray-500">
            Consistency is key to crushing your goals.
        </p>
      </div>

    </div>
  );
};

export default Noworkout;
