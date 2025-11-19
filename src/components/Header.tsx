import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, User, Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "./AuthModal";
import Image from "next/image";
import { useLocation } from "../contexts/LocationContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const lastScrollY = useRef<number>(0);
  const { city, openSelector } = useLocation();

  useEffect(() => {
    // initialize lastScrollY on client
    lastScrollY.current = typeof window !== "undefined" ? window.scrollY : 0;
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          lastScrollY.current = window.scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside or on navigation
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest(".mobile-menu-container")) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleUserAction = () => {
    if (isAuthenticated) {
      router.push("/profile");
    } else {
      setShowAuthModal(true);
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-md border-b border-gray-100"
        }`}
      >
        <div
          className={`w-full transition-all duration-300 ease-out ${
            isScrolled
              ? "max-w-4xl mx-auto my-2 sm:my-3 rounded-full bg-white/95 backdrop-blur-xl shadow-xl border border-white/20"
              : "max-w-7xl mx-auto"
          } px-3 sm:px-4 lg:px-8`}
        >
          <div
            className={`flex items-center justify-between w-full transition-all duration-300 ${
              isScrolled ? "h-12 sm:h-14" : "h-14 sm:h-16"
            }`}
          >
            {/* Logo */}
            <div
              className="flex items-center flex-shrink-0 cursor-pointer min-w-0"
              onClick={() => {
                router.push("/");
                setIsMenuOpen(false);
              }}
            >
              <Image
                src="/ticketshub_logo.png"
                alt="TICKETSHUB"
                width={48}
                height={48}
                className={`transition-all duration-300 ${
                  isScrolled ? "h-5 sm:h-6" : "h-6 sm:h-8"
                }`}
                style={{
                  height: isScrolled ? "1.5rem" : "2rem",
                  width: "auto",
                }}
              />
            </div>

            {/* Desktop Navigation - Only show when not scrolled and on larger screens */}
            {!isScrolled && (
              <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 flex-shrink-0">
                <button
                  onClick={() => router.push("/category/movies")}
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm xl:text-base whitespace-nowrap"
                >
                  Movies
                </button>
                <button
                  onClick={() => router.push("/category/concerts")}
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm xl:text-base whitespace-nowrap"
                >
                  Concerts
                </button>
                <button
                  onClick={() => router.push("/category/sports")}
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm xl:text-base whitespace-nowrap"
                >
                  Sports
                </button>
                <button
                  onClick={() => router.push("/category/theater")}
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm xl:text-base whitespace-nowrap"
                >
                  Theater
                </button>
                <button
                  onClick={() => router.push("/category/events")}
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm xl:text-base whitespace-nowrap"
                >
                  Events
                </button>
              </nav>
            )}

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 min-w-0">
              {/* Search Bar - Hidden on mobile, adaptive on larger screens */}
              <div
                className={`relative transition-all duration-300 hidden md:block flex-shrink-0 ${
                  isSearchFocused
                    ? "w-48 lg:w-56"
                    : isScrolled
                    ? "w-20 lg:w-24"
                    : "w-32 lg:w-40"
                }`}
              >
                <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                  <Search
                    className={`text-gray-400 ${
                      isScrolled ? "h-3 w-3" : "h-4 w-4"
                    }`}
                  />
                </div>
                <input
                  type="text"
                  placeholder={isScrolled ? "Search..." : "Search events..."}
                  className={`block w-full border rounded-lg transition-all duration-200 ${
                    isScrolled
                      ? "pl-6 sm:pl-7 pr-2 py-1 text-xs border-gray-200 focus:ring-1 focus:ring-purple-500 focus:border-transparent bg-white"
                      : "pl-7 sm:pl-8 pr-2 sm:pr-3 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  }`}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>

              {/* Location - Only show when not scrolled and on larger screens */}
              {!isScrolled && (
                <div
                  onClick={() => openSelector()}
                  className="hidden xl:flex items-center space-x-2 text-gray-700 hover:text-purple-600 cursor-pointer transition-colors duration-200 flex-shrink-0"
                >
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium text-sm whitespace-nowrap">
                    {city ?? "Select City"}
                  </span>
                </div>
              )}

              {/* User Profile Button */}
              <button
                onClick={handleUserAction}
                className={`flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 hover:scale-105 flex-shrink-0 ${
                  isScrolled
                    ? "px-2 py-1 sm:px-3 sm:py-1.5"
                    : "px-3 py-1.5 sm:px-4 sm:py-2"
                }`}
              >
                {isAuthenticated && user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={32}
                    height={32}
                    className={`rounded-full object-cover flex-shrink-0 ${
                      isScrolled
                        ? "w-5 h-5 sm:w-6 sm:h-6"
                        : "w-6 h-6 sm:w-8 sm:h-8"
                    }`}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <User
                    className={`flex-shrink-0 ${
                      isScrolled
                        ? "w-3 h-3 sm:w-4 sm:h-4"
                        : "w-4 h-4 sm:w-5 sm:h-5"
                    }`}
                  />
                )}
                {!isScrolled && (
                  <span className="font-medium hidden sm:block text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-20">
                    {isAuthenticated ? user?.name?.split(" ")[0] : "Sign In"}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                className={`lg:hidden p-1.5 sm:p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 text-gray-700 mobile-menu-container flex-shrink-0 ${
                  isScrolled ? "ml-1" : "ml-2"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl mobile-menu-container overflow-hidden">
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
                <Image
                  src="/ticketshub_logo.png"
                  alt="TICKETSHUB"
                  width={48}
                  height={48}
                  className="h-6"
                  style={{ width: "auto", height: "1.5rem" }}
                />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {/* Mobile Search */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search events, movies, venues..."
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm"
                    />
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                      Categories
                    </h3>

                    <button
                      onClick={() => handleNavigation("/category/movies")}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                    >
                      <span className="text-lg">🎬</span>
                      <span>Movies</span>
                    </button>

                    <button
                      onClick={() => handleNavigation("/category/concerts")}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                    >
                      <span className="text-lg">🎵</span>
                      <span>Concerts</span>
                    </button>

                    <button
                      onClick={() => handleNavigation("/category/sports")}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                    >
                      <span className="text-lg">🏆</span>
                      <span>Sports</span>
                    </button>

                    <button
                      onClick={() => handleNavigation("/category/theater")}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                    >
                      <span className="text-lg">🎭</span>
                      <span>Theater</span>
                    </button>

                    <button
                      onClick={() => handleNavigation("/category/events")}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                    >
                      <span className="text-lg">📅</span>
                      <span>Events</span>
                    </button>

                    <button
                      onClick={() => handleNavigation("/category/gaming")}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                    >
                      <span className="text-lg">🎮</span>
                      <span>Gaming</span>
                    </button>

                    <button
                      onClick={() => handleNavigation("/category/comedy")}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                    >
                      <span className="text-lg">😂</span>
                      <span>Comedy</span>
                    </button>

                    <button
                      onClick={() => handleNavigation("/category/lifestyle")}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                    >
                      <span className="text-lg">💚</span>
                      <span>Lifestyle</span>
                    </button>

                    {/* Location */}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <button className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left">
                        <span className="text-lg">📍</span>
                        <span>Mumbai</span>
                      </button>
                    </div>

                    {/* User Actions */}
                    {isAuthenticated && (
                      <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                          Account
                        </h3>

                        <button
                          onClick={() => handleNavigation("/profile")}
                          className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                        >
                          <User className="w-5 h-5" />
                          <span>My Profile</span>
                        </button>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium text-left"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          router.push("/profile");
        }}
      />
    </>
  );
};

export default Header;
