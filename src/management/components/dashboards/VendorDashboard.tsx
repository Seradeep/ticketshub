import React, { useState } from 'react';
import { 
  Briefcase, Calendar, DollarSign, Star, TrendingUp, 
  Clock, CheckCircle, XCircle, MessageSquare, Eye, Users, Package
} from 'lucide-react';
import { useManagementAuth } from '../../contexts/ManagementAuthContext';
import Breadcrumbs from '../Breadcrumbs';
import LineChart from '../charts/LineChart';
import BarChart from '../charts/BarChart';
import AreaChart from '../charts/AreaChart';

const VendorDashboard = () => {
  const { user } = useManagementAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Vendor-specific analytics data
  const serviceBookingData = [
    { month: 'Jan', bookings: 8, revenue: 45000, clients: 6 },
    { month: 'Feb', bookings: 12, revenue: 68000, clients: 9 },
    { month: 'Mar', bookings: 10, revenue: 55000, clients: 8 },
    { month: 'Apr', bookings: 15, revenue: 82000, clients: 12 },
    { month: 'May', bookings: 18, revenue: 95000, clients: 14 },
    { month: 'Jun', bookings: 22, revenue: 125000, clients: 18 },
  ];

  const servicePerformanceData = [
    { service: 'Catering', bookings: 45, revenue: 180000 },
    { service: 'Photography', bookings: 32, revenue: 128000 },
    { service: 'Decoration', bookings: 28, revenue: 112000 },
    { service: 'Sound System', bookings: 25, revenue: 75000 },
  ];

  const clientSatisfactionData = [
    { month: 'Jan', satisfaction: 4.2 },
    { month: 'Feb', satisfaction: 4.5 },
    { month: 'Mar', satisfaction: 4.3 },
    { month: 'Apr', satisfaction: 4.7 },
    { month: 'May', satisfaction: 4.8 },
    { month: 'Jun', satisfaction: 4.9 },
  ];

  const stats = [
    {
      title: 'Active Service Bookings',
      value: '12',
      change: '+3 this month',
      icon: Briefcase,
      color: 'bg-blue-500'
    },
    {
      title: 'Service Revenue',
      value: '₹2.4L',
      change: '+18% growth',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Pending Requests',
      value: '5',
      change: '2 new today',
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      title: 'Client Rating',
      value: '4.8',
      change: '+0.2 improvement',
      icon: Star,
      color: 'bg-purple-500'
    }
  ];

  const vendorActivities = [
    {
      id: 1,
      message: 'Catering service completed for Tech Innovation Summit',
      time: '2 hours ago',
      type: 'success',
      icon: CheckCircle
    },
    {
      id: 2,
      message: 'New booking request from Business Conference organizers',
      time: '4 hours ago',
      type: 'info',
      icon: Calendar
    },
    {
      id: 3,
      message: 'Received 5-star review from Corporate Event client',
      time: '1 day ago',
      type: 'success',
      icon: Star
    }
  ];

  const eventInvitations = [
    {
      id: 1,
      eventTitle: 'Tech Innovation Summit 2025',
      organizer: 'EventPro Productions',
      date: '2025-03-15',
      budget: '₹50,000',
      status: 'pending'
    },
    {
      id: 2,
      eventTitle: 'Corporate Annual Meet',
      organizer: 'Business Events Ltd',
      date: '2025-04-20',
      budget: '₹75,000',
      status: 'pending'
    }
  ];

  const activeBookings = [
    {
      id: 1,
      eventTitle: 'Wedding Celebration',
      date: '2025-02-14',
      amount: '₹1,20,000',
      status: 'confirmed'
    },
    {
      id: 2,
      eventTitle: 'Product Launch Event',
      date: '2025-03-10',
      amount: '₹85,000',
      status: 'in_progress'
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Provider Hub</h1>
          <p className="text-gray-600 mt-1">Manage your services and grow your business</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            Update Services
          </button>
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200">
            Service Portfolio
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Booking Trends</h3>
          <LineChart 
            data={serviceBookingData} 
            dataKey="bookings" 
            xAxisKey="month" 
            color="#10b981"
            height={250}
          />
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Performance</h3>
          <BarChart 
            data={servicePerformanceData} 
            dataKey="bookings" 
            xAxisKey="service" 
            color="#3b82f6"
            height={250}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Growth</h3>
          <AreaChart 
            data={serviceBookingData} 
            dataKey="revenue" 
            xAxisKey="month" 
            color="#8b5cf6"
            height={250}
          />
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Satisfaction</h3>
          <LineChart 
            data={clientSatisfactionData} 
            dataKey="satisfaction" 
            xAxisKey="month" 
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
              { id: 'invitations', label: 'Service Requests' },
              { id: 'bookings', label: 'My Bookings' },
              { id: 'profile', label: 'Service Profile' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Response Rate</h4>
                    <p className="text-2xl font-bold text-green-600">95%</p>
                    <p className="text-gray-600 text-sm">Average response time: 2 hours</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Completion Rate</h4>
                    <p className="text-2xl font-bold text-blue-600">98%</p>
                    <p className="text-gray-600 text-sm">Services completed successfully</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Repeat Clients</h4>
                    <p className="text-2xl font-bold text-purple-600">65%</p>
                    <p className="text-gray-600 text-sm">Client retention rate</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {vendorActivities.map((activity) => {
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
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Service Requests</h3>
              <div className="space-y-4">
                {eventInvitations.map((invitation) => (
                  <div key={invitation.id} className="p-6 bg-gray-50 rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 mb-2">{invitation.eventTitle}</h4>
                        <p className="text-gray-600 mb-1">Organized by: {invitation.organizer}</p>
                        <p className="text-gray-600 mb-1">Date: {invitation.date}</p>
                        <p className="text-gray-600">Budget: {invitation.budget}</p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        Pending Response
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Accept</span>
                      </button>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2">
                        <XCircle className="w-4 h-4" />
                        <span>Decline</span>
                      </button>
                      <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">My Service Bookings</h3>
              <div className="space-y-4">
                {activeBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{booking.eventTitle}</h4>
                        <p className="text-gray-600 text-sm">{booking.date} • {booking.amount}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {booking.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Service Profile</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Service Type</h4>
                    <p className="text-gray-600">{user.serviceType || 'Catering Services'}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Price Range</h4>
                    <p className="text-gray-600">{user.priceRange || '₹500 - ₹2000 per person'}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Service Area</h4>
                    <p className="text-gray-600">{user.location || 'Delhi NCR, India'}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Client Rating</h4>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-bold text-lg">4.8</span>
                      <span className="text-gray-600">(127 reviews)</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Services Offered</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Catering', 'Bar Service', 'Waitstaff', 'Event Setup'].map((service) => (
                        <span key={service} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Business Stats</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Events Served</span>
                        <span className="font-medium">150+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Years in Business</span>
                        <span className="font-medium">8 years</span>
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

export default VendorDashboard;