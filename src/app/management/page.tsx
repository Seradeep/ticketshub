'use client';

import React from 'react';
import { ManagementAuthProvider } from '../../management/contexts/ManagementAuthContext';
import ManagementHeader from '../../management/components/ManagementHeader';
import ManagementLanding from '../../management/pages/ManagementLanding';

const ManagementPage = () => {
  return (
    <ManagementAuthProvider>
      <div className="min-h-screen">
        <ManagementHeader />
        <div className="pt-16">
          <ManagementLanding />
        </div>
      </div>
    </ManagementAuthProvider>
  );
};

export default ManagementPage;