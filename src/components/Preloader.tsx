import React, { useState, useEffect } from "react";
import Image from "next/image";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0); // 0: dark, 1: spotlights, 2: logo, 3: tagline, 4: loading, 5: complete
  const [isExiting, setIsExiting] = useState(false);
  const [loadingText, setLoadingText] = useState("Initializing...");

  // Dynamic loading messages
  const loadingMessages = React.useMemo(
    () => [
      "Initializing...",
      "Loading Events...",
      "Preparing Experience...",
      "Setting Up Stage...",
      "Almost Ready...",
      "Welcome!",
    ],
    []
  );

  useEffect(() => {
    // Stage progression with proper timing
    const timers = [
      setTimeout(() => setStage(1), 800), // Spotlights appear
      setTimeout(() => setStage(2), 2000), // Logo appears
      setTimeout(() => setStage(3), 3200), // Tagline appears
      setTimeout(() => setStage(4), 4000), // Loading starts
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (stage === 4) {
      // Smooth progress animation with dynamic text
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1.2;

          // Update loading text based on progress
          const messageIndex = Math.floor(
            (newProgress / 100) * (loadingMessages.length - 1)
          );
          setLoadingText(
            loadingMessages[Math.min(messageIndex, loadingMessages.length - 1)]
          );

          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setLoadingText("Welcome!");
            // Start exit sequence
            setTimeout(() => {
              setIsExiting(true);
              setTimeout(() => {
                onComplete();
              }, 1200); // Longer exit animation for smoother transition
            }, 800);
            return 100;
          }
          return newProgress;
        });
      }, 35);

      return () => clearInterval(progressInterval);
    }
  }, [stage, onComplete, loadingMessages]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black overflow-hidden transition-all duration-1200 ease-in-out ${
        isExiting ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Enhanced Spotlights with Better Animation */}
      <div className="absolute inset-0">
        {/* Primary Spotlight - Purple */}
        <div
          className={`absolute transition-all duration-2000 ease-out ${
            stage >= 1 ? "opacity-40" : "opacity-0"
          }`}
          style={{
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(147, 51, 234, 0.6) 0%, rgba(147, 51, 234, 0.3) 30%, rgba(147, 51, 234, 0.1) 60%, transparent 100%)",
            left: "10%",
            top: "15%",
            transform: "rotate(-20deg)",
            filter: "blur(2px)",
            animation:
              stage >= 1 ? "spotlight-sweep-1 6s ease-in-out infinite" : "none",
          }}
        />

        {/* Secondary Spotlight - Pink */}
        <div
          className={`absolute transition-all duration-2000 ease-out delay-500 ${
            stage >= 1 ? "opacity-35" : "opacity-0"
          }`}
          style={{
            width: "450px",
            height: "450px",
            background:
              "radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, rgba(236, 72, 153, 0.25) 35%, rgba(236, 72, 153, 0.1) 65%, transparent 100%)",
            right: "15%",
            top: "25%",
            transform: "rotate(25deg)",
            filter: "blur(1px)",
            animation:
              stage >= 1
                ? "spotlight-sweep-2 7s ease-in-out infinite reverse"
                : "none",
          }}
        />

        {/* Accent Spotlight - Blue */}
        <div
          className={`absolute transition-all duration-2000 ease-out delay-1000 ${
            stage >= 1 ? "opacity-30" : "opacity-0"
          }`}
          style={{
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.2) 40%, rgba(59, 130, 246, 0.05) 70%, transparent 100%)",
            left: "50%",
            bottom: "20%",
            transform: "translateX(-50%) rotate(-15deg)",
            filter: "blur(1.5px)",
            animation:
              stage >= 1 ? "spotlight-sweep-3 8s ease-in-out infinite" : "none",
          }}
        />

        {/* Center Stage Illumination */}
        <div
          className={`absolute inset-0 transition-all duration-2000 ease-out ${
            stage >= 2 ? "opacity-15" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at center 45%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 40%, rgba(255, 255, 255, 0.02) 70%, transparent 100%)",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4">
          {/* Logo Section */}
          <div
            className={`mb-10 transition-all duration-1500 ease-out ${
              stage >= 2
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-90 translate-y-12"
            }`}
          >
            <div className="relative group">
              {/* Enhanced Logo Glow */}
              <div className="absolute -inset-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-1000 animate-pulse" />

              {/* Logo Container */}
              <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 p-6 rounded-3xl shadow-2xl border border-purple-400/30 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl" />
                <Image
                  src="/ticketshub_logo.png"
                  alt="TICKETSHUB"
                  width={160}
                  height={160}
                  className="w-40 h-40 object-contain mx-auto relative z-10"
                  priority
                />
              </div>

              {/* Subtle Ring Animation */}
              <div
                className="absolute inset-0 rounded-3xl border-2 border-purple-400/20 animate-ping"
                style={{ animationDuration: "3s" }}
              />
              <div
                className="absolute inset-0 rounded-3xl border border-pink-400/30 animate-pulse"
                style={{ animationDuration: "2s" }}
              />
            </div>
          </div>

          {/* Enhanced Tagline */}
          <div
            className={`mb-16 transition-all duration-1200 ease-out ${
              stage >= 3
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-wide">
              <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-pulse">
                Setting the Stage
              </span>
            </h2>
            <p className="text-xl text-gray-300 font-light tracking-wider">
              for Your Perfect Event...
            </p>
          </div>

          {/* Modern Loading Section */}
          <div
            className={`w-96 max-w-sm mx-auto transition-all duration-1000 ease-out ${
              stage >= 4
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {/* Loading Text with Animation */}
            <div className="mb-6">
              <p className="text-lg font-medium text-white mb-2 transition-all duration-500 ease-in-out">
                {loadingText}
              </p>
              <div className="flex justify-center space-x-1">
                <div
                  className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>

            {/* Modern Progress Bar Container */}
            <div className="relative mb-6">
              {/* Progress Bar Background */}
              <div className="h-2 bg-gray-800/60 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/50 shadow-inner">
                {/* Progress Bar Fill */}
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  {/* Modern Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-shimmer" />
                </div>
              </div>

              {/* Progress Glow */}
              <div
                className="absolute top-0 h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-full blur-sm opacity-70 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Modern Progress Information */}
            <div className="flex justify-between items-center text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium tracking-wide">
                  Loading Experience
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-lg font-bold text-purple-300 transition-all duration-300">
                  {Math.round(progress)}%
                </span>
                {progress === 100 && (
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                )}
              </div>
            </div>

            {/* Modern Loading Bars */}
            <div className="mt-6 space-y-2">
              <div className="flex space-x-1">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="h-1 bg-gray-700 rounded-full flex-1 overflow-hidden"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
                      style={{
                        width: progress > i * 12.5 ? "100%" : "0%",
                        transitionDelay: `${i * 50}ms`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Completion Message */}
          {progress === 100 && (
            <div className="mt-8 animate-fade-in">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                <p className="text-green-400 font-medium tracking-wide">
                  Experience Ready!
                </p>
                <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Smooth Exit Transition Overlay */}
      {isExiting && (
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-white animate-curtain-open" />
      )}

      {/* Enhanced Keyframes */}
      <style jsx>{`
        @keyframes spotlight-sweep-1 {
          0%,
          100% {
            transform: rotate(-20deg) scale(1) translateX(0);
            opacity: 0.4;
          }
          25% {
            transform: rotate(-15deg) scale(1.1) translateX(20px);
            opacity: 0.6;
          }
          50% {
            transform: rotate(-25deg) scale(1.05) translateX(-10px);
            opacity: 0.5;
          }
          75% {
            transform: rotate(-18deg) scale(1.08) translateX(15px);
            opacity: 0.55;
          }
        }

        @keyframes spotlight-sweep-2 {
          0%,
          100% {
            transform: rotate(25deg) scale(1) translateY(0);
            opacity: 0.35;
          }
          33% {
            transform: rotate(30deg) scale(1.08) translateY(-15px);
            opacity: 0.5;
          }
          66% {
            transform: rotate(20deg) scale(1.05) translateY(10px);
            opacity: 0.45;
          }
        }

        @keyframes spotlight-sweep-3 {
          0%,
          100% {
            transform: translateX(-50%) rotate(-15deg) scale(1);
            opacity: 0.3;
          }
          40% {
            transform: translateX(-50%) rotate(-10deg) scale(1.06);
            opacity: 0.45;
          }
          80% {
            transform: translateX(-50%) rotate(-20deg) scale(1.03);
            opacity: 0.4;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(12deg);
          }
          100% {
            transform: translateX(200%) skewX(12deg);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes curtain-open {
          0% {
            opacity: 1;
            transform: scaleY(1);
          }
          50% {
            opacity: 0.8;
            transform: scaleY(0.8);
          }
          100% {
            opacity: 0;
            transform: scaleY(0);
            transform-origin: top;
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-curtain-open {
          animation: curtain-open 1.2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
