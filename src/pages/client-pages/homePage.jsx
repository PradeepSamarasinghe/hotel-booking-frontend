import Header from "../../components/header/header.jsx";
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Calendar,
  Users,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Hero Section with Booking Widget
function HeroSection() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomType, setRoomType] = useState("deluxe");
  const [guests, setGuests] = useState(2);

  const handleCheckAvailability = () => {
    // Validation
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      toast.error("Check-in date cannot be in the past");
      return;
    }

    if (checkOutDate <= checkInDate) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    // Navigate to available rooms page with data
    navigate("/available-rooms", {
      state: {
        checkIn,
        checkOut,
        category: roomType,
        guests: parseInt(guests),
      },
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4">
        <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl lg:text-7xl text-white text-center mb-4 font-bold">
          Uncompromising Excellence
        </h1>
        <p className="text-white/90 text-lg md:text-xl text-center mb-12">
          Where Luxury Meets Tranquility
        </p>

        {/* Booking Widget */}
        <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 w-full max-w-4xl">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#C5A059] rounded-full" />
            <span className="text-[#C5A059] text-sm font-semibold tracking-wider">
              BEST RATE GUARANTEED
            </span>
            <div className="w-2 h-2 bg-[#C5A059] rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check In
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check Out
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Type
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              >
                <option value="deluxe">Deluxe</option>
                <option value="standard">Standard</option>
                <option value="suite">Suite</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Guests
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckAvailability}
            className="w-full mt-6 bg-[#C5A059] text-white py-4 rounded-md hover:bg-[#B39049] transition-colors duration-300 font-semibold text-lg tracking-wide"
          >
            Check Availability
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Introduction Section
function IntroSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Experience Aurelia Grand
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Nestled in the heart of luxury, Aurelia Grand celebrates
              meticulous service through extraordinary experiences. Our
              commitment to excellence ensures every moment of your stay is
              crafted with precision and care.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              From our elegantly appointed rooms to our world-class dining
              venues, every detail has been thoughtfully designed to provide you
              with an unforgettable escape into refined comfort and timeless
              elegance.
            </p>
            <button className="px-8 py-3 bg-[#C5A059] text-white rounded-md hover:bg-[#B39049] transition-colors duration-300 font-semibold">
              Discover More
            </button>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"
              alt="Luxury Hotel Exterior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

