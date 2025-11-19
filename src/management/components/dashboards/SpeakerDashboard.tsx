import React, { useState } from 'react';
import { 
  Mic, Calendar, DollarSign, Star, TrendingUp, 
  Clock, CheckCircle, XCircle, MessageSquare, Award, Users, Globe
} from 'lucide-react';
import { useManagementAuth } from '../../contexts/ManagementAuthContext';
import Breadcrumbs from '../Breadcrumbs';
import LineChart from '../charts/LineChart';
import BarChart from '../charts/BarChart';
import PieChart from '../charts/PieChart';

const SpeakerDashboard = () => {
  const { user } = useManagementAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Speaker-specific analytics data
  const speakingEngagementData = [
    { month: 'Jan', events: 3, earnings: 150000, audience: 1200 },
    { month: 'Feb', events: 5, earnings: 250000, audience: 2100 },
    { month: 'Mar', events: 4, earnings: 200000, audience: 1800 },
    { month: 'Apr', events: 6, earnings: 300000, audience: 2800 },
    { month: 'May', events: 8, earnings: 400000, audience: 3200 },
    { month: 'Jun', events: 10, earnings: 500000, audience: 4100 },
  ];

  const topicExpertiseData = [
    { name: 'AI & Technology', value: 40, color: '#3b82f6' },
    { name: 'Leadership', value: 25, color: '#8b5cf6' },
    { name: 'Innovation', value: 20, color: '#10b981' },
    { name: 'Digital Transformation', value: 15, color: '#f59e0b' },
  ];

  const audienceReachData = [
    { event: 'Tech Summit', audience: 1200, rating: 4.9 },
    { event: 'Business Conference', audience: 800, rating: 4.8 },
    { event: 'Innovation Forum', audience: 1500, rating: 4.9 },
    { event: 'Leadership Workshop', audience: 600, rating: 4.7 },
  ];

  const stats = [
    {
      title: 'Speaking Events',
      value: '24',
      change: '+6 this year',
      icon: Mic,
      color: 'bg-purple-500'
    },
    {
      title: 'Speaking Earnings',
      value: '₹8.5L',
      change: '+25% growth',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Pending Invites',
      value: '3',
      change: '1 new today',
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      title: 'Speaker Rating',
      value: '4.9',
      change: '+0.1 improvement',
      icon: Star,
      color: 'bg-blue-500'
    }
  ];

  const speakerActivities = [
    {
      id: 1,
      message: 'Delivered keynote at Tech Innovation Summit - received 4.9/5 rating',
      time: '2 hours ago',
      type: 'success',
      icon: CheckCircle
    },
    {
      id: 2,
      message: 'New speaking invitation from Digital Transformation Conference',
      time: '4 hours ago',
      type: 'info',
      icon: Calendar
    },
    {
      id: 3,
      message: 'Speaking fee increased to ₹75,000 based on performance',
      time: '1 day ago',
      type: 'success',
      icon: TrendingUp
    }
  ];

  const speakingInvitations = [
    {
      id: 1,
      eventTitle: 'AI & Future Technology Conference',
      organizer: 'TechEvents Pro',
      date: '2025-04-15',
      topic: 'Artificial Intelligence in Business',
      fee: '₹75,000',
      status: 'pending'
    },
    {
      id: 2,
      eventTitle: 'Digital Transformation Summit',
      organizer: 'Business Innovation Ltd',
      date: '2025-05-20',
      topic: 'Leading Digital Change',
      fee: '₹1,00,000',
      status: 'pending'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      eventTitle: 'Tech Innovation Summit 2025',
      date: '2025-03-15',
      topic: 'Future of AI',
      fee: '₹50,000',
      status: 'confirmed'
    },
    {
      id: 2,
      eventTitle: 'Startup Ecosystem Conference',
      date: '2025-03-28',
      topic: 'Innovation Strategies',
      fee: '₹65,000',
      status: 'confirmed'
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Speaker Excellence Hub</h1>
          <p className="text-gray-600 mt-1">Share your expertise and inspire audiences worldwide</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            Update Profile
          </button>
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200">
            Speaker Portfolio
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
              <p className="text-green-600 text-xs mt-1">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Speaking Performance</h3>
          <LineChart 
            data={speakingEngagementData} 
            dataKey="events" 
            xAxisKey="month" 
            color="#8b5cf6"
            height={250}
          />
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Topic Expertise Distribution</h3>
          <PieChart 
            data={topicExpertiseData} 
            dataKey="value" 
            nameKey="name"
            height={250}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings Trend</h3>
          <LineChart 
            data={speakingEngagementData} 
            dataKey="earnings" 
            xAxisKey="month" 
            color="#10b981"
            height={250}
          />
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Audience Reach</h3>
          <BarChart 
            data={audienceReachData} 
            dataKey="audience" 
            xAxisKey="event" 
            color="#f59e0b"
            height={250}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Recent Activity' },
              { id: 'invitations', label: 'Speaking Invitations' },
              { id: 'events', label: 'My Speaking Events' },
              { id: 'profile', label: 'Speaker Profile' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Speaking Excellence Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Acceptance Rate</h4>
                    <p className="text-2xl font-bold text-purple-600">92%</p>
                    <p className="text-gray-600 text-sm">Invitations accepted</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Audience Reach</h4>
                    <p className="text-2xl font-bold text-blue-600">50K+</p>
                    <p className="text-gray-600 text-sm">Total audience reached</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Repeat Invites</h4>
                    <p className="text-2xl font-bold text-green-600">78%</p>
                    <p className="text-gray-600 text-sm">Organizers who re-invited</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {speakerActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activity.type === 'success' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          activity.type === 'success' ? 'text-green-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{activity.message}</p>
                        <p className="text-gray-500 text-sm">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'invitations' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Speaking Invitations</h3>
              <div className="space-y-4">
                {speakingInvitations.map((invitation) => (
                  <div key={invitation.id} className="p-6 bg-gray-50 rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 mb-2">{invitation.eventTitle}</h4>
                        <p className="text-gray-600 mb-1">Organized by: {invitation.organizer}</p>
                        <p className="text-gray-600 mb-1">Date: {invitation.date}</p>
                        <p className="text-gray-600 mb-1">Topic: {invitation.topic}</p>
                        <p className="text-gray-600">Speaking Fee: {invitation.fee}</p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        Pending Response
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Accept</span>
                      </button>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2">
                        <XCircle className="w-4 h-4" />
                        <span>Decline</span>
                      </button>
                      <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Speaking Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Mic className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{event.eventTitle}</h4>
                        <p className="text-gray-600 text-sm">{event.date} • {event.topic}</p>
                        <p className="text-gray-600 text-sm">Fee: {event.fee}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Confirmed
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Speaker Profile</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Professional Title</h4>
                    <p className="text-gray-600">{user.title || 'Technology Innovation Expert'}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Speaking Fee Range</h4>
                    <p className="text-gray-600">{user.speakingFee || '₹50,000 - ₹1,00,000'}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {['English', 'Hindi', 'Kannada'].map((language) => (
                        <span key={language} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Rating & Reviews</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-bold text-lg">4.9</span>
                      <span className="text-gray-600">(89 reviews)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-600">Top Rated Speaker</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {['AI', 'Digital Transformation', 'Innovation', 'Leadership'].map((topic) => (
                        <span key={topic} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Speaking Experience</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Events Completed</span>
                        <span className="font-medium">200+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Years Speaking</span>
                        <span className="font-medium">15 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Global Reach</span>
                        <span className="font-medium">25 countries</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeakerDashboard;