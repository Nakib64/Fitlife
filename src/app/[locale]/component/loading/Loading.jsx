import React from 'react';

// The main Loading component which acts as the FitLife Loading Component.
const Loading = () => {
  return (
    <>
      {/* We use a standard <style> tag within the component for custom CSS 
        like keyframes and specific utility classes (fitlife-pulse, fitlife-gradient), 
        as this is the most reliable way to include custom animations in a single-file environment.
      */}
      <style>
        {`
        /* Set Inter as the default font (assumed available in Next.js setup) */
        :root {
            font-family: 'Inter', sans-serif;
        }

        /* Custom Keyframes for the heartbeat/pulse effect */
        @keyframes custom-pulse {
            0%, 100% {
                transform: scale(0.95);
                opacity: 0.8;
            }
            50% {
                transform: scale(1.05);
                opacity: 1;
            }
        }

        /* Custom Keyframes for the spinner rotation */
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .fitlife-pulse {
            animation: custom-pulse 1.8s ease-in-out infinite;
        }

        .fitlife-spinner {
            animation: spin 1.5s linear infinite;
        }

        /* A gradient that shifts for a modern look */
        .fitlife-gradient {
            background: linear-gradient(90deg, #10b981 0%, #06b6d4 50%, #10b981 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: shimmer 4s infinite linear;
        }
        
        @keyframes shimmer {
            0% {
                background-position: 0% center;
            }
            100% {
                background-position: -200% center;
            }
        }
        `}
      </style>
      
      {/* Background and Layout Container */}
      <div className=" flex items-center justify-center min-h-screen p-4">

        {/* Loading Component Content */}
        <div className="flex flex-col items-center justify-center space-y-8 max-w-sm w-full">

          {/* Animated "FitLife" Title */}
          <h1 className="text-6xl sm:text-7xl font-extrabold fitlife-gradient fitlife-pulse tracking-tight">
            FitLife
          </h1>

          {/* Custom Ring Spinner (The "Life" Ring) */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24">
              
            {/* Outer Ring (Pulsing background) */}
            <div className="absolute inset-0 rounded-full bg-teal-600 opacity-20 fitlife-pulse"></div>

            {/* Inner Spinner (Rotating active element) */}
            <div className="absolute inset-0 border-4 border-transparent border-t-teal-400 border-b-teal-400 rounded-full fitlife-spinner shadow-2xl shadow-teal-500/50"></div>
            
            {/* Center Icon/Dot */}
            <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-teal-400 shadow-lg shadow-teal-400/80"></div>
            </div>

          </div>

          {/* Subtitle Text */}
          <p className="text-gray-400 text-lg font-medium fitlife-pulse">
            Lifting expectations...
          </p>
          
          {/* Progress Bar Placeholder (Optional) 
              In a real app, you would dynamically change the style.width property based on loading progress state.
          */}
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-teal-500 rounded-full transition-all duration-1000 ease-in-out" 
              style={{ width: '30%' }}
            >
              {/* Placeholder width for visual effect */}
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default Loading;
