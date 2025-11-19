'use client';

import React from 'react';
import { ManagementAuthProvider } from '../../../management/contexts/ManagementAuthContext';
import MessagesPage from '../../../management/pages/MessagesPage';

const ManagementMessagesPage = () => {
  return (
    <ManagementAuthProvider>
      <MessagesPage />
    </ManagementAuthProvider>
  );
};

export default ManagementMessagesPage;