"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type LocationState = {
  city: string | null;
  stateName?: string | null;
  showSelector: boolean;
  setCity: (city: string, stateName?: string | null) => void;
  clearCity: () => void;
  openSelector: () => void;
  closeSelector: () => void;
};

const LocationContext = createContext<LocationState | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [city, setCityState] = useState<string | null>(null);
  const [stateName, setStateName] = useState<string | null>(null);
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    // initialize from localStorage on client
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("selected_location");
        if (raw) {
          const parsed = JSON.parse(raw);
          setCityState(parsed.city ?? null);
          setStateName(parsed.stateName ?? null);
        } else {
          // no stored location - open selector on initial visit
          setShowSelector(true);
        }
      } catch (e) {
        // ignore and open selector
        setShowSelector(true);
      }
    }
  }, []);

  const persist = (nextCity: string | null, nextState?: string | null) => {
    if (typeof window === "undefined") return;
    try {
      if (nextCity) {
        localStorage.setItem(
          "selected_location",
          JSON.stringify({ city: nextCity, stateName: nextState ?? null })
        );
      } else {
        localStorage.removeItem("selected_location");
      }
    } catch (e) {
      // ignore
    }
  };

  const setCity = (nextCity: string, nextStateName: string | null = null) => {
    setCityState(nextCity);
    setStateName(nextStateName);
    persist(nextCity, nextStateName);
    setShowSelector(false);
  };

  const clearCity = () => {
    setCityState(null);
    setStateName(null);
    persist(null);
    setShowSelector(true);
  };

  const openSelector = () => setShowSelector(true);
  const closeSelector = () => setShowSelector(false);

  return (
    <LocationContext.Provider
      value={{
        city,
        stateName,
        showSelector,
        setCity,
        clearCity,
        openSelector,
        closeSelector,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationState => {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used within LocationProvider");
  return ctx;
};

export default LocationContext;
