'use client';

import React from 'react';
import { ManagementAuthProvider } from '../../../management/contexts/ManagementAuthContext';
import NotificationsPage from '../../../management/pages/NotificationsPage';

const ManagementNotificationsPage = () => {
  return (
    <ManagementAuthProvider>
      <NotificationsPage />
    </ManagementAuthProvider>
  );
};

export default ManagementNotificationsPage;