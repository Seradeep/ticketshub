import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
// react-router is used client-side; require at runtime to avoid SSR import issues
const { useParams, useNavigate } =
  typeof window !== "undefined"
    ? (require("react-router-dom") as any)
    : { useParams: () => ({}), useNavigate: () => () => {} };
import { ArrowLeft, Calendar, MapPin, Star, Clock } from "lucide-react";
import {
  getEventsByCategory,
  getEventsByTag,
  categoryInfo,
  Event,
} from "../data/mockDatabase";

const CategoryPageComponent = () => {
  const { category } = useParams() as { category?: string };
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categoryKey = category?.toLowerCase() || "all";

  // Check if this is a tag-based category (trending, recommended, etc.) or a regular category
  const tagCategories = [
    "trending",
    "recommended",
    "outdoor",
    "popular",
    "live",
  ];
  const isTagCategory = tagCategories.includes(categoryKey);

  // Get events based on whether it's a tag or category
  const events = isTagCategory
    ? getEventsByTag(categoryKey)
    : getEventsByCategory(categoryKey);

  const catInfo =
    categoryInfo[categoryKey as keyof typeof categoryInfo] || categoryInfo.all;

  const handleEventClick = (eventId: number) => {
    navigate(`/event/${eventId}`);
  };

  const handleBookNow = (e: React.MouseEvent, eventId: number) => {
    e.stopPropagation();
    navigate(`/event/${eventId}`);
  };

  const EventCard: React.FC<{ event: Event }> = ({ event }) => (
    <div
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
      onClick={() => handleEventClick(event.id)}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          width={400}
          height={192}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Featured Badge */}
        {event.featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
          {event.category}
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <Star className="w-3 h-3 text-yellow-500 fill-current" />
          <span className="text-xs font-medium text-gray-800">
            {event.rating}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{event.date}</span>
            <Clock className="w-4 h-4 ml-2" />
            <span className="text-sm">{event.time}</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">
              {event.venue}, {event.location}
            </span>
          </div>
        </div>

        {event.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {event.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Starting from</p>
            <p className="text-2xl font-bold text-purple-600">{event.price}</p>
          </div>

          <button
            onClick={(e) => handleBookNow(e, event.id)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className={`bg-gradient-to-r ${catInfo.gradient} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>

          <div className="text-center">
            <div className="text-6xl mb-4">{catInfo.icon}</div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {catInfo.title}
            </h1>
            <p className="text-xl text-white/90 mb-6">{catInfo.subtitle}</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 inline-block">
              <span className="font-semibold">
                {events.length} Events Found
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
              <div className="text-6xl mb-4">{catInfo.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Events Found
              </h3>
              <p className="text-gray-600 mb-6">
                We couldn&#39;t find any events in this category right now.
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
              >
                Explore Other Events
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CategoryPageComponent), {
  ssr: false,
});
