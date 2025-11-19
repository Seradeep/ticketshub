import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  ArrowLeft,
  Plus,
  Minus,
  Calendar,
  MapPin,
  Clock,
  User,
  Mail,
  Phone,
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { getEventById } from "../data/mockDatabase";
import { useAuth } from "../contexts/AuthContext";

// Razorpay configuration - Replace with your actual keys
const RAZORPAY_CONFIG = {
  key: "rzp_test_3TGjwTpqzzzyiz", // Replace with your Razorpay Key ID
  secret: "DjZvJczdajxaQQAQF3so54Xx", // Replace with your Razorpay Secret Key
  currency: "INR",
  name: "TICKETSHUB",
  description: "Event Ticket Booking",
  image: "/ticketshub_logo.png",
  theme: {
    color: "#9333ea",
  },
};

// Declare Razorpay interface for TypeScript
declare global {
  interface Window {
    Razorpay: any;
  }
}

const BookingPageComponent = () => {
  // require react-router hooks at runtime (client-only) to avoid SSR import issues
  const { useParams, useNavigate } = require("react-router-dom") as any;
  const { eventId } = useParams() as { eventId?: string };
  const navigate = useNavigate();
  const { user, isAuthenticated, addTicket } = useAuth();

  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Confirmation
  const [quantity, setQuantity] = useState(1);
  const [userDetails, setUserDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [processing, setProcessing] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const event = getEventById(parseInt(eventId || "0"));

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAuthenticated) {
      navigate("/");
    }

    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => console.error("Failed to load Razorpay script");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [isAuthenticated, navigate]);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Event Not Found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const basePrice = parseInt(event.price.replace("₹", "").replace(",", ""));
  const totalAmount = basePrice * quantity;
  const convenienceFee = Math.round(totalAmount * 0.02); // 2% convenience fee
  const gst = Math.round((totalAmount + convenienceFee) * 0.18); // 18% GST
  const finalAmount = totalAmount + convenienceFee + gst;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleUserDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProceedToPayment = () => {
    if (userDetails.name && userDetails.email && userDetails.phone) {
      setStep(2);
    }
  };

  const handleRazorpayPayment = () => {
    if (!razorpayLoaded) {
      alert("Payment gateway is loading. Please try again in a moment.");
      return;
    }

    setProcessing(true);

    const options = {
      key: RAZORPAY_CONFIG.key,
      amount: finalAmount * 100, // Amount in paise
      currency: RAZORPAY_CONFIG.currency,
      name: RAZORPAY_CONFIG.name,
      description: `${event.title} - ${quantity} Ticket${
        quantity > 1 ? "s" : ""
      }`,
      image: RAZORPAY_CONFIG.image,
      order_id: "", // You would get this from your backend
      handler: function (response: any) {
        // Payment successful
        console.log("Payment successful:", response);
        handlePaymentSuccess(response);
      },
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.phone,
      },
      notes: {
        event_id: event.id,
        event_title: event.title,
        quantity: quantity,
        user_id: user?.id,
      },
      theme: RAZORPAY_CONFIG.theme,
      modal: {
        ondismiss: function () {
          setProcessing(false);
          console.log("Payment cancelled by user");
        },
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error opening Razorpay:", error);
      setProcessing(false);
      alert("Payment gateway error. Please try again.");
    }
  };

  const handlePaymentSuccess = (paymentResponse: any) => {
    const newBookingId = `TH${Date.now()}`;
    setBookingId(newBookingId);

    // Add ticket to user's profile
    addTicket({
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      venue: event.venue,
      location: event.location,
      quantity,
      totalAmount: finalAmount,
      status: "confirmed",
      seatNumbers: generateSeatNumbers(quantity),
    });

    setProcessing(false);
    setStep(3);
  };

  const generateSeatNumbers = (qty: number): string[] => {
    const seats = [];
    const startSeat = Math.floor(Math.random() * 50) + 1;
    for (let i = 0; i < qty; i++) {
      seats.push(`A${startSeat + i}`);
    }
    return seats;
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {[
        { number: 1, label: "Details" },
        { number: 2, label: "Payment" },
        { number: 3, label: "Confirmation" },
      ].map((stepItem, index) => (
        <div key={stepItem.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                step >= stepItem.number
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step > stepItem.number ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                stepItem.number
              )}
            </div>
            <span
              className={`text-sm mt-2 font-medium ${
                step >= stepItem.number ? "text-purple-600" : "text-gray-500"
              }`}
            >
              {stepItem.label}
            </span>
          </div>
          {index < 2 && (
            <div
              className={`w-20 h-1 mx-4 transition-all duration-300 ${
                step > stepItem.number ? "bg-purple-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() =>
              step === 1 ? navigate(`/event/${event.id}`) : setStep(step - 1)
            }
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Book Tickets</h1>
        </div>

        <StepIndicator />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="space-y-6">
                {/* Event Summary */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Event Details
                  </h2>
                  <div className="flex space-x-4">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={96}
                      height={96}
                      className="w-24 h-24 rounded-xl object-cover"
                      loading="lazy"
                      unoptimized
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {event.title}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {event.venue}, {event.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ticket Selection */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Select Tickets
                  </h2>
                  <div className="border border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          General Admission
                        </h3>
                        <p className="text-gray-600">
                          ₹{basePrice.toLocaleString()} per ticket
                        </p>
                        <p className="text-sm text-green-600 mt-1">
                          ✓ Instant confirmation
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleQuantityChange(-1)}
                          disabled={quantity <= 1}
                          className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:border-purple-400"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-bold text-xl">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(1)}
                          disabled={quantity >= 10}
                          className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:border-purple-400"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    Maximum 10 tickets per booking
                  </p>
                </div>

                {/* User Details */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Contact Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={userDetails.name}
                        onChange={handleUserDetailsChange}
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
                        value={userDetails.phone}
                        onChange={handleUserDetailsChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                    <div className="relative md:col-span-2">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={userDetails.email}
                        onChange={handleUserDetailsChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    Tickets will be sent to this email address
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {/* Payment Method */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 hover:border-purple-300">
                      <input
                        type="radio"
                        name="payment"
                        value="razorpay"
                        checked={paymentMethod === "razorpay"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-4 w-4 h-4 text-purple-600"
                      />
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-3 rounded-xl">
                          <CreditCard className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Razorpay
                          </div>
                          <div className="text-sm text-gray-600">
                            Credit/Debit Card, UPI, Net Banking, Wallets
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-green-900 mb-2">
                        Secure Payment
                      </h3>
                      <p className="text-green-700 text-sm">
                        Your payment information is encrypted and secure. We use
                        industry-standard security measures to protect your
                        data.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Summary in Payment Step */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Order Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{event.title}</span>
                      <span className="font-medium">
                        ₹{basePrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity</span>
                      <span className="font-medium">{quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        ₹{totalAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Convenience Fee</span>
                      <span className="font-medium">
                        ₹{convenienceFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">GST (18%)</span>
                      <span className="font-medium">
                        ₹{gst.toLocaleString()}
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-900 text-lg">
                          Total Amount
                        </span>
                        <span className="font-bold text-purple-600 text-xl">
                          ₹{finalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Booking Confirmed!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Your tickets have been booked successfully. You will receive
                    a confirmation email shortly.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <p className="text-sm text-gray-600 mb-1">Booking ID</p>
                    <p className="font-mono text-lg font-bold text-purple-600">
                      {bookingId}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => navigate("/profile")}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                    >
                      View My Tickets
                    </button>
                    <button
                      onClick={() => navigate("/")}
                      className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Booking Summary
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tickets ({quantity}x)</span>
                    <span className="font-medium">
                      ₹{totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Convenience Fee</span>
                    <span className="font-medium">
                      ₹{convenienceFee.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="font-medium">₹{gst.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-900">
                        Total Amount
                      </span>
                      <span className="font-bold text-purple-600 text-xl">
                        ₹{finalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {step === 1 && (
                  <button
                    onClick={handleProceedToPayment}
                    disabled={
                      !userDetails.name ||
                      !userDetails.email ||
                      !userDetails.phone
                    }
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Proceed to Payment
                  </button>
                )}

                {step === 2 && (
                  <button
                    onClick={handleRazorpayPayment}
                    disabled={processing || !razorpayLoaded}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>Pay ₹{finalAmount.toLocaleString()}</span>
                    )}
                  </button>
                )}

                {processing && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      <span className="text-blue-700 text-sm">
                        Processing your payment...
                      </span>
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-500 text-center mt-4">
                  By proceeding, you agree to our Terms & Conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(BookingPageComponent), {
  ssr: false,
});
