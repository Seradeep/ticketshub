import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  X,
  Plus,
  Trash2,
  Calendar,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Image as ImageIcon,
  FileText,
  Settings,
  Eye,
  Save,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import { useManagementAuth } from "../contexts/ManagementAuthContext";

interface FormField {
  id: string;
  type:
    | "text"
    | "email"
    | "phone"
    | "number"
    | "select"
    | "textarea"
    | "checkbox"
    | "date";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface EventData {
  // Basic Info
  title: string;
  description: string;
  category: string;
  tags: string[];

  // Date & Time
  date: string;
  time: string;
  endDate: string;
  endTime: string;
  timezone: string;

  // Location
  venue: string;
  address: string;
  city: string;
  state: string;
  country: string;
  isOnline: boolean;
  onlineLink?: string;

  // Pricing
  ticketTypes: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    description: string;
  }>;

  // Media
  images: File[];
  imageUrls: string[];

  // Custom Form
  customFields: FormField[];

  // Settings
  maxAttendees: number;
  isPublic: boolean;
  requireApproval: boolean;
  allowWaitlist: boolean;
}

const CreateEventPage = () => {
  const router = useRouter();
  const { user } = useManagementAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [eventData, setEventData] = useState<EventData>({
    title: "",
    description: "",
    category: "",
    tags: [],
    date: "",
    time: "",
    endDate: "",
    endTime: "",
    timezone: "Asia/Kolkata",
    venue: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    isOnline: false,
    onlineLink: "",
    ticketTypes: [
      {
        id: "1",
        name: "General Admission",
        price: 0,
        quantity: 100,
        description: "Standard entry ticket",
      },
    ],
    images: [],
    imageUrls: [],
    customFields: [
      { id: "1", type: "text", label: "Full Name", required: true },
      { id: "2", type: "email", label: "Email Address", required: true },
      { id: "3", type: "phone", label: "Phone Number", required: true },
    ],
    maxAttendees: 1000,
    isPublic: true,
    requireApproval: false,
    allowWaitlist: true,
  });

  const steps = [
    {
      id: 1,
      title: "Basic Info",
      description: "Event details and description",
    },
    { id: 2, title: "Date & Location", description: "When and where" },
    {
      id: 3,
      title: "Tickets & Pricing",
      description: "Ticket types and pricing",
    },
    { id: 4, title: "Media & Images", description: "Upload event images" },
    { id: 5, title: "Registration Form", description: "Custom attendee form" },
    {
      id: 6,
      title: "Settings & Review",
      description: "Final settings and review",
    },
  ];

  const categories = [
    "Technology",
    "Business",
    "Entertainment",
    "Education",
    "Sports",
    "Health & Wellness",
    "Arts & Culture",
    "Food & Drink",
    "Music",
    "Networking",
    "Workshop",
    "Conference",
    "Seminar",
    "Other",
  ];

  const fieldTypes = [
    { value: "text", label: "Text Input" },
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone Number" },
    { value: "number", label: "Number" },
    { value: "select", label: "Dropdown" },
    { value: "textarea", label: "Text Area" },
    { value: "checkbox", label: "Checkbox" },
    { value: "date", label: "Date" },
  ];

  const handleInputChange = (field: string, value: any) => {
    setEventData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = (files: FileList) => {
    const newFiles = Array.from(files);
    const newUrls = newFiles.map((file) => URL.createObjectURL(file));

    setEventData((prev) => ({
      ...prev,
      images: [...prev.images, ...newFiles],
      imageUrls: [...prev.imageUrls, ...newUrls],
    }));
  };

  const removeImage = (index: number) => {
    setEventData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const addTicketType = () => {
    const newTicket = {
      id: Date.now().toString(),
      name: "",
      price: 0,
      quantity: 100,
      description: "",
    };
    setEventData((prev) => ({
      ...prev,
      ticketTypes: [...prev.ticketTypes, newTicket],
    }));
  };

  const updateTicketType = (id: string, field: string, value: any) => {
    setEventData((prev) => ({
      ...prev,
      ticketTypes: prev.ticketTypes.map((ticket) =>
        ticket.id === id ? { ...ticket, [field]: value } : ticket
      ),
    }));
  };

  const removeTicketType = (id: string) => {
    setEventData((prev) => ({
      ...prev,
      ticketTypes: prev.ticketTypes.filter((ticket) => ticket.id !== id),
    }));
  };

  const addCustomField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      type: "text",
      label: "",
      required: false,
    };
    setEventData((prev) => ({
      ...prev,
      customFields: [...prev.customFields, newField],
    }));
  };

  const updateCustomField = (id: string, field: string, value: any) => {
    setEventData((prev) => ({
      ...prev,
      customFields: prev.customFields.map((customField) =>
        customField.id === id ? { ...customField, [field]: value } : customField
      ),
    }));
  };

  const removeCustomField = (id: string) => {
    setEventData((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((field) => field.id !== id),
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!eventData.title.trim())
          newErrors.title = "Event title is required";
        if (!eventData.description.trim())
          newErrors.description = "Event description is required";
        if (!eventData.category) newErrors.category = "Category is required";
        break;
      case 2:
        if (!eventData.date) newErrors.date = "Event date is required";
        if (!eventData.time) newErrors.time = "Event time is required";
        if (!eventData.isOnline) {
          if (!eventData.venue.trim()) newErrors.venue = "Venue is required";
          if (!eventData.city.trim()) newErrors.city = "City is required";
        } else {
          if (!eventData.onlineLink?.trim())
            newErrors.onlineLink = "Online link is required";
        }
        break;
      case 3:
        if (eventData.ticketTypes.length === 0) {
          newErrors.ticketTypes = "At least one ticket type is required";
        } else {
          eventData.ticketTypes.forEach((ticket, index) => {
            if (!ticket.name.trim())
              newErrors[`ticket_${index}_name`] = "Ticket name is required";
          });
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      // Create event object
      const newEvent = {
        id: Date.now(),
        title: eventData.title,
        description: eventData.description,
        category: eventData.category,
        date: new Date(eventData.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        time: eventData.time,
        venue: eventData.isOnline ? "Online Event" : eventData.venue,
        location: eventData.isOnline
          ? "Virtual"
          : `${eventData.city}, ${eventData.state}`,
        state: eventData.state,
        price:
          eventData.ticketTypes.length > 0
            ? `₹${eventData.ticketTypes[0].price}`
            : "Free",
        rating: 4.5,
        image:
          eventData.imageUrls[0] ||
          "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
        featured: false,
        tags: ["new", "organizer-created"],
      };

      // Store in session storage for temporary display
      const existingEvents = JSON.parse(
        sessionStorage.getItem("temp_events") || "[]"
      );
      existingEvents.push(newEvent);
      sessionStorage.setItem("temp_events", JSON.stringify(existingEvents));

      // Store full event data for management
      const fullEventData = {
        ...newEvent,
        fullData: eventData,
        organizerId: user.id,
        status: "draft",
        createdAt: new Date().toISOString(),
      };

      const managementEvents = JSON.parse(
        sessionStorage.getItem("management_events") || "[]"
      );
      managementEvents.push(fullEventData);
      sessionStorage.setItem(
        "management_events",
        JSON.stringify(managementEvents)
      );

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to success page or dashboard
      router.push("/management/dashboard");
    } catch (error) {
      console.error("Error creating event:", error);
      setErrors({ submit: "Failed to create event. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                value={eventData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your event title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Description *
              </label>
              <textarea
                value={eventData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Describe your event in detail"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={eventData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={eventData.tags.join(", ")}
                onChange={(e) =>
                  handleInputChange(
                    "tags",
                    e.target.value.split(",").map((tag) => tag.trim())
                  )
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., networking, technology, innovation"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={eventData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time *
                </label>
                <input
                  type="time"
                  value={eventData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.time ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.time && (
                  <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={eventData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={eventData.endTime}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isOnline"
                checked={eventData.isOnline}
                onChange={(e) =>
                  handleInputChange("isOnline", e.target.checked)
                }
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <label
                htmlFor="isOnline"
                className="text-sm font-medium text-gray-700"
              >
                This is an online event
              </label>
            </div>

            {eventData.isOnline ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Online Event Link *
                </label>
                <input
                  type="url"
                  value={eventData.onlineLink || ""}
                  onChange={(e) =>
                    handleInputChange("onlineLink", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.onlineLink ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="https://zoom.us/j/..."
                />
                {errors.onlineLink && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.onlineLink}
                  </p>
                )}
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Venue Name *
                  </label>
                  <input
                    type="text"
                    value={eventData.venue}
                    onChange={(e) => handleInputChange("venue", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.venue ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter venue name"
                  />
                  {errors.venue && (
                    <p className="text-red-500 text-sm mt-1">{errors.venue}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={eventData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter full address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={eventData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter city"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      value={eventData.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter state"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Ticket Types
              </h3>
              <button
                onClick={addTicketType}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Ticket Type</span>
              </button>
            </div>

            {errors.ticketTypes && (
              <p className="text-red-500 text-sm">{errors.ticketTypes}</p>
            )}

            <div className="space-y-4">
              {eventData.ticketTypes.map((ticket, index) => (
                <div key={ticket.id} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">
                      Ticket Type {index + 1}
                    </h4>
                    {eventData.ticketTypes.length > 1 && (
                      <button
                        onClick={() => removeTicketType(ticket.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ticket Name *
                      </label>
                      <input
                        type="text"
                        value={ticket.name}
                        onChange={(e) =>
                          updateTicketType(ticket.id, "name", e.target.value)
                        }
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          errors[`ticket_${index}_name`]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="e.g., General Admission"
                      />
                      {errors[`ticket_${index}_name`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[`ticket_${index}_name`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        value={ticket.price}
                        onChange={(e) =>
                          updateTicketType(
                            ticket.id,
                            "price",
                            Number(e.target.value)
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="0"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity Available
                      </label>
                      <input
                        type="number"
                        value={ticket.quantity}
                        onChange={(e) =>
                          updateTicketType(
                            ticket.id,
                            "quantity",
                            Number(e.target.value)
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="100"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <input
                        type="text"
                        value={ticket.description}
                        onChange={(e) =>
                          updateTicketType(
                            ticket.id,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Brief description"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Event Images
              </h3>
              <p className="text-gray-600 mb-6">
                Upload high-quality images to showcase your event. The first
                image will be used as the main event image.
              </p>
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-500 transition-colors duration-200 cursor-pointer"
            >
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Click to upload images or drag and drop
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG, GIF up to 10MB each
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                e.target.files && handleImageUpload(e.target.files)
              }
              className="hidden"
            />

            {eventData.imageUrls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {eventData.imageUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={url}
                      alt={`Event image ${index + 1}`}
                      width={256}
                      height={128}
                      className="w-full h-32 object-cover rounded-xl"
                      loading="lazy"
                      unoptimized
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs">
                        Main Image
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Registration Form Builder
              </h3>
              <p className="text-gray-600 mb-6">
                Customize the information you want to collect from attendees
                when they register for your event.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Form Fields</h4>
              <button
                onClick={addCustomField}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Field</span>
              </button>
            </div>

            <div className="space-y-4">
              {eventData.customFields.map((field, index) => (
                <div key={field.id} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-medium text-gray-900">
                      Field {index + 1}
                    </h5>
                    {eventData.customFields.length > 3 && (
                      <button
                        onClick={() => removeCustomField(field.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Field Type
                      </label>
                      <select
                        value={field.type}
                        onChange={(e) =>
                          updateCustomField(field.id, "type", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {fieldTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Field Label
                      </label>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) =>
                          updateCustomField(field.id, "label", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter field label"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Placeholder
                      </label>
                      <input
                        type="text"
                        value={field.placeholder || ""}
                        onChange={(e) =>
                          updateCustomField(
                            field.id,
                            "placeholder",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter placeholder text"
                      />
                    </div>
                  </div>

                  {field.type === "select" && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Options (comma separated)
                      </label>
                      <input
                        type="text"
                        value={field.options?.join(", ") || ""}
                        onChange={(e) =>
                          updateCustomField(
                            field.id,
                            "options",
                            e.target.value.split(",").map((opt) => opt.trim())
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Option 1, Option 2, Option 3"
                      />
                    </div>
                  )}

                  <div className="mt-4 flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={`required-${field.id}`}
                      checked={field.required}
                      onChange={(e) =>
                        updateCustomField(
                          field.id,
                          "required",
                          e.target.checked
                        )
                      }
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <label
                      htmlFor={`required-${field.id}`}
                      className="text-sm font-medium text-gray-700"
                    >
                      Required field
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* Form Preview */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="font-medium text-gray-900 mb-4">Form Preview</h4>
              <div className="space-y-4">
                {eventData.customFields.map((field) => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}{" "}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        rows={3}
                        disabled
                      />
                    ) : field.type === "select" ? (
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        disabled
                      >
                        <option value="">Select an option</option>
                        {field.options?.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "checkbox" ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          disabled
                        />
                        <span className="text-sm text-gray-600">
                          {field.placeholder || field.label}
                        </span>
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        disabled
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Event Settings
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Attendees
                </label>
                <input
                  type="number"
                  value={eventData.maxAttendees}
                  onChange={(e) =>
                    handleInputChange("maxAttendees", Number(e.target.value))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  value={eventData.timezone}
                  onChange={(e) =>
                    handleInputChange("timezone", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="America/New_York">
                    America/New_York (EST)
                  </option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={eventData.isPublic}
                  onChange={(e) =>
                    handleInputChange("isPublic", e.target.checked)
                  }
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label
                  htmlFor="isPublic"
                  className="text-sm font-medium text-gray-700"
                >
                  Make this event public (visible to everyone)
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="requireApproval"
                  checked={eventData.requireApproval}
                  onChange={(e) =>
                    handleInputChange("requireApproval", e.target.checked)
                  }
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label
                  htmlFor="requireApproval"
                  className="text-sm font-medium text-gray-700"
                >
                  Require approval for registrations
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="allowWaitlist"
                  checked={eventData.allowWaitlist}
                  onChange={(e) =>
                    handleInputChange("allowWaitlist", e.target.checked)
                  }
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label
                  htmlFor="allowWaitlist"
                  className="text-sm font-medium text-gray-700"
                >
                  Allow waitlist when event is full
                </label>
              </div>
            </div>

            {/* Event Summary */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-medium text-gray-900 mb-4">Event Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Title:</span>
                  <span className="ml-2 text-gray-600">
                    {eventData.title || "Not set"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Category:</span>
                  <span className="ml-2 text-gray-600">
                    {eventData.category || "Not set"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Date:</span>
                  <span className="ml-2 text-gray-600">
                    {eventData.date || "Not set"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Time:</span>
                  <span className="ml-2 text-gray-600">
                    {eventData.time || "Not set"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Location:</span>
                  <span className="ml-2 text-gray-600">
                    {eventData.isOnline
                      ? "Online Event"
                      : eventData.venue || "Not set"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Ticket Types:
                  </span>
                  <span className="ml-2 text-gray-600">
                    {eventData.ticketTypes.length}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Images:</span>
                  <span className="ml-2 text-gray-600">
                    {eventData.images.length}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Form Fields:
                  </span>
                  <span className="ml-2 text-gray-600">
                    {eventData.customFields.length}
                  </span>
                </div>
              </div>
            </div>

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-600">{errors.submit}</p>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <Breadcrumbs />

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Create New Event
                </h1>
                <p className="text-gray-600 mt-1">
                  Set up your event with all the details
                </p>
              </div>
              <button
                onClick={() => router.push("/management/dashboard")}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        currentStep >= step.id
                          ? "bg-purple-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        step.id
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-16 h-1 mx-2 ${
                          currentStep > step.id
                            ? "bg-purple-600"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {steps[currentStep - 1].title}
                </h2>
                <p className="text-gray-600">
                  {steps[currentStep - 1].description}
                </p>
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>

              {currentStep < steps.length ? (
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Creating Event...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Create Event</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;
