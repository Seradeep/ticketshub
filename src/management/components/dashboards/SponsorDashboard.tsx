import React, { useState } from 'react';
import { 
  DollarSign, Calendar, TrendingUp, Star, Target, 
  Clock, CheckCircle, XCircle, MessageSquare, BarChart3, Eye, Award
} from 'lucide-react';
import { useManagementAuth } from '../../contexts/ManagementAuthContext';
import Breadcrumbs from '../Breadcrumbs';
import LineChart from '../charts/LineChart';
import BarChart from '../charts/BarChart';
import AreaChart from '../charts/AreaChart';
import PieChart from '../charts/PieChart';

const SponsorDashboard = () => {
  const { user } = useManagementAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Sponsor-specific analytics data
  const sponsorshipInvestmentData = [
    { month: 'Jan', sponsorships: 2, investment: 200000, roi: 2.5, leads: 150 },
    { month: 'Feb', sponsorships: 3, investment: 350000, roi: 2.8, leads: 280 },
    { month: 'Mar', sponsorships: 2, investment: 280000, roi: 3.1, leads: 220 },
    { month: 'Apr', sponsorships: 4, investment: 450000, roi: 3.2, leads: 380 },
    { month: 'May', sponsorships: 3, investment: 380000, roi: 3.5, leads: 320 },
    { month: 'Jun', sponsorships: 5, investment: 600000, roi: 3.8, leads: 450 },
  ];

  const brandExposureData = [
    { name: 'Technology Events', value: 45, color: '#3b82f6' },
    { name: 'Business Conferences', value: 25, color: '#10b981' },
    { name: 'Educational Seminars', value: 20, color: '#8b5cf6' },
    { name: 'Healthcare Forums', value: 10, color: '#f59e0b' },
  ];

  const roiComparisonData = [
    { event: 'Tech Summit', roi: 4.2, investment: 300000 },
    { event: 'Business Conf', roi: 3.8, investment: 250000 },
    { event: 'Innovation Forum', roi: 3.5, investment: 200000 },
    { event: 'Startup Meet', roi: 3.2, investment: 150000 },
  ];

  const stats = [
    {
      title: 'Active Sponsorships',
      value: '8',
      change: '+2 this month',
      icon: Target,
      color: 'bg-yellow-500'
    },
    {
      title: 'Brand Investment',
      value: '₹15L',
      change: '+30% growth',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Pending Proposals',
      value: '4',
      change: '2 new today',
      icon: Clock,
      color: 'bg-blue-500'
    },
    {
      title: 'ROI Average',
      value: '3.2x',
      change: '+0.5x improvement',
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  const sponsorActivities = [
    {
      id: 1,
      message: 'Tech Innovation Summit sponsorship delivered 4.2x ROI with 1,200 leads',
      time: '2 hours ago',
      type: 'success',
      icon: CheckCircle
    },
    {
      id: 2,
      message: 'New sponsorship opportunity: Digital Transformation Conference',
      time: '4 hours ago',
      type: 'info',
      icon: Target
    },
    {
      id: 3,
      message: 'Brand exposure report: 250K+ impressions from Business Summit',
      time: '1 day ago',
      type: 'success',
      icon: BarChart3
    }
  ];

  const sponsorshipOpportunities = [
    {
      id: 1,
      eventTitle: 'Tech Innovation Summit 2025',
      organizer: 'EventPro Productions',
      date: '2025-03-15',
      audience: '1,000+ attendees',
      investment: '₹2,00,000',
      category: 'Technology',
      status: 'pending'
    },
    {
      id: 2,
      eventTitle: 'Startup Ecosystem Conference',
      organizer: 'Innovation Hub',
      date: '2025-04-20',
      audience: '800+ attendees',
      investment: '₹1,50,000',
      category: 'Business',
      status: 'pending'
    }
  ];

  const activeSponsorships = [
    {
      id: 1,
      eventTitle: 'Digital Transformation Summit',
      date: '2025-02-28',
      investment: '₹3,00,000',
      status: 'active',
      roi: '3.5x'
    },
    {
      id: 2,
      eventTitle: 'AI & Future Tech Conference',
      date: '2025-03-10',
      investment: '₹2,50,000',
      status: 'confirmed',
      roi: 'TBD'
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Brand Partnership Center</h1>
          <p className="text-gray-600 mt-1">Maximize your brand impact through strategic event sponsorships</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            Brand Portfolio
          </button>
          <button className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200">
            Find Opportunities
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Trends</h3>
          <LineChart 
            data={sponsorshipInvestmentData} 
            dataKey="investment" 
            xAxisKey="month" 
            color="#f59e0b"
            height={250}
          />
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Exposure by Category</h3>
          <PieChart 
            data={brandExposureData} 
            dataKey="value" 
            nameKey="name"
            height={250}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ROI Performance</h3>
          <AreaChart 
            data={sponsorshipInvestmentData} 
            dataKey="roi" 
            xAxisKey="month" 
            color="#8b5cf6"
            height={250}
          />
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Generation</h3>
          <BarChart 
            data={sponsorshipInvestmentData} 
            dataKey="leads" 
            xAxisKey="month" 
            color="#10b981"
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
              { id: 'opportunities', label: 'Sponsorship Opportunities' },
              { id: 'active', label: 'Active Sponsorships' },
              { id: 'analytics', label: 'ROI Analytics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-yellow-500 text-yellow-600'
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Brand Exposure</h4>
                    <p className="text-2xl font-bold text-yellow-600">250K+</p>
                    <p className="text-gray-600 text-sm">Total impressions</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Lead Generation</h4>
                    <p className="text-2xl font-bold text-blue-600">1,200+</p>
                    <p className="text-gray-600 text-sm">Qualified leads</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Conversion Rate</h4>
                    <p className="text-2xl font-bold text-green-600">12%</p>
                    <p className="text-gray-600 text-sm">Lead to customer</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {sponsorActivities.map((activity) => {
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

          {activeTab === 'opportunities' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Sponsorship Opportunities</h3>
              <div className="space-y-4">
                {sponsorshipOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="p-6 bg-gray-50 rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 mb-2">{opportunity.eventTitle}</h4>
                        <p className="text-gray-600 mb-1">Organized by: {opportunity.organizer}</p>
                        <p className="text-gray-600 mb-1">Date: {opportunity.date}</p>
                        <p className="text-gray-600 mb-1">Expected Audience: {opportunity.audience}</p>
                        <p className="text-gray-600 mb-1">Category: {opportunity.category}</p>
                        <p className="text-gray-600">Investment Required: {opportunity.investment}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        New Opportunity
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors duration-200 flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Express Interest</span>
                      </button>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2">
                        <XCircle className="w-4 h-4" />
                        <span>Not Interested</span>
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

          {activeTab === 'active' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Active Brand Sponsorships</h3>
              <div className="space-y-4">
                {activeSponsorships.map((sponsorship) => (
                  <div key={sponsorship.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{sponsorship.eventTitle}</h4>
                        <p className="text-gray-600 text-sm">{sponsorship.date} • Investment: {sponsorship.investment}</p>
                        <p className="text-gray-600 text-sm">ROI: {sponsorship.roi}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      sponsorship.status === 'active' ? 'bg-green-100 text-green-800' :
                      sponsorship.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {sponsorship.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-xl shadow border">
                  <h4 className="font-semibold text-gray-900 mb-2">Best Performing Event</h4>
                  <p className="text-lg font-bold text-yellow-600">Digital Summit 2024</p>
                  <p className="text-gray-600 text-sm">ROI: 4.2x</p>
                </div>
                <div className="p-4 bg-white rounded-xl shadow border">
                  <h4 className="font-semibold text-gray-900 mb-2">Total ROI</h4>
                  <p className="text-lg font-bold text-green-600">3.2x</p>
                  <p className="text-gray-600 text-sm">Across all events</p>
                </div>
                <div className="p-4 bg-white rounded-xl shadow border">
                  <h4 className="font-semibold text-gray-900 mb-2">Preferred Category</h4>
                  <p className="text-lg font-bold text-blue-600">Technology</p>
                  <p className="text-gray-600 text-sm">65% of investments</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Investment Performance Analysis</h4>
                <div className="space-y-3">
                  {roiComparisonData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900">{item.event}</span>
                        <p className="text-sm text-gray-600">Investment: ₹{(item.investment / 1000).toFixed(0)}K</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-green-600">{item.roi}x ROI</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SponsorDashboard;