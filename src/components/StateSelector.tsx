import React, { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import { states } from "../data/mockDatabase";

const StateSelector = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleStateClick = (state: any) => {
    console.log(`Navigating to ${state.name} - ${state.city}`);
    router.push(`/state/${state.name}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Explore Events by State
            </h2>
            <p className="text-lg text-gray-600">
              Discover amazing events happening across India&#39;s vibrant
              cities
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-white hover:bg-gray-100 shadow-md transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-white hover:bg-gray-100 shadow-md transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {states.map((state, index) => (
            <div
              key={state.name}
              className="flex-shrink-0 w-80 group cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => handleStateClick(state)}
            >
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                {/* Background Image */}
                <Image
                  src={state.image}
                  alt={state.name}
                  width={320}
                  height={256}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${state.gradient} opacity-70 group-hover:opacity-80 transition-opacity duration-300`}
                ></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm font-medium">
                        {state.events} Events
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-1">{state.name}</h3>
                    <p className="text-white/90 mb-4">{state.city}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/80">
                        View all events
                      </span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* View More Card */}
          <div className="flex-shrink-0 w-80 group cursor-pointer">
            <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ChevronRight className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">View More States</h3>
                <p className="text-white/80">Explore events across India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StateSelector;
