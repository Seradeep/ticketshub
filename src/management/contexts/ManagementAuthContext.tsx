import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserByEmail, getUserById } from '../data/mockDatabase';

interface ManagementAuthContextType {
  user: any | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const ManagementAuthContext = createContext<ManagementAuthContextType | undefined>(undefined);

export const useManagementAuth = () => {
  const context = useContext(ManagementAuthContext);
  if (context === undefined) {
    throw new Error('useManagementAuth must be used within a ManagementAuthProvider');
  }
  return context;
};

export const ManagementAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('management_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        // Verify user still exists in database
        const currentUser = getUserById(userData.id);
        if (currentUser && currentUser.status === 'verified') {
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          // Clear invalid user data
          localStorage.removeItem('management_user');
        }
      } catch (error) {
        // Clear corrupted user data
        localStorage.removeItem('management_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const foundUser = getUserByEmail(email);
      
      if (foundUser && foundUser.password === password) {
        if (foundUser.status !== 'verified') {
          console.log('User not verified:', foundUser.status);
          return false; // User not verified
        }
        
        // Update last login
        foundUser.lastLogin = new Date().toISOString();
        
        setUser(foundUser);
        setIsAuthenticated(true);
        localStorage.setItem('management_user', JSON.stringify(foundUser));
        return true;
      }
      
      console.log('Invalid credentials for:', email);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('management_user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading
  };

  return (
    <ManagementAuthContext.Provider value={value}>
      {children}
    </ManagementAuthContext.Provider>
  );
};