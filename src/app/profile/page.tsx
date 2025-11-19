"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Clock,
  QrCode,
  Download,
  Settings,
  LogOut,
  Ticket,
  Star,
  ChevronRight,
  Edit3,
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
import Image from "next/image";

const ProfilePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("tickets");
  const { user, logout, isAuthenticated } = useAuth();
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showQRModal, setShowQRModal] = useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    // The logout function now handles the redirect automatically
  };

  if (!user) return null;

  const generateQRCodeImage = (qrData: string) => {
    // In a real app, you'd use a QR code library like qrcode
    // For demo purposes, we'll create a placeholder QR code
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 200;
    canvas.height = 200;

    if (ctx) {
      // Create a simple pattern as QR code placeholder
      ctx.fillStyle = "#000";
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          if (Math.random() > 0.5) {
            ctx.fillRect(i * 10, j * 10, 10, 10);
          }
        }
      }
    }

    return canvas.toDataURL();
  };

  const TicketCard = ({ ticket }: { ticket: any }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{ticket.eventTitle}</h3>
            <div className="space-y-1 text-purple-100">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{ticket.eventDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{ticket.eventTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">
                  {ticket.venue}, {ticket.location}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 mb-2">
              <span className="text-sm font-medium">
                {ticket.quantity} Ticket{ticket.quantity > 1 ? "s" : ""}
              </span>
            </div>
            <div className="text-2xl font-bold">
              ₹{ticket.totalAmount.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-purple-200">Booking ID: </span>
            <span className="font-mono">{ticket.id}</span>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              ticket.status === "confirmed"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 p-3 rounded-xl">
              <QrCode className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Digital Ticket</h4>
              <p className="text-sm text-gray-600">Show QR code at venue</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="bg-purple-100 text-purple-600 p-2 rounded-lg hover:bg-purple-200 transition-colors duration-200">
              <QrCode className="w-5 h-5" />
            </button>
            <button className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const QRModal = ({
    ticket,
    isOpen,
    onClose,
  }: {
    ticket: any;
    isOpen: boolean;
    onClose: () => void;
  }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300">
          <div className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Your Ticket
              </h3>
              <p className="text-gray-600">{ticket.eventTitle}</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-center mb-6">
              <Image
                src={generateQRCodeImage(ticket.qrCode)}
                alt="QR Code"
                width={192}
                height={192}
                className="w-48 h-48 mx-auto mb-4 border border-gray-200 rounded-xl"
                style={{ objectFit: "contain" }}
              />
              <p className="text-sm text-gray-600 mb-2">
                Scan this QR code at the venue
              </p>
              <p className="font-mono text-xs text-gray-500 bg-white px-3 py-1 rounded-lg inline-block">
                {ticket.id}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date & Time</span>
                <span className="font-medium">
                  {ticket.eventDate} at {ticket.eventTime}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Venue</span>
                <span className="font-medium">{ticket.venue}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tickets</span>
                <span className="font-medium">{ticket.quantity}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-2xl object-cover"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {user.name}
                </h1>
                <div className="space-y-1 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{user.phone}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="bg-gray-100 text-gray-600 p-3 rounded-xl hover:bg-gray-200 transition-colors duration-200">
                  <Edit3 className="w-5 h-5" />
                </button>
                <button className="bg-gray-100 text-gray-600 p-3 rounded-xl hover:bg-gray-200 transition-colors duration-200">
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-100 text-red-600 p-3 rounded-xl hover:bg-red-200 transition-colors duration-200"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Ticket className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {user.tickets.length}
                  </h3>
                  <p className="text-gray-600">Total Tickets</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {
                      user.tickets.filter((t) => t.status === "confirmed")
                        .length
                    }
                  </h3>
                  <p className="text-gray-600">Upcoming Events</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-100 p-3 rounded-xl">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">4.8</h3>
                  <p className="text-gray-600">Average Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-8">
                <button
                  onClick={() => setActiveTab("tickets")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === "tickets"
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  My Tickets
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === "history"
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Booking History
                </button>
              </nav>
            </div>

            <div className="p-8">
              {activeTab === "tickets" && (
                <div>
                  {user.tickets.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {user.tickets.map((ticket) => (
                        <div
                          key={ticket.id}
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setShowQRModal(true);
                          }}
                        >
                          <TicketCard ticket={ticket} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Ticket className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        No Tickets Yet
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Start exploring events and book your first ticket!
                      </p>
                      <button
                        onClick={() => router.push("/")}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                      >
                        Explore Events
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "history" && (
                <div>
                  {user.tickets.length > 0 ? (
                    <div className="space-y-4">
                      {user.tickets.map((ticket) => (
                        <div
                          key={ticket.id}
                          className="bg-gray-50 rounded-xl p-6 flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                              <Ticket className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {ticket.eventTitle}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {ticket.eventDate} • {ticket.quantity} ticket
                                {ticket.quantity > 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">
                              ₹{ticket.totalAmount.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">
                              {new Date(
                                ticket.bookingDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-600">
                        No booking history available.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedTicket && (
          <QRModal
            ticket={selectedTicket}
            isOpen={showQRModal}
            onClose={() => {
              setShowQRModal(false);
              setSelectedTicket(null);
            }}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
