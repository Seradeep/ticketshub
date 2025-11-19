import React from 'react';
import { useRouter } from 'next/navigation';
import HorizontalEventSlider from './HorizontalEventSlider';
import { TrendingUp, Flame, Star, TreePine, Music } from 'lucide-react';
import { 
  getTrendingEvents, 
  getRecommendedEvents, 
  getOutdoorEvents, 
  getPopularEvents, 
  getLiveEvents,
  getAllEventsWithTemp
} from '../data/mockDatabase';

const TrendingEvents = () => {
  const router = useRouter();

  const handleViewMore = (category: string) => {
    router.push(`/category/${category}`);
  };

  // Use the function that includes temporary events
  const allEvents = getAllEventsWithTemp();
  const trendingEvents = getTrendingEvents();
  const recommendedEvents = getRecommendedEvents();
  const outdoorEvents = getOutdoorEvents();
  const popularEvents = getPopularEvents();
  const liveEvents = getLiveEvents();

  return (
    <div className="bg-gray-50">
      <HorizontalEventSlider
        title="Trending Now"
        subtitle="Most popular events this week"
        events={trendingEvents}
        onViewMore={() => handleViewMore('trending')}
        icon={
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-3 rounded-xl group-hover:rotate-180 transition-transform duration-700 ease-in-out">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        }
      />
      
      <HorizontalEventSlider
        title="Recommended for You"
        subtitle="Handpicked events based on your interests"
        events={recommendedEvents}
        onViewMore={() => handleViewMore('recommended')}
        icon={
          <div className="bg-gradient-to-r from-yellow-500 to-amber-500 p-3 rounded-xl group-hover:rotate-180 transition-transform duration-700 ease-in-out">
            <Star className="w-6 h-6 text-white" />
          </div>
        }
      />
      
      <HorizontalEventSlider
        title="Outdoor Events"
        subtitle="Adventure and outdoor experiences"
        events={outdoorEvents}
        onViewMore={() => handleViewMore('outdoor')}
        icon={
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl group-hover:rotate-180 transition-transform duration-700 ease-in-out">
            <TreePine className="w-6 h-6 text-white" />
          </div>
        }
      />
      
      <HorizontalEventSlider
        title="Popular Events"
        subtitle="Events everyone's talking about"
        events={popularEvents}
        onViewMore={() => handleViewMore('popular')}
        icon={
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-xl group-hover:rotate-180 transition-transform duration-700 ease-in-out">
            <Flame className="w-6 h-6 text-white" />
          </div>
        }
      />
      
      <HorizontalEventSlider
        title="Best of Live Events"
        subtitle="Unforgettable live experiences"
        events={liveEvents}
        onViewMore={() => handleViewMore('live')}
        icon={
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-xl group-hover:rotate-180 transition-transform duration-700 ease-in-out">
            <Music className="w-6 h-6 text-white" />
          </div>
        }
      />
    </div>
  );
};

export default TrendingEvents;