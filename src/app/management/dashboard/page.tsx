'use client';

import React from 'react';
import { ManagementAuthProvider } from '../../../management/contexts/ManagementAuthContext';
import Dashboard from '../../../management/pages/Dashboard';

const ManagementDashboardPage = () => {
  return (
    <ManagementAuthProvider>
      <Dashboard />
    </ManagementAuthProvider>
  );
};

export default ManagementDashboardPage;