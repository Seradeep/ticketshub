import React, { useState } from "react";
import {
  X,
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  Building,
  Globe,
  MapPin,
  DollarSign,
  Award,
  Briefcase,
} from "lucide-react";
import { useManagementAuth } from "../contexts/ManagementAuthContext";
import { DEMO_CREDENTIALS } from "../data/mockDatabase";

interface ManagementAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "signin" | "signup";
  selectedRole: "organizer" | "vendor" | "speaker" | "sponsor";
  onSuccess: () => void;
}

const ManagementAuthModal: React.FC<ManagementAuthModalProps> = ({
  isOpen,
  onClose,
  mode,
  selectedRole,
  onSuccess,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    email: "",
    phone: "",
    password: "",

    // Organizer specific
    companyName: "",
    website: "",
    description: "",
    experience: "",
    specialization: "",
    location: "",

    // Vendor specific
    serviceType: "",
    priceRange: "",
    services: "",

    // Speaker specific
    title: "",
    bio: "",
    expertise: "",
    speakingFee: "",
    topics: "",
    languages: "",

    // Sponsor specific
    industry: "",
    sponsorshipBudget: "",
    preferredEvents: "",
  });

  const { login } = useManagementAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "signin") {
        const success = await login(formData.email, formData.password);
        if (success) {
          onSuccess();
          onClose();
        } else {
          setError("Invalid credentials or account not verified.");
        }
      } else {
        // Signup flow - simulate registration and verification
        setIsVerifying(true);

        // Show verification process for 10 seconds
        setTimeout(() => {
          setIsVerified(true);
          setTimeout(() => {
            // Auto-login with demo credentials based on role
            const demoCredentials = DEMO_CREDENTIALS[selectedRole];
            login(demoCredentials.email, demoCredentials.password).then(() => {
              onSuccess();
              onClose();
            });
          }, 2000);
        }, 10000);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      if (mode === "signin") {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fillDemoCredentials = (
    role: "organizer" | "vendor" | "speaker" | "sponsor" | "admin"
  ) => {
    const credentials = DEMO_CREDENTIALS[role];
    setFormData((prev) => ({
      ...prev,
      email: credentials.email,
      password: credentials.password,
    }));
  };

  const getRoleIcon = () => {
    const icons = {
      organizer: Building,
      vendor: Briefcase,
      speaker: Award,
      sponsor: DollarSign,
    };
    return icons[selectedRole];
  };

  const getRoleColor = () => {
    const colors = {
      organizer: "from-blue-600 to-blue-700",
      vendor: "from-green-600 to-green-700",
      speaker: "from-purple-600 to-purple-700",
      sponsor: "from-yellow-600 to-yellow-700",
    };
    return colors[selectedRole];
  };

  if (!isOpen) return null;

  // Verification Screen
  if (isVerifying) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300">
          <div className="p-8 text-center">
            {!isVerified ? (
              <>
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-6"></div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Verifying Your Account
                </h2>
                <p className="text-gray-600 mb-4">
                  Please wait while our admin team verifies your registration...
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-yellow-800 text-sm">
                    This usually takes a few minutes. You&#39;ll receive an
                    email once verified.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Account Verified!
                </h2>
                <p className="text-gray-600 mb-4">
                  Welcome to TICKETSHUB Management. Redirecting to your
                  dashboard...
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  const RoleIcon = getRoleIcon();

  const demoRoles = [
    {
      key: "admin" as const,
      name: "Admin",
      icon: "👑",
      color: "bg-red-500 hover:bg-red-600",
      description: "Full platform access",
    },
    {
      key: "organizer" as const,
      name: "Organizer",
      icon: "🏢",
      color: "bg-blue-500 hover:bg-blue-600",
      description: "Create & manage events",
    },
    {
      key: "vendor" as const,
      name: "Vendor",
      icon: "🛠️",
      color: "bg-green-500 hover:bg-green-600",
      description: "Offer services",
    },
    {
      key: "speaker" as const,
      name: "Speaker",
      icon: "🎤",
      color: "bg-purple-500 hover:bg-purple-600",
      description: "Share expertise",
    },
    {
      key: "sponsor" as const,
      name: "Sponsor",
      icon: "💰",
      color: "bg-yellow-500 hover:bg-yellow-600",
      description: "Brand partnerships",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300">
        {/* Header */}
        <div className="relative p-6 pb-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <div className="text-center mb-6">
            <div
              className={`bg-gradient-to-r ${getRoleColor()} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}
            >
              <RoleIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {mode === "signin"
                ? "Welcome Back!"
                : `Join as ${
                    selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)
                  }`}
            </h2>
            <p className="text-gray-600">
              {mode === "signin"
                ? "Sign in to access your dashboard"
                : `Create your ${selectedRole} account`}
            </p>
          </div>
        </div>

        {/* Enhanced Demo Credentials Banner - Only show on signin */}
        {mode === "signin" && (
          <div className="mx-6 mb-6">
            <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-6">
              <div className="text-center mb-4">
                <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-200">
                  <User className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-bold text-indigo-800">
                    Demo Credentials - Choose Your Role
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {demoRoles.map((role) => (
                  <div
                    key={role.key}
                    className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-white/50 hover:bg-white transition-all duration-200 group"
                  >
                    <div className="text-center mb-3">
                      <div className="text-2xl mb-2">{role.icon}</div>
                      <div className="font-bold text-gray-800 text-sm">
                        {role.name}
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        {role.description}
                      </div>
                    </div>

                    <div className="space-y-1 mb-3">
                      <div className="text-xs text-gray-700">
                        <span className="font-medium">Email:</span>
                        <div className="font-mono bg-gray-100 px-2 py-1 rounded text-xs mt-1 break-all">
                          {DEMO_CREDENTIALS[role.key].email}
                        </div>
                      </div>
                      <div className="text-xs text-gray-700">
                        <span className="font-medium">Password:</span>
                        <div className="font-mono bg-gray-100 px-2 py-1 rounded text-xs mt-1">
                          {DEMO_CREDENTIALS[role.key].password}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => fillDemoCredentials(role.key)}
                      className={`w-full text-white px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 transform hover:scale-105 ${role.color}`}
                    >
                      Use {role.name} Login
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-indigo-700 bg-white/60 px-3 py-1 rounded-full inline-block">
                  Click any button above to auto-fill credentials and sign in
                  instantly
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-0">
          <div className="space-y-4">
            {/* Basic Information - Only show name and phone for signup */}
            {mode === "signup" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>

            {/* Role-specific fields for signup */}
            {mode === "signup" && (
              <>
                {/* Common fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="companyName"
                      placeholder={
                        selectedRole === "speaker"
                          ? "Current Position"
                          : "Company Name"
                      }
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      placeholder="Location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Organizer specific fields */}
                {selectedRole === "organizer" && (
                  <>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        name="website"
                        placeholder="Website (optional)"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="experience"
                        placeholder="Years of Experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                      <input
                        type="text"
                        name="specialization"
                        placeholder="Specialization (e.g., Corporate, Weddings)"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Vendor specific fields */}
                {selectedRole === "vendor" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        required
                      >
                        <option value="">Select Service Type</option>
                        <option value="Catering">Catering</option>
                        <option value="Photography">Photography</option>
                        <option value="AV Equipment">AV Equipment</option>
                        <option value="Decoration">Decoration</option>
                        <option value="Security">Security</option>
                        <option value="Transportation">Transportation</option>
                      </select>
                      <input
                        type="text"
                        name="priceRange"
                        placeholder="Price Range (e.g., ₹500-2000)"
                        value={formData.priceRange}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                    <input
                      type="text"
                      name="services"
                      placeholder="Services Offered (comma separated)"
                      value={formData.services}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </>
                )}

                {/* Speaker specific fields */}
                {selectedRole === "speaker" && (
                  <>
                    <input
                      type="text"
                      name="title"
                      placeholder="Professional Title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expertise"
                        placeholder="Areas of Expertise"
                        value={formData.expertise}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                      <input
                        type="text"
                        name="speakingFee"
                        placeholder="Speaking Fee Range"
                        value={formData.speakingFee}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                    <input
                      type="text"
                      name="languages"
                      placeholder="Languages (comma separated)"
                      value={formData.languages}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </>
                )}

                {/* Sponsor specific fields */}
                {selectedRole === "sponsor" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        required
                      >
                        <option value="">Select Industry</option>
                        <option value="Technology">Technology</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Retail">Retail</option>
                        <option value="Manufacturing">Manufacturing</option>
                      </select>
                      <input
                        type="text"
                        name="sponsorshipBudget"
                        placeholder="Sponsorship Budget Range"
                        value={formData.sponsorshipBudget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                    <input
                      type="text"
                      name="preferredEvents"
                      placeholder="Preferred Event Types (comma separated)"
                      value={formData.preferredEvents}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </>
                )}

                {/* Description/Bio field */}
                <textarea
                  name={selectedRole === "speaker" ? "bio" : "description"}
                  placeholder={
                    selectedRole === "speaker"
                      ? "Professional Bio"
                      : "Company Description"
                  }
                  value={
                    selectedRole === "speaker"
                      ? formData.bio
                      : formData.description
                  }
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  required
                />
              </>
            )}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-6 bg-gradient-to-r ${getRoleColor()} text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          >
            {loading
              ? "Please wait..."
              : mode === "signin"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManagementAuthModal;
