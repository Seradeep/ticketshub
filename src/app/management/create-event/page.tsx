'use client';

import React from 'react';
import { ManagementAuthProvider } from '../../../management/contexts/ManagementAuthContext';
import CreateEventPage from '../../../management/pages/CreateEventPage';

const ManagementCreateEventPage = () => {
  return (
    <ManagementAuthProvider>
      <CreateEventPage />
    </ManagementAuthProvider>
  );
};

export default ManagementCreateEventPage;