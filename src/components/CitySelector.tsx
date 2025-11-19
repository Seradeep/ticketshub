"use client";

import React, { useMemo, useState } from "react";
import { useLocation } from "../contexts/LocationContext";
import { MapPin } from "lucide-react";

const popularCities = [
  { city: "Mumbai", state: "Maharashtra", icon: "🏙️" },
  { city: "Delhi-NCR", state: "Delhi", icon: "🏛️" },
  { city: "Bengaluru", state: "Karnataka", icon: "💻" },
  { city: "Hyderabad", state: "Telangana", icon: "🏰" },
  { city: "Ahmedabad", state: "Gujarat", icon: "🏯" },
  { city: "Chandigarh", state: "Chandigarh", icon: "🛡️" },
  { city: "Chennai", state: "Tamil Nadu", icon: "🏝️" },
  { city: "Pune", state: "Maharashtra", icon: "🏞️" },
  { city: "Kolkata", state: "West Bengal", icon: "🏛️" },
  { city: "Kochi", state: "Kerala", icon: "🌴" },
];

export default function CitySelector() {
  const { city, showSelector, setCity, closeSelector, openSelector } =
    useLocation();
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return popularCities;
    return popularCities.filter((c) => c.city.toLowerCase().includes(q));
  }, [query]);

  if (!showSelector) return null;

  const detectMyLocation = () => {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // For privacy and simplicity, just set a friendly label.
          setCity("Current Location");
        },
        () => {
          // fallback
          setCity("Current Location");
        },
        { timeout: 5000 }
      );
    } else {
      setCity("Current Location");
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-24 px-4">
      {/* Backdrop sits under the modal but above other page content */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => closeSelector()}
        aria-hidden
      />

      <div className="relative z-10 max-w-3xl w-full bg-white rounded-xl shadow-2xl overflow-hidden pointer-events-auto">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-pink-600" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for your city"
                className="outline-none w-72 md:w-96 px-3 py-2 rounded-lg border border-gray-200"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={detectMyLocation}
                className="text-pink-600 hover:text-pink-500 transition-colors"
              >
                Detect my location
              </button>
              <button
                onClick={closeSelector}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h4 className="text-center text-gray-600 mb-4">Popular Cities</h4>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 items-center justify-center">
            {list.map((c) => (
              <button
                key={c.city}
                onClick={() => setCity(c.city, c.state)}
                className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-3xl">{c.icon}</div>
                <div className="text-sm text-gray-700">{c.city}</div>
              </button>
            ))}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => openSelector()}
              className="text-pink-600 underline"
              style={{ visibility: "hidden" }}
            >
              View All Cities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
