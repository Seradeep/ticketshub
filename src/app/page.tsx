"use client";

import React, { useState, useEffect } from "react";
// Auth and Location providers are provided at the layout level via ClientProviders
import Preloader from "../components/Preloader";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import StateSelector from "../components/StateSelector";
import TrendingEvents from "../components/TrendingEvents";
import Footer from "../components/Footer";
import CitySelector from "../components/CitySelector";

function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <StateSelector />
      <TrendingEvents />
    </>
  );
}

function MainApp() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HomePage />
      <Footer />
      <CitySelector />
    </div>
  );
}

export default function Home() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasShownPreloader, setHasShownPreloader] = useState(false);

  useEffect(() => {
    // Check if preloader has been shown in this session
    const preloaderShown = sessionStorage.getItem("preloader_shown");

    if (preloaderShown) {
      // If preloader was already shown in this session, skip it
      setIsInitialLoad(false);
      setHasShownPreloader(true);
    } else {
      // First time in this session, show preloader
      const preloadImages = ["/ticketshub_logo.png", "/concert-background.png"];

      const imagePromises = preloadImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // Continue even if image fails
          img.src = src;
        });
      });

      // Wait for images and minimum time for full preloader experience
      Promise.all([
        ...imagePromises,
        new Promise((resolve) => setTimeout(resolve, 5500)), // Minimum 5.5s for full experience
      ]).then(() => {
        // Small delay to ensure smooth transition
        setTimeout(() => {
          setIsInitialLoad(false);
          setHasShownPreloader(true);
          // Mark preloader as shown for this session
          sessionStorage.setItem("preloader_shown", "true");
        }, 500);
      });
    }
  }, []);

  const handlePreloaderComplete = () => {
    setIsInitialLoad(false);
    setHasShownPreloader(true);
    sessionStorage.setItem("preloader_shown", "true");
  };

  // Show preloader only on initial load and if it hasn't been shown yet
  if (isInitialLoad && !hasShownPreloader) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return <MainApp />;
}
