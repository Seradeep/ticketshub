import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, MapPin, User, Menu, X, Bell } from "lucide-react";
import { useManagementAuth } from "../contexts/ManagementAuthContext";
import { getNotificationsByUser } from "../data/mockDatabase";
import ManagementAuthModal from "./ManagementAuthModal";
import RoleSelectionModal from "./RoleSelectionModal";

const ManagementHeader = () => {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useManagementAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [selectedRole, setSelectedRole] = useState<
    "organizer" | "vendor" | "speaker" | "sponsor"
  >("organizer");

  const notifications = user ? getNotificationsByUser(user.id) : [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on navigation
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest(".mobile-menu-container")) {
        setIsMenuOpen(false);
      }
      if (showUserMenu && !target.closest(".user-menu-container")) {
        setShowUserMenu(false);
      }
      if (showNotifications && !target.closest(".notifications-container")) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen, showUserMenu, showNotifications]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push("/management");
  };

  const handleSignIn = () => {
    setAuthMode("signin");
    setShowAuthModal(true);
  };

  const handleSignUp = () => {
    setShowRoleSelection(true);
  };

  const handleRoleSelected = (
    role: "organizer" | "vendor" | "speaker" | "sponsor"
  ) => {
    setSelectedRole(role);
    setAuthMode("signup");
    setShowRoleSelection(false);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    router.push("/management/dashboard");
  };

  const getRoleDisplayName = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const getRoleBadgeColor = (role: string) => {
    const colors = {
      admin: "bg-red-100 text-red-800",
      organizer: "bg-blue-100 text-blue-800",
      vendor: "bg-green-100 text-green-800",
      speaker: "bg-purple-100 text-purple-800",
      sponsor: "bg-yellow-100 text-yellow-800",
    };
    return colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800";
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
                router.push("/management");
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
              {!isScrolled && (
                <span className="ml-2 font-bold text-gray-900 text-base">
                  Management
                </span>
              )}
            </div>

            {/* Desktop Navigation - Only show when not scrolled and on larger screens */}
            {!isScrolled && user && (
              <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 flex-shrink-0">
                <button
                  onClick={() => router.push("/management/dashboard")}
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm xl:text-base whitespace-nowrap"
                >
                  Dashboard
                </button>
                {user.role === "organizer" && (
                  <button
                    onClick={() => router.push("/management/events")}
                    className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm xl:text-base whitespace-nowrap"
                  >
                    My Events
                  </button>
                )}
                {user.role === "admin" && (
                  <>
                    <button
                      onClick={() => router.push("/management/users")}
                      className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm xl:text-base whitespace-nowrap"
                    >
                      Users
                    </button>
                    <button
                      onClick={() => router.push("/management/events")}
                      className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm xl:text-base whitespace-nowrap"
                    >
                      All Events
                    </button>
                  </>
                )}
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
                <div className="hidden xl:flex items-center space-x-2 text-gray-700 hover:text-purple-600 cursor-pointer transition-colors duration-200 flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium text-sm whitespace-nowrap">
                    Mumbai
                  </span>
                </div>
              )}

              {/* Notifications - Only show when user is logged in */}
              {user && (
                <div className="relative notifications-container">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`relative p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 rounded-lg hover:bg-gray-100 ${
                      isScrolled ? "p-1.5" : "p-2"
                    }`}
                  >
                    <Bell className={`${isScrolled ? "w-4 h-4" : "w-5 h-5"}`} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">
                          Notifications
                        </h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.slice(0, 5).map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                                !notification.read ? "bg-blue-50" : ""
                              }`}
                            >
                              <h4 className="font-medium text-gray-900 text-sm">
                                {notification.title}
                              </h4>
                              <p className="text-gray-600 text-sm mt-1">
                                {notification.message}
                              </p>
                              <p className="text-gray-400 text-xs mt-2">
                                {new Date(
                                  notification.createdAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-gray-500">
                            No notifications
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* User Profile Button or Auth Buttons */}
              {user ? (
                <div className="relative user-menu-container">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 hover:scale-105 flex-shrink-0 ${
                      isScrolled
                        ? "px-2 py-1 sm:px-3 sm:py-1.5"
                        : "px-3 py-1.5 sm:px-4 sm:py-2"
                    }`}
                  >
                    {user.avatar ? (
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
                        loading="lazy"
                        unoptimized
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
                        {user.name?.split(" ")[0]}
                      </span>
                    )}
                  </button>

                  {/* User Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getRoleBadgeColor(
                            user.role
                          )}`}
                        >
                          {getRoleDisplayName(user.role)}
                        </span>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => {
                            router.push("/management/profile");
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </button>
                        <button
                          onClick={() => {
                            router.push("/management/settings");
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>Settings</span>
                        </button>
                        <hr className="my-2" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <svg
                            className="w-4 h-4"
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
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSignIn}
                    className={`flex items-center space-x-1 sm:space-x-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 flex-shrink-0 ${
                      isScrolled
                        ? "px-2 py-1 sm:px-3 sm:py-1.5"
                        : "px-3 py-1.5 sm:px-4 sm:py-2"
                    }`}
                  >
                    <User
                      className={`flex-shrink-0 ${
                        isScrolled
                          ? "w-3 h-3 sm:w-4 sm:h-4"
                          : "w-4 h-4 sm:w-5 sm:h-5"
                      }`}
                    />
                    {!isScrolled && (
                      <span className="font-medium hidden sm:block text-xs sm:text-sm whitespace-nowrap">
                        Sign In
                      </span>
                    )}
                  </button>

                  <button
                    onClick={handleSignUp}
                    className={`flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 hover:scale-105 flex-shrink-0 ${
                      isScrolled
                        ? "px-2 py-1 sm:px-3 sm:py-1.5"
                        : "px-3 py-1.5 sm:px-4 sm:py-2"
                    }`}
                  >
                    <User
                      className={`flex-shrink-0 ${
                        isScrolled
                          ? "w-3 h-3 sm:w-4 sm:h-4"
                          : "w-4 h-4 sm:w-5 sm:h-5"
                      }`}
                    />
                    {!isScrolled && (
                      <span className="font-medium hidden sm:block text-xs sm:text-sm whitespace-nowrap">
                        Sign Up
                      </span>
                    )}
                  </button>
                </div>
              )}

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
                <div className="flex items-center space-x-2">
                  <Image
                    src="/ticketshub_logo.png"
                    alt="TICKETSHUB"
                    width={24}
                    height={24}
                    className="h-6"
                    priority
                  />
                  <span className="font-bold text-gray-900">Management</span>
                </div>
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
                      placeholder="Search events, users..."
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm"
                    />
                  </div>

                  {/* Auth Buttons for Mobile - Only show when not authenticated */}
                  {!user && (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          handleSignIn();
                          setIsMenuOpen(false);
                        }}
                        className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => {
                          handleSignUp();
                          setIsMenuOpen(false);
                        }}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                      >
                        Sign Up
                      </button>
                    </div>
                  )}

                  {/* Navigation Links */}
                  {user && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                        Navigation
                      </h3>

                      <button
                        onClick={() => {
                          router.push("/management/dashboard");
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                      >
                        <span className="text-lg">📊</span>
                        <span>Dashboard</span>
                      </button>

                      {user.role === "organizer" && (
                        <button
                          onClick={() => {
                            router.push("/management/events");
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                        >
                          <span className="text-lg">📅</span>
                          <span>My Events</span>
                        </button>
                      )}

                      {user.role === "admin" && (
                        <>
                          <button
                            onClick={() => {
                              router.push("/management/users");
                              setIsMenuOpen(false);
                            }}
                            className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                          >
                            <span className="text-lg">👥</span>
                            <span>Users</span>
                          </button>

                          <button
                            onClick={() => {
                              router.push("/management/events");
                              setIsMenuOpen(false);
                            }}
                            className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                          >
                            <span className="text-lg">🎪</span>
                            <span>All Events</span>
                          </button>
                        </>
                      )}

                      {/* Location */}
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <button className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left">
                          <span className="text-lg">📍</span>
                          <span>Mumbai</span>
                        </button>
                      </div>

                      {/* User Actions */}
                      <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                          Account
                        </h3>

                        <button
                          onClick={() => {
                            router.push("/management/profile");
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium text-left"
                        >
                          <User className="w-5 h-5" />
                          <span>My Profile</span>
                        </button>

                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role Selection Modal */}
      <RoleSelectionModal
        isOpen={showRoleSelection}
        onClose={() => setShowRoleSelection(false)}
        onRoleSelected={handleRoleSelected}
      />

      {/* Auth Modal */}
      <ManagementAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        selectedRole={selectedRole}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default ManagementHeader;
