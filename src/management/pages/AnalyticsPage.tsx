import React, { useState } from 'react';
import { useManagementAuth } from '../contexts/ManagementAuthContext';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import PieChart from '../components/charts/PieChart';
import AreaChart from '../components/charts/AreaChart';
import { 
  TrendingUp, Users, Calendar, DollarSign, Eye, 
  Download, Filter, RefreshCw, BarChart3, Target, Award, Briefcase
} from 'lucide-react';

const AnalyticsPage = () => {
  const { user } = useManagementAuth();
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Role-specific analytics data
  const getRoleSpecificData = () => {
    const dataByRole = {
      admin: {
        performanceData: [
          { month: 'Jan', users: 120, events: 15, revenue: 450000, engagement: 78 },
          { month: 'Feb', users: 180, events: 22, revenue: 680000, engagement: 82 },
          { month: 'Mar', users: 240, events: 18, revenue: 550000, engagement: 75 },
          { month: 'Apr', users: 320, events: 28, revenue: 820000, engagement: 88 },
          { month: 'May', users: 450, events: 35, revenue: 950000, engagement: 91 },
          { month: 'Jun', users: 580, events: 42, revenue: 1250000, engagement: 94 },
        ],
        categoryData: [
          { name: 'Organizers', value: 45, color: '#3b82f6' },
          { name: 'Vendors', value: 30, color: '#10b981' },
          { name: 'Speakers', value: 15, color: '#8b5cf6' },
          { name: 'Sponsors', value: 10, color: '#f59e0b' },
        ],
        kpiCards: [
          { title: 'Platform Revenue', value: '₹47L', change: '+23%', trend: 'up', icon: DollarSign, color: 'bg-green-500' },
          { title: 'Active Users', value: '2,847', change: '+12%', trend: 'up', icon: Users, color: 'bg-blue-500' },
          { title: 'Total Events', value: '160', change: '+8%', trend: 'up', icon: Calendar, color: 'bg-purple-500' },
          { title: 'System Health', value: '99.9%', change: 'Stable', trend: 'up', icon: BarChart3, color: 'bg-orange-500' }
        ]
      },
      organizer: {
        performanceData: [
          { month: 'Jan', events: 5, attendees: 1200, revenue: 450000, bookings: 78 },
          { month: 'Feb', events: 8, attendees: 2100, revenue: 780000, bookings: 142 },
          { month: 'Mar', events: 6, attendees: 1800, revenue: 650000, bookings: 98 },
          { month: 'Apr', events: 10, attendees: 2800, revenue: 980000, bookings: 185 },
          { month: 'May', events: 12, attendees: 3200, revenue: 1200000, bookings: 220 },
          { month: 'Jun', events: 15, attendees: 4100, revenue: 1450000, bookings: 285 },
        ],
        categoryData: [
          { name: 'Corporate Events', value: 40, color: '#3b82f6' },
          { name: 'Entertainment', value: 30, color: '#8b5cf6' },
          { name: 'Educational', value: 20, color: '#10b981' },
          { name: 'Social Events', value: 10, color: '#f59e0b' },
        ],
        kpiCards: [
          { title: 'Event Revenue', value: '₹52L', change: '+28%', trend: 'up', icon: DollarSign, color: 'bg-green-500' },
          { title: 'Total Attendees', value: '15.2K', change: '+35%', trend: 'up', icon: Users, color: 'bg-blue-500' },
          { title: 'Events Created', value: '56', change: '+12%', trend: 'up', icon: Calendar, color: 'bg-purple-500' },
          { title: 'Success Rate', value: '94%', change: '+2%', trend: 'up', icon: Target, color: 'bg-orange-500' }
        ]
      },
      vendor: {
        performanceData: [
          { month: 'Jan', bookings: 8, revenue: 45000, clients: 6, satisfaction: 4.2 },
          { month: 'Feb', bookings: 12, revenue: 68000, clients: 9, satisfaction: 4.5 },
          { month: 'Mar', bookings: 10, revenue: 55000, clients: 8, satisfaction: 4.3 },
          { month: 'Apr', bookings: 15, revenue: 82000, clients: 12, satisfaction: 4.7 },
          { month: 'May', bookings: 18, revenue: 95000, clients: 14, satisfaction: 4.8 },
          { month: 'Jun', bookings: 22, revenue: 125000, clients: 18, satisfaction: 4.9 },
        ],
        categoryData: [
          { name: 'Catering', value: 45, color: '#3b82f6' },
          { name: 'Photography', value: 25, color: '#10b981' },
          { name: 'Decoration', value: 20, color: '#8b5cf6' },
          { name: 'AV Equipment', value: 10, color: '#f59e0b' },
        ],
        kpiCards: [
          { title: 'Service Revenue', value: '₹4.7L', change: '+18%', trend: 'up', icon: DollarSign, color: 'bg-green-500' },
          { title: 'Active Bookings', value: '22', change: '+5', trend: 'up', icon: Briefcase, color: 'bg-blue-500' },
          { title: 'Client Rating', value: '4.9', change: '+0.2', trend: 'up', icon: Award, color: 'bg-purple-500' },
          { title: 'Repeat Clients', value: '65%', change: '+8%', trend: 'up', icon: Users, color: 'bg-orange-500' }
        ]
      },
      speaker: {
        performanceData: [
          { month: 'Jan', events: 3, earnings: 150000, audience: 1200, rating: 4.7 },
          { month: 'Feb', events: 5, earnings: 250000, audience: 2100, rating: 4.8 },
          { month: 'Mar', events: 4, earnings: 200000, audience: 1800, rating: 4.6 },
          { month: 'Apr', events: 6, earnings: 300000, audience: 2800, rating: 4.9 },
          { month: 'May', events: 8, earnings: 400000, audience: 3200, rating: 4.9 },
          { month: 'Jun', events: 10, earnings: 500000, audience: 4100, rating: 4.9 },
        ],
        categoryData: [
          { name: 'AI & Technology', value: 40, color: '#3b82f6' },
          { name: 'Leadership', value: 25, color: '#8b5cf6' },
          { name: 'Innovation', value: 20, color: '#10b981' },
          { name: 'Digital Transformation', value: 15, color: '#f59e0b' },
        ],
        kpiCards: [
          { title: 'Speaking Earnings', value: '₹18L', change: '+32%', trend: 'up', icon: DollarSign, color: 'bg-green-500' },
          { title: 'Speaking Events', value: '36', change: '+8', trend: 'up', icon: Calendar, color: 'bg-blue-500' },
          { title: 'Audience Reach', value: '15.2K', change: '+25%', trend: 'up', icon: Users, color: 'bg-purple-500' },
          { title: 'Speaker Rating', value: '4.9', change: '+0.1', trend: 'up', icon: Award, color: 'bg-orange-500' }
        ]
      },
      sponsor: {
        performanceData: [
          { month: 'Jan', sponsorships: 2, investment: 200000, roi: 2.5, leads: 150 },
          { month: 'Feb', sponsorships: 3, investment: 350000, roi: 2.8, leads: 280 },
          { month: 'Mar', sponsorships: 2, investment: 280000, roi: 3.1, leads: 220 },
          { month: 'Apr', sponsorships: 4, investment: 450000, roi: 3.2, leads: 380 },
          { month: 'May', sponsorships: 3, investment: 380000, roi: 3.5, leads: 320 },
          { month: 'Jun', sponsorships: 5, investment: 600000, roi: 3.8, leads: 450 },
        ],
        categoryData: [
          { name: 'Technology Events', value: 45, color: '#3b82f6' },
          { name: 'Business Conferences', value: 25, color: '#10b981' },
          { name: 'Educational Seminars', value: 20, color: '#8b5cf6' },
          { name: 'Healthcare Forums', value: 10, color: '#f59e0b' },
        ],
        kpiCards: [
          { title: 'Total Investment', value: '₹26L', change: '+30%', trend: 'up', icon: DollarSign, color: 'bg-green-500' },
          { title: 'Active Sponsorships', value: '19', change: '+4', trend: 'up', icon: Target, color: 'bg-blue-500' },
          { title: 'Average ROI', value: '3.2x', change: '+0.5x', trend: 'up', icon: TrendingUp, color: 'bg-purple-500' },
          { title: 'Lead Generation', value: '1.8K', change: '+22%', trend: 'up', icon: Users, color: 'bg-orange-500' }
        ]
      }
    };

    return dataByRole[user?.role as keyof typeof dataByRole] || dataByRole.organizer;
  };

  const roleData = getRoleSpecificData();

  const getRoleSpecificTitle = () => {
    const titles = {
      admin: 'Platform Analytics',
      organizer: 'Event Performance Analytics',
      vendor: 'Service Analytics',
      speaker: 'Speaking Performance Analytics',
      sponsor: 'Sponsorship ROI Analytics'
    };
    return titles[user?.role as keyof typeof titles] || 'Analytics Dashboard';
  };

  const getRoleSpecificSubtitle = () => {
    const subtitles = {
      admin: 'Comprehensive platform insights and performance metrics',
      organizer: 'Track your event success and audience engagement',
      vendor: 'Monitor your service performance and client satisfaction',
      speaker: 'Analyze your speaking impact and audience reach',
      sponsor: 'Measure your brand investment returns and exposure'
    };
    return subtitles[user?.role as keyof typeof subtitles] || 'Comprehensive insights and performance metrics';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="space-y-6">
            <Breadcrumbs />
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{getRoleSpecificTitle()}</h1>
                <p className="text-gray-600 mt-1">{getRoleSpecificSubtitle()}</p>
              </div>
              <div className="flex items-center space-x-3">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="1month">Last Month</option>
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="1year">Last Year</option>
                </select>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roleData.kpiCards.map((kpi, index) => {
                const Icon = kpi.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${kpi.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className={`flex items-center space-x-1 text-sm font-medium ${
                        kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <TrendingUp className="w-4 h-4" />
                        <span>{kpi.change}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
                    <p className="text-gray-600 text-sm">{kpi.title}</p>
                  </div>
                );
              })}
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
                  <select
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Metrics</option>
                    {user?.role === 'admin' && <option value="users">Users</option>}
                    {user?.role === 'organizer' && <option value="events">Events</option>}
                    {user?.role === 'vendor' && <option value="bookings">Bookings</option>}
                    {user?.role === 'speaker' && <option value="events">Speaking Events</option>}
                    {user?.role === 'sponsor' && <option value="sponsorships">Sponsorships</option>}
                    <option value="revenue">Revenue</option>
                  </select>
                </div>
                <LineChart 
                  data={roleData.performanceData} 
                  dataKey={user?.role === 'admin' ? 'revenue' : user?.role === 'organizer' ? 'revenue' : user?.role === 'vendor' ? 'revenue' : user?.role === 'speaker' ? 'earnings' : 'investment'} 
                  xAxisKey="month" 
                  color="#8b5cf6"
                  height={300}
                />
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {user?.role === 'admin' ? 'User Distribution' : 
                   user?.role === 'organizer' ? 'Event Categories' :
                   user?.role === 'vendor' ? 'Service Distribution' :
                   user?.role === 'speaker' ? 'Topic Expertise' :
                   'Investment Categories'}
                </h3>
                <PieChart 
                  data={roleData.categoryData} 
                  dataKey="value" 
                  nameKey="name"
                  height={300}
                />
              </div>
            </div>

            {/* Secondary Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {user?.role === 'admin' ? 'User Growth Trend' :
                   user?.role === 'organizer' ? 'Attendee Growth' :
                   user?.role === 'vendor' ? 'Client Growth' :
                   user?.role === 'speaker' ? 'Audience Reach' :
                   'Lead Generation'}
                </h3>
                <AreaChart 
                  data={roleData.performanceData} 
                  dataKey={user?.role === 'admin' ? 'users' : user?.role === 'organizer' ? 'attendees' : user?.role === 'vendor' ? 'clients' : user?.role === 'speaker' ? 'audience' : 'leads'} 
                  xAxisKey="month" 
                  color="#10b981"
                  height={300}
                />
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {user?.role === 'admin' ? 'Monthly Events' :
                   user?.role === 'organizer' ? 'Event Bookings' :
                   user?.role === 'vendor' ? 'Service Satisfaction' :
                   user?.role === 'speaker' ? 'Speaker Rating' :
                   'ROI Performance'}
                </h3>
                <BarChart 
                  data={roleData.performanceData} 
                  dataKey={user?.role === 'admin' ? 'events' : user?.role === 'organizer' ? 'bookings' : user?.role === 'vendor' ? 'satisfaction' : user?.role === 'speaker' ? 'rating' : 'roi'} 
                  xAxisKey="month" 
                  color="#f59e0b"
                  height={300}
                />
              </div>
            </div>

            {/* Role-specific insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Eye className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    {user?.role === 'admin' ? 'Page Views' :
                     user?.role === 'organizer' ? 'Event Views' :
                     user?.role === 'vendor' ? 'Profile Views' :
                     user?.role === 'speaker' ? 'Profile Views' :
                     'Brand Impressions'}
                  </h4>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {user?.role === 'admin' ? '124,567' :
                   user?.role === 'organizer' ? '45,230' :
                   user?.role === 'vendor' ? '12,450' :
                   user?.role === 'speaker' ? '28,340' :
                   '250K+'}
                </p>
                <p className="text-green-600 text-sm">+18% from last month</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    {user?.role === 'admin' ? 'Conversion Rate' :
                     user?.role === 'organizer' ? 'Booking Rate' :
                     user?.role === 'vendor' ? 'Booking Rate' :
                     user?.role === 'speaker' ? 'Acceptance Rate' :
                     'Conversion Rate'}
                  </h4>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {user?.role === 'admin' ? '3.2%' :
                   user?.role === 'organizer' ? '12.5%' :
                   user?.role === 'vendor' ? '8.7%' :
                   user?.role === 'speaker' ? '92%' :
                   '12%'}
                </p>
                <p className="text-green-600 text-sm">+0.5% from last month</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    {user?.role === 'admin' ? 'Avg. Session' :
                     user?.role === 'organizer' ? 'Avg. Event Size' :
                     user?.role === 'vendor' ? 'Avg. Order Value' :
                     user?.role === 'speaker' ? 'Avg. Audience' :
                     'Avg. ROI'}
                  </h4>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {user?.role === 'admin' ? '4m 32s' :
                   user?.role === 'organizer' ? '275 people' :
                   user?.role === 'vendor' ? '₹65K' :
                   user?.role === 'speaker' ? '420 people' :
                   '3.2x'}
                </p>
                <p className="text-green-600 text-sm">
                  {user?.role === 'admin' ? '+12s from last month' :
                   user?.role === 'organizer' ? '+15% from last month' :
                   user?.role === 'vendor' ? '+8% from last month' :
                   user?.role === 'speaker' ? '+12% from last month' :
                   '+0.3x from last month'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;