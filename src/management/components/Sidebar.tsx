import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  LogOut,
  BarChart3,
  UserCheck,
  Building,
  Award,
  DollarSign,
  Briefcase,
  Mic,
  Target,
  MessageSquare,
  Bell,
  HelpCircle,
} from "lucide-react";
import { useManagementAuth } from "../contexts/ManagementAuthContext";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useManagementAuth();

  const handleLogout = () => {
    logout();
    router.push("/management");
  };

  const getRoleIcon = (role: string) => {
    const icons = {
      admin: UserCheck,
      organizer: Building,
      vendor: Briefcase,
      speaker: Mic,
      sponsor: Target,
    };
    return icons[role as keyof typeof icons] || UserCheck;
  };

  const getRoleColor = (role: string) => {
    const colors = {
      admin: "from-red-500 to-red-600",
      organizer: "from-blue-500 to-blue-600",
      vendor: "from-green-500 to-green-600",
      speaker: "from-purple-500 to-purple-600",
      sponsor: "from-yellow-500 to-yellow-600",
    };
    return colors[role as keyof typeof colors] || "from-gray-500 to-gray-600";
  };

  const getMenuItems = () => {
    const commonItems = [
      {
        icon: LayoutDashboard,
        label: "Dashboard",
        path: "/management/dashboard",
      },
      { icon: BarChart3, label: "Analytics", path: "/management/analytics" },
      { icon: MessageSquare, label: "Messages", path: "/management/messages" },
      { icon: Bell, label: "Notifications", path: "/management/notifications" },
    ];

    const roleSpecificItems = {
      admin: [
        { icon: Users, label: "User Management", path: "/management/users" },
        { icon: Calendar, label: "All Events", path: "/management/events" },
        {
          icon: Settings,
          label: "Platform Settings",
          path: "/management/platform-settings",
        },
      ],
      organizer: [
        { icon: Calendar, label: "My Events", path: "/management/events" },
        { icon: Users, label: "Connections", path: "/management/connections" },
        { icon: Target, label: "Find Partners", path: "/management/partners" },
      ],
      vendor: [
        { icon: Briefcase, label: "My Services", path: "/management/services" },
        { icon: Calendar, label: "Bookings", path: "/management/bookings" },
        { icon: Users, label: "Clients", path: "/management/clients" },
      ],
      speaker: [
        {
          icon: Mic,
          label: "Speaking Events",
          path: "/management/speaking-events",
        },
        {
          icon: Calendar,
          label: "Invitations",
          path: "/management/invitations",
        },
        { icon: Award, label: "Profile", path: "/management/speaker-profile" },
      ],
      sponsor: [
        {
          icon: Target,
          label: "Sponsorships",
          path: "/management/sponsorships",
        },
        {
          icon: Calendar,
          label: "Opportunities",
          path: "/management/opportunities",
        },
        {
          icon: BarChart3,
          label: "ROI Analytics",
          path: "/management/roi-analytics",
        },
      ],
    };

    return [
      ...commonItems,
      ...(roleSpecificItems[user?.role as keyof typeof roleSpecificItems] ||
        []),
    ];
  };

  const menuItems = getMenuItems();
  const RoleIcon = getRoleIcon(user?.role);

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo Only */}
      <div className="p-6 border-b border-gray-200 flex justify-center">
        <Image
          src="/ticketshub_logo.png"
          alt="TICKETSHUB"
          width={75}
          height={75}
        />
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div
            className={`bg-gradient-to-r ${getRoleColor(
              user?.role
            )} w-12 h-12 rounded-xl flex items-center justify-center`}
          >
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-xl object-cover"
                loading="lazy"
                unoptimized
              />
            ) : (
              <RoleIcon className="w-6 h-6 text-white" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {user?.name}
            </h3>
            <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive ? "text-white" : "text-gray-500"
                }`}
              />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button
          onClick={() => router.push("/management/settings")}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200"
        >
          <Settings className="w-5 h-5 text-gray-500" />
          <span className="font-medium">Settings</span>
        </button>

        <button
          onClick={() => router.push("/management/help")}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200"
        >
          <HelpCircle className="w-5 h-5 text-gray-500" />
          <span className="font-medium">Help & Support</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
