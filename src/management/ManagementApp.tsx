import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ManagementAuthProvider, useManagementAuth } from './contexts/ManagementAuthContext';
import ManagementHeader from './components/ManagementHeader';
import ManagementLanding from './pages/ManagementLanding';
import Dashboard from './pages/Dashboard';
import CreateEventPage from './pages/CreateEventPage';
import AnalyticsPage from './pages/AnalyticsPage';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useManagementAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/management" replace />;
  }

  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <ManagementHeader />
      <div className="pt-16">
        {children}
      </div>
    </>
  );
};

const ManagementAppContent = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <ManagementLanding />
            </PublicRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create-event" 
          element={
            <ProtectedRoute>
              <CreateEventPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/analytics" 
          element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/messages" 
          element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/notifications" 
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/events" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/help" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/management" replace />} />
      </Routes>
    </div>
  );
};

const ManagementApp = () => {
  return (
    <ManagementAuthProvider>
      <ManagementAppContent />
    </ManagementAuthProvider>
  );
};

export default ManagementApp;