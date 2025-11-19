import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
// react-router is used client-side; require at runtime to avoid SSR import issues
const { useParams, useNavigate } =
  typeof window !== "undefined"
    ? (require("react-router-dom") as any)
    : { useParams: () => ({}), useNavigate: () => () => {} };
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Star,
  Clock,
  Users,
  Share2,
  Heart,
  Phone,
  Mail,
  Globe,
  ChevronLeft,
  ChevronRight,
  User,
  Award,
  Ticket,
  Shield,
  RefreshCw,
} from "lucide-react";
import { getEventById } from "../data/mockDatabase";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "../components/AuthModal";

const EventDetailsPageComponent = () => {
  const { eventId } = useParams() as { eventId?: string };
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const event = getEventById(parseInt(eventId || "0"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎭</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Event Not Found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Mock additional images for the gallery
  const eventImages = [
    event.image,
    "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];

  const handleBookNow = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      navigate(`/booking/${event.id}`);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % eventImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + eventImages.length) % eventImages.length
    );
  };

  // Mock organizer data
  const organizer = {
    name: "EventPro Productions",
    rating: 4.8,
    eventsOrganized: 150,
    phone: "+91 98765 43210",
    email: "contact@eventpro.com",
    website: "www.eventpro.com",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section with Image Gallery */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={eventImages[currentImageIndex]}
            alt={event.title}
            width={1200}
            height={500}
            className="w-full h-full object-cover"
            loading="lazy"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {eventImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentImageIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          {/* Action Buttons */}
          <div className="absolute top-6 right-6 flex space-x-3">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-3 rounded-full backdrop-blur-sm transition-all duration-200 ${
                isLiked
                  ? "bg-red-500 text-white"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Event Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              {event.featured && (
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </span>
              )}
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                {event.category}
              </span>
              <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{event.rating}</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center space-x-6 text-white/90">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>
                  {event.venue}, {event.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Event */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                About This Event
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  {event.description ||
                    `Experience the magic of ${
                      event.title
                    }! This incredible ${event.category.toLowerCase()} event promises to be an unforgettable experience that will leave you wanting more.`}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Join us at {event.venue} in {event.location} for an evening
                  filled with entertainment, excitement, and memories that will
                  last a lifetime. Whether you&#39;re a longtime fan or new to
                  the scene, this event offers something special for everyone.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Don&#39;t miss out on this opportunity to be part of something
                  extraordinary. Book your tickets now and secure your spot at
                  one of the most anticipated events of the year!
                </p>
              </div>
            </div>

            {/* Event Highlights */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Event Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Capacity
                    </h3>
                    <p className="text-gray-600">5,000+ attendees expected</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Safety</h3>
                    <p className="text-gray-600">COVID-19 safety protocols</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Ticket className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      E-Tickets
                    </h3>
                    <p className="text-gray-600">
                      Digital tickets with QR codes
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 p-3 rounded-xl">
                    <RefreshCw className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Refund Policy
                    </h3>
                    <p className="text-gray-600">Full refund up to 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Organizer Info */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Event Organizer
              </h2>
              <div className="flex items-start space-x-6">
                <Image
                  src={organizer.avatar}
                  alt={organizer.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-2xl object-cover"
                  loading="lazy"
                  unoptimized
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {organizer.name}
                    </h3>
                    <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                      <Award className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">
                        Verified
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{organizer.rating}</span>
                    </div>
                    <span className="text-gray-600">
                      {organizer.eventsOrganized} events organized
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{organizer.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{organizer.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Globe className="w-4 h-4" />
                      <span className="text-sm">{organizer.website}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-6">
                  <p className="text-gray-600 mb-2">Starting from</p>
                  <p className="text-4xl font-bold text-purple-600 mb-4">
                    {event.price}
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Available Now</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Date</span>
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Time</span>
                    <span className="font-medium">{event.time}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Venue</span>
                    <span className="font-medium text-right">
                      {event.venue}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium">{event.location}</span>
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Book Now
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Secure booking • Instant confirmation • Mobile tickets
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => navigate(`/booking/${event.id}`)}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(EventDetailsPageComponent), {
  ssr: false,
});
