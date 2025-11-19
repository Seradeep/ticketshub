import React, { useState } from "react";
import { useManagementAuth } from "../contexts/ManagementAuthContext";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import {
  Bell,
  Check,
  Trash2,
  Filter,
  MoreVertical,
  Calendar,
  Users,
  Star,
  DollarSign,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Info,
  Settings,
  Shield,
  Award,
} from "lucide-react";

const NotificationsPage = () => {
  const { user } = useManagementAuth();
  const [filter, setFilter] = useState("all");
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>(
    []
  );

  // Role-specific notifications
  const getRoleSpecificNotifications = () => {
    const notificationsByRole = {
      admin: [
        {
          id: 1,
          type: "security_alert",
          title: "Security Update Required",
          message: "Platform security patch available for deployment",
          time: "2 minutes ago",
          read: false,
          icon: Shield,
          color: "bg-red-500",
          priority: "high",
        },
        {
          id: 2,
          type: "user_verification",
          title: "User Verification Queue",
          message: "5 new organizer accounts pending verification",
          time: "1 hour ago",
          read: false,
          icon: Users,
          color: "bg-orange-500",
          priority: "medium",
        },
        {
          id: 3,
          type: "system_health",
          title: "System Performance Report",
          message: "Weekly system health report is ready for review",
          time: "3 hours ago",
          read: true,
          icon: CheckCircle,
          color: "bg-green-500",
          priority: "low",
        },
      ],
      organizer: [
        {
          id: 1,
          type: "event_approved",
          title: "Event Approved",
          message:
            "Your Tech Innovation Summit 2025 has been approved and is now live",
          time: "2 minutes ago",
          read: false,
          icon: CheckCircle,
          color: "bg-green-500",
          priority: "high",
        },
        {
          id: 2,
          type: "partner_request",
          title: "New Partnership Request",
          message: "Elite Catering Services wants to partner with your event",
          time: "1 hour ago",
          read: false,
          icon: Users,
          color: "bg-blue-500",
          priority: "medium",
        },
        {
          id: 3,
          type: "booking_milestone",
          title: "Booking Milestone",
          message: "Your event has reached 50% capacity - 500 tickets sold!",
          time: "3 hours ago",
          read: true,
          icon: Calendar,
          color: "bg-purple-500",
          priority: "low",
        },
      ],
      vendor: [
        {
          id: 1,
          type: "service_request",
          title: "New Service Request",
          message: "EventPro Productions needs catering for 500 people",
          time: "2 minutes ago",
          read: false,
          icon: MessageSquare,
          color: "bg-blue-500",
          priority: "high",
        },
        {
          id: 2,
          type: "payment_received",
          title: "Payment Received",
          message: "Payment of ₹85,000 received for Corporate Event catering",
          time: "1 hour ago",
          read: false,
          icon: DollarSign,
          color: "bg-green-500",
          priority: "medium",
        },
        {
          id: 3,
          type: "review_received",
          title: "New Review",
          message: "You received a 5-star review from Business Conference",
          time: "6 hours ago",
          read: true,
          icon: Star,
          color: "bg-yellow-500",
          priority: "low",
        },
      ],
      speaker: [
        {
          id: 1,
          type: "speaking_invitation",
          title: "Speaking Invitation",
          message:
            "You have been invited to speak at AI Innovation Summit 2025",
          time: "2 minutes ago",
          read: false,
          icon: Award,
          color: "bg-purple-500",
          priority: "high",
        },
        {
          id: 2,
          type: "fee_approved",
          title: "Speaking Fee Approved",
          message: "Your speaking fee of ₹75,000 has been approved",
          time: "1 hour ago",
          read: false,
          icon: DollarSign,
          color: "bg-green-500",
          priority: "medium",
        },
        {
          id: 3,
          type: "event_reminder",
          title: "Event Reminder",
          message: "Your keynote at Tech Summit is tomorrow at 2 PM",
          time: "2 days ago",
          read: false,
          icon: AlertCircle,
          color: "bg-orange-500",
          priority: "high",
        },
      ],
      sponsor: [
        {
          id: 1,
          type: "sponsorship_opportunity",
          title: "New Sponsorship Opportunity",
          message: "Tech Innovation Summit 2025 is seeking premium sponsors",
          time: "2 minutes ago",
          read: false,
          icon: DollarSign,
          color: "bg-yellow-500",
          priority: "high",
        },
        {
          id: 2,
          type: "roi_report",
          title: "ROI Report Available",
          message: "Your Business Summit sponsorship achieved 3.2x ROI",
          time: "1 hour ago",
          read: false,
          icon: CheckCircle,
          color: "bg-green-500",
          priority: "medium",
        },
        {
          id: 3,
          type: "brand_exposure",
          title: "Brand Exposure Report",
          message: "Your brand reached 250K+ impressions last month",
          time: "3 hours ago",
          read: true,
          icon: Star,
          color: "bg-blue-500",
          priority: "low",
        },
      ],
    };

    return (
      notificationsByRole[user?.role as keyof typeof notificationsByRole] ||
      notificationsByRole.organizer
    );
  };

  const notifications = getRoleSpecificNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    if (filter === "high") return notification.priority === "high";
    return notification.type === filter;
  });

  const handleSelectNotification = (id: number) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]
    );
  };

  const handleMarkAsRead = (ids: number[]) => {
    console.log("Marking as read:", ids);
  };

  const handleDelete = (ids: number[]) => {
    console.log("Deleting:", ids);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-300";
    }
  };

  const getRoleSpecificTitle = () => {
    const titles = {
      admin: "Platform Notifications",
      organizer: "Event Notifications",
      vendor: "Service Notifications",
      speaker: "Speaking Notifications",
      sponsor: "Sponsorship Notifications",
    };
    return titles[user?.role as keyof typeof titles] || "Notifications";
  };

  const getRoleSpecificFilters = () => {
    const filtersByRole = {
      admin: [
        { value: "all", label: "All Notifications" },
        { value: "unread", label: "Unread" },
        { value: "high", label: "High Priority" },
        { value: "security_alert", label: "Security Alerts" },
        { value: "user_verification", label: "User Verifications" },
        { value: "system_health", label: "System Health" },
      ],
      organizer: [
        { value: "all", label: "All Notifications" },
        { value: "unread", label: "Unread" },
        { value: "high", label: "High Priority" },
        { value: "event_approved", label: "Event Updates" },
        { value: "partner_request", label: "Partner Requests" },
        { value: "booking_milestone", label: "Booking Updates" },
      ],
      vendor: [
        { value: "all", label: "All Notifications" },
        { value: "unread", label: "Unread" },
        { value: "high", label: "High Priority" },
        { value: "service_request", label: "Service Requests" },
        { value: "payment_received", label: "Payments" },
        { value: "review_received", label: "Reviews" },
      ],
      speaker: [
        { value: "all", label: "All Notifications" },
        { value: "unread", label: "Unread" },
        { value: "high", label: "High Priority" },
        { value: "speaking_invitation", label: "Speaking Invitations" },
        { value: "fee_approved", label: "Fee Updates" },
        { value: "event_reminder", label: "Event Reminders" },
      ],
      sponsor: [
        { value: "all", label: "All Notifications" },
        { value: "unread", label: "Unread" },
        { value: "high", label: "High Priority" },
        { value: "sponsorship_opportunity", label: "Opportunities" },
        { value: "roi_report", label: "ROI Reports" },
        { value: "brand_exposure", label: "Brand Reports" },
      ],
    };

    return (
      filtersByRole[user?.role as keyof typeof filtersByRole] ||
      filtersByRole.organizer
    );
  };

  const roleFilters = getRoleSpecificFilters();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="space-y-6">
            <Breadcrumbs />

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {getRoleSpecificTitle()}
                </h1>
                <p className="text-gray-600 mt-1">
                  {unreadCount} unread notification
                  {unreadCount !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {roleFilters.map((filterOption) => (
                    <option key={filterOption.value} value={filterOption.value}>
                      {filterOption.label}
                    </option>
                  ))}
                </select>
                {selectedNotifications.length > 0 && (
                  <>
                    <button
                      onClick={() => handleMarkAsRead(selectedNotifications)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Mark Read</span>
                    </button>
                    <button
                      onClick={() => handleDelete(selectedNotifications)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </>
                )}
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {filteredNotifications.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {filteredNotifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <div
                        key={notification.id}
                        className={`p-6 hover:bg-gray-50 transition-colors duration-200 border-l-4 ${getPriorityColor(
                          notification.priority
                        )} ${!notification.read ? "bg-blue-50/30" : ""}`}
                      >
                        <div className="flex items-start space-x-4">
                          <input
                            type="checkbox"
                            checked={selectedNotifications.includes(
                              notification.id
                            )}
                            onChange={() =>
                              handleSelectNotification(notification.id)
                            }
                            className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <div
                            className={`${notification.color} w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3
                                  className={`font-semibold ${
                                    !notification.read
                                      ? "text-gray-900"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {notification.title}
                                  {!notification.read && (
                                    <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
                                  )}
                                </h3>
                                <p className="text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-gray-400 text-sm mt-2">
                                  {notification.time}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    notification.priority === "high"
                                      ? "bg-red-100 text-red-800"
                                      : notification.priority === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {notification.priority}
                                </span>
                                <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No notifications
                  </h3>
                  <p className="text-gray-600">
                    You&#39;re all caught up! No new notifications to show.
                  </p>
                </div>
              )}
            </div>

            {/* Role-specific Notification Settings */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Notification Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">
                    Email Notifications
                  </h4>
                  <div className="space-y-3">
                    {user?.role === "admin" &&
                      [
                        "Security alerts",
                        "User verifications",
                        "System reports",
                        "Platform updates",
                      ].map((item) => (
                        <label
                          key={item}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-gray-700">{item}</span>
                        </label>
                      ))}

                    {user?.role === "organizer" &&
                      [
                        "Event approvals",
                        "Partner requests",
                        "Booking updates",
                        "Payment confirmations",
                      ].map((item) => (
                        <label
                          key={item}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-gray-700">{item}</span>
                        </label>
                      ))}

                    {user?.role === "vendor" &&
                      [
                        "Service requests",
                        "Payment confirmations",
                        "Client reviews",
                        "Booking updates",
                      ].map((item) => (
                        <label
                          key={item}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-gray-700">{item}</span>
                        </label>
                      ))}

                    {user?.role === "speaker" &&
                      [
                        "Speaking invitations",
                        "Fee approvals",
                        "Event reminders",
                        "Review notifications",
                      ].map((item) => (
                        <label
                          key={item}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-gray-700">{item}</span>
                        </label>
                      ))}

                    {user?.role === "sponsor" &&
                      [
                        "Sponsorship opportunities",
                        "ROI reports",
                        "Brand exposure reports",
                        "Event updates",
                      ].map((item) => (
                        <label
                          key={item}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-gray-700">{item}</span>
                        </label>
                      ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">
                    Push Notifications
                  </h4>
                  <div className="space-y-3">
                    {[
                      "Urgent messages",
                      "Event reminders",
                      "System updates",
                      "Marketing updates",
                    ].map((item) => (
                      <label key={item} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          defaultChecked={item !== "Marketing updates"}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-gray-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
