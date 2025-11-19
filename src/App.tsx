import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import StateSelector from './components/StateSelector';
import TrendingEvents from './components/TrendingEvents';
import Footer from './components/Footer';
import CategoryPage from './pages/CategoryPage';
import StatePage from './pages/StatePage';
import EventDetailsPage from './pages/EventDetailsPage';
import BookingPage from './pages/BookingPage';
import ProfilePage from './pages/ProfilePage';
import ManagementApp from './management/ManagementApp';

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
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/state/:stateName" element={<StatePage />} />
          <Route path="/event/:eventId" element={<EventDetailsPage />} />
          <Route path="/booking/:eventId" element={<BookingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

function App() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasShownPreloader, setHasShownPreloader] = useState(false);

  useEffect(() => {
    // Check if preloader has been shown in this session
    const preloaderShown = sessionStorage.getItem('preloader_shown');
    
    if (preloaderShown) {
      // If preloader was already shown in this session, skip it
      setIsInitialLoad(false);
      setHasShownPreloader(true);
    } else {
      // First time in this session, show preloader
      const preloadImages = [
        '/ticketshub_logo.png',
        '/concert-background.png'
      ];

      const imagePromises = preloadImages.map(src => {
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
        new Promise(resolve => setTimeout(resolve, 5500)) // Minimum 5.5s for full experience
      ]).then(() => {
        // Small delay to ensure smooth transition
        setTimeout(() => {
          setIsInitialLoad(false);
          setHasShownPreloader(true);
          // Mark preloader as shown for this session
          sessionStorage.setItem('preloader_shown', 'true');
        }, 500);
      });
    }
  }, []);

  const handlePreloaderComplete = () => {
    setIsInitialLoad(false);
    setHasShownPreloader(true);
    sessionStorage.setItem('preloader_shown', 'true');
  };

  // Show preloader only on initial load and if it hasn't been shown yet
  if (isInitialLoad && !hasShownPreloader) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <Router>
      <Routes>
        {/* Management Subdomain Routes */}
        <Route path="/management/*" element={<ManagementApp />} />
        
        {/* Main Domain Routes */}
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;