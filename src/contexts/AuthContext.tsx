"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  tickets: Ticket[];
}

interface Ticket {
  id: string;
  eventId: number;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  location: string;
  quantity: number;
  totalAmount: number;
  bookingDate: string;
  qrCode: string;
  status: "confirmed" | "cancelled";
  seatNumbers?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  addTicket: (ticket: Omit<Ticket, "id" | "bookingDate" | "qrCode">) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Demo user data
const DEMO_USER = {
  id: "demo-user-1",
  name: "John Doe",
  email: "demo@ticketshub.com",
  phone: "+91 98765 43210",
  avatar:
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
  tickets: [],
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Sync auth state on mount, window focus, and localStorage changes
  useEffect(() => {
    const syncAuthState = () => {
      const savedUser = localStorage.getItem("ticketshub_user");
      const savedTickets = localStorage.getItem("ticketshub_tickets");
      const tickets = savedTickets ? JSON.parse(savedTickets) : [];

      if (savedUser) {
        const userData = JSON.parse(savedUser);
        // Merge any stored tickets with user data
        const mergedUser = {
          ...userData,
          tickets: tickets.length > 0 ? tickets : userData.tickets || [],
        };
        setUser(mergedUser);
        setIsAuthenticated(true);
        // Ensure tickets are saved separately
        localStorage.setItem(
          "ticketshub_tickets",
          JSON.stringify(mergedUser.tickets)
        );
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    syncAuthState();
    window.addEventListener("focus", syncAuthState);
    window.addEventListener("storage", syncAuthState);
    return () => {
      window.removeEventListener("focus", syncAuthState);
      window.removeEventListener("storage", syncAuthState);
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check for existing tickets
    const savedTickets = localStorage.getItem("ticketshub_tickets");
    const existingTickets = savedTickets ? JSON.parse(savedTickets) : [];

    // Demo login - accept demo credentials or any email/password combination
    if (email === "demo@ticketshub.com" && password === "demo123") {
      const userData = {
        ...DEMO_USER,
        tickets: existingTickets,
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("ticketshub_user", JSON.stringify(userData));
      localStorage.setItem(
        "ticketshub_tickets",
        JSON.stringify(userData.tickets)
      );
      return true;
    } else if (email && password) {
      // For demo purposes, accept any valid email/password
      const userData = {
        id: `user-${Date.now()}`,
        name: email.split("@")[0],
        email,
        phone: "+91 98765 43210",
        tickets: existingTickets,
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("ticketshub_user", JSON.stringify(userData));
      localStorage.setItem(
        "ticketshub_tickets",
        JSON.stringify(userData.tickets)
      );
      return true;
    }
    return false;
  };

  const signup = async (userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }): Promise<boolean> => {
    // Check for existing tickets
    const savedTickets = localStorage.getItem("ticketshub_tickets");
    const existingTickets = savedTickets ? JSON.parse(savedTickets) : [];

    // For demo purposes, accept any signup
    const newUser = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      tickets: existingTickets,
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("ticketshub_user", JSON.stringify(newUser));
    localStorage.setItem("ticketshub_tickets", JSON.stringify(newUser.tickets));
    return true;
  };

  const logout = () => {
    // Keep tickets in localStorage but remove user authentication data
    if (user && user.tickets && user.tickets.length > 0) {
      localStorage.setItem("ticketshub_tickets", JSON.stringify(user.tickets));
    }

    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("ticketshub_user");
    window.location.href = "/";
  };

  const addTicket = (
    ticketData: Omit<Ticket, "id" | "bookingDate" | "qrCode">
  ) => {
    // Always get the latest user from localStorage
    const savedUser = localStorage.getItem("ticketshub_user");
    const currentUser: User | null = savedUser ? JSON.parse(savedUser) : user;
    if (!currentUser) return;

    const newTicket: Ticket = {
      ...ticketData,
      id: `ticket-${Date.now()}`,
      bookingDate: new Date().toISOString(),
      qrCode: generateQRCode(ticketData),
      status: "confirmed",
    };

    const updatedUser = {
      ...currentUser,
      tickets: [...(currentUser.tickets || []), newTicket],
    };

    setUser(updatedUser);
    localStorage.setItem("ticketshub_user", JSON.stringify(updatedUser));
    // Also store tickets separately for persistence across logins
    localStorage.setItem(
      "ticketshub_tickets",
      JSON.stringify(updatedUser.tickets)
    );
  };

  const generateQRCode = (
    ticketData: Omit<Ticket, "id" | "bookingDate" | "qrCode">
  ): string => {
    // Generate a simple QR code data string
    const qrData = {
      eventId: ticketData.eventId,
      eventTitle: ticketData.eventTitle,
      quantity: ticketData.quantity,
      venue: ticketData.venue,
      date: ticketData.eventDate,
      time: ticketData.eventTime,
    };
    return btoa(JSON.stringify(qrData));
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated,
    addTicket,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
