'use client';

import React from 'react';
import { ManagementAuthProvider } from '../../../management/contexts/ManagementAuthContext';
import AnalyticsPage from '../../../management/pages/AnalyticsPage';

const ManagementAnalyticsPage = () => {
  return (
    <ManagementAuthProvider>
      <AnalyticsPage />
    </ManagementAuthProvider>
  );
};

export default ManagementAnalyticsPage;