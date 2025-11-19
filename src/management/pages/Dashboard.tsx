import React from 'react';
import { useManagementAuth } from '../contexts/ManagementAuthContext';
import Sidebar from '../components/Sidebar';
import AdminDashboard from '../components/dashboards/AdminDashboard';
import OrganizerDashboard from '../components/dashboards/OrganizerDashboard';
import VendorDashboard from '../components/dashboards/VendorDashboard';
import SpeakerDashboard from '../components/dashboards/SpeakerDashboard';
import SponsorDashboard from '../components/dashboards/SponsorDashboard';

const Dashboard = () => {
  const { user } = useManagementAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please sign in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'organizer':
        return <OrganizerDashboard />;
      case 'vendor':
        return <VendorDashboard />;
      case 'speaker':
        return <SpeakerDashboard />;
      case 'sponsor':
        return <SponsorDashboard />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Unknown Role</h2>
            <p className="text-gray-600">Your account role is not recognized.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderDashboard()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;