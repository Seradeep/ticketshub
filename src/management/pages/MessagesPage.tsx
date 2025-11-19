import React, { useState } from "react";
import Image from "next/image";
import { useManagementAuth } from "../contexts/ManagementAuthContext";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Star,
  Archive,
  Trash2,
  Filter,
  Plus,
  MessageSquare,
} from "lucide-react";

const MessagesPage = () => {
  const { user } = useManagementAuth();
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Role-specific conversations
  const getRoleSpecificConversations = () => {
    const baseConversations = {
      admin: [
        {
          id: 1,
          name: "Platform Security Team",
          lastMessage:
            "Security audit completed successfully. All systems secure.",
          time: "2 min ago",
          unread: 2,
          avatar:
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
          online: true,
          type: "system",
        },
        {
          id: 2,
          name: "User Verification Queue",
          lastMessage: "5 new organizer applications pending review.",
          time: "1 hour ago",
          unread: 0,
          avatar:
            "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
          online: false,
          type: "verification",
        },
      ],
      organizer: [
        {
          id: 1,
          name: "Elite Catering Services",
          lastMessage:
            "The catering proposal for your tech summit looks perfect!",
          time: "2 min ago",
          unread: 2,
          avatar:
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
          online: true,
          type: "vendor",
        },
        {
          id: 2,
          name: "Dr. Sarah Wilson",
          lastMessage: "I can confirm my availability for the keynote session.",
          time: "1 hour ago",
          unread: 0,
          avatar:
            "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
          online: false,
          type: "speaker",
        },
      ],
      vendor: [
        {
          id: 1,
          name: "EventPro Productions",
          lastMessage:
            "We need catering for 500 people at the tech conference.",
          time: "2 min ago",
          unread: 2,
          avatar:
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
          online: true,
          type: "organizer",
        },
        {
          id: 2,
          name: "Corporate Events Ltd",
          lastMessage: "Your photography services were excellent last time!",
          time: "1 hour ago",
          unread: 0,
          avatar:
            "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
          online: false,
          type: "organizer",
        },
      ],
      speaker: [
        {
          id: 1,
          name: "Innovation Conference",
          lastMessage: "We would love to have you as our keynote speaker.",
          time: "2 min ago",
          unread: 2,
          avatar:
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
          online: true,
          type: "organizer",
        },
        {
          id: 2,
          name: "Tech Summit Organizers",
          lastMessage: "Your speaking fee proposal has been approved.",
          time: "1 hour ago",
          unread: 0,
          avatar:
            "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
          online: false,
          type: "organizer",
        },
      ],
      sponsor: [
        {
          id: 1,
          name: "Business Conference",
          lastMessage:
            "Your sponsorship package includes premium branding opportunities.",
          time: "2 min ago",
          unread: 2,
          avatar:
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
          online: true,
          type: "organizer",
        },
        {
          id: 2,
          name: "Startup Ecosystem Event",
          lastMessage:
            "ROI report from last sponsorship: 3.2x return achieved.",
          time: "1 hour ago",
          unread: 0,
          avatar:
            "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
          online: false,
          type: "organizer",
        },
      ],
    };

    return (
      baseConversations[user?.role as keyof typeof baseConversations] ||
      baseConversations.organizer
    );
  };

  const conversations = getRoleSpecificConversations();

  // Role-specific messages
  const getRoleSpecificMessages = () => {
    const messagesByRole = {
      admin: [
        {
          id: 1,
          sender: "Platform Security Team",
          content:
            "Security audit completed. All user data is encrypted and secure.",
          time: "10:30 AM",
          isOwn: false,
          type: "text",
        },
        {
          id: 2,
          sender: "You",
          content: "Excellent. Please send me the detailed security report.",
          time: "10:35 AM",
          isOwn: true,
          type: "text",
        },
      ],
      organizer: [
        {
          id: 1,
          sender: "Elite Catering Services",
          content:
            "Hi! We have reviewed your tech summit requirements and can provide premium catering for 1000 attendees.",
          time: "10:30 AM",
          isOwn: false,
          type: "text",
        },
        {
          id: 2,
          sender: "You",
          content:
            "That sounds perfect! What are your menu options and pricing?",
          time: "10:35 AM",
          isOwn: true,
          type: "text",
        },
      ],
      vendor: [
        {
          id: 1,
          sender: "EventPro Productions",
          content:
            "We need catering services for our upcoming tech conference. Can you handle 500 people?",
          time: "10:30 AM",
          isOwn: false,
          type: "text",
        },
        {
          id: 2,
          sender: "You",
          content:
            "Absolutely! We specialize in corporate events. Let me send you our catering packages.",
          time: "10:35 AM",
          isOwn: true,
          type: "text",
        },
      ],
      speaker: [
        {
          id: 1,
          sender: "Innovation Conference",
          content:
            "We would be honored to have you as our keynote speaker for the AI Innovation Summit.",
          time: "10:30 AM",
          isOwn: false,
          type: "text",
        },
        {
          id: 2,
          sender: "You",
          content:
            "Thank you for the invitation! I would love to speak about AI trends. What is the expected audience size?",
          time: "10:35 AM",
          isOwn: true,
          type: "text",
        },
      ],
      sponsor: [
        {
          id: 1,
          sender: "Business Conference",
          content:
            "We have an exciting sponsorship opportunity for the upcoming Business Innovation Summit.",
          time: "10:30 AM",
          isOwn: false,
          type: "text",
        },
        {
          id: 2,
          sender: "You",
          content:
            "Interesting! What kind of brand exposure and ROI can we expect from this sponsorship?",
          time: "10:35 AM",
          isOwn: true,
          type: "text",
        },
      ],
    };

    return (
      messagesByRole[user?.role as keyof typeof messagesByRole] ||
      messagesByRole.organizer
    );
  };

  const messages = getRoleSpecificMessages();

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage("");
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      organizer: "bg-blue-100 text-blue-800",
      vendor: "bg-green-100 text-green-800",
      speaker: "bg-purple-100 text-purple-800",
      sponsor: "bg-yellow-100 text-yellow-800",
      system: "bg-red-100 text-red-800",
      verification: "bg-orange-100 text-orange-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getRoleSpecificTitle = () => {
    const titles = {
      admin: "Platform Communications",
      organizer: "Partner Communications",
      vendor: "Client Messages",
      speaker: "Event Invitations",
      sponsor: "Sponsorship Discussions",
    };
    return titles[user?.role as keyof typeof titles] || "Messages";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <Breadcrumbs />
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {getRoleSpecificTitle()}
              </h1>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                  selectedConversation === conversation.id
                    ? "bg-purple-50 border-purple-200"
                    : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Image
                      src={conversation.avatar}
                      alt={conversation.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                      loading="lazy"
                      unoptimized
                    />
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {conversation.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unread > 0 && (
                        <span className="bg-purple-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                    <span
                      className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${getTypeColor(
                        conversation.type
                      )}`}
                    >
                      {conversation.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image
                  src={
                    conversations.find((c) => c.id === selectedConversation)
                      ?.avatar || ""
                  }
                  alt={
                    conversations.find((c) => c.id === selectedConversation)
                      ?.name || "Avatar"
                  }
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                  loading="lazy"
                  unoptimized
                />
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {
                      conversations.find((c) => c.id === selectedConversation)
                        ?.name
                    }
                  </h2>
                  <p className="text-sm text-gray-500">
                    {conversations.find((c) => c.id === selectedConversation)
                      ?.online
                      ? "Online"
                      : "Last seen 2 hours ago"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isOwn ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.isOwn
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.type === "file" ? (
                    <div className="flex items-center space-x-2">
                      <Paperclip className="w-4 h-4" />
                      <span className="text-sm">{message.content}</span>
                    </div>
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                  <p
                    className={`text-xs mt-1 ${
                      message.isOwn ? "text-purple-100" : "text-gray-500"
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Paperclip className="w-5 h-5" />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
