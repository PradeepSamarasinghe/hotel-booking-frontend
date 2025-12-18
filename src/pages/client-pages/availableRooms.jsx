import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header/header.jsx";
import { Calendar, Users, MapPin, Wifi, Coffee, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function AvailableRooms() {
  const location = useLocation();
  const navigate = useNavigate();
  const { checkIn, checkOut, category, guests } = location.state || {};

  const [availableRooms, setAvailableRooms] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    // Redirect if no booking data
    if (!checkIn || !checkOut || !category) {
      toast.error("Please select check-in and check-out dates");
      navigate("/");
      return;
    }

    fetchAvailableRooms();
    fetchCategoryDetails();
  }, [checkIn, checkOut, category]);

  const fetchCategoryDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/category/${category}`
      );
      setCategoryDetails(res.data);
    } catch (err) {
      console.error("Error fetching category details:", err);
    }
  };

  const fetchAvailableRooms = async () => {
    setLoading(true);
    try {
      // Get all rooms in the selected category
      const roomsRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms/category/${category}`
      );

      // Get bookings that overlap with the selected dates
      const bookingsRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/by-date`,
        { checkInDate: checkIn, checkOutDate: checkOut }
      );

      const bookedRoomIds = bookingsRes.data
        .filter((booking) => booking.status !== "cancelled")
        .map((booking) => booking.roomId);

      // Filter out booked rooms
      const available = roomsRes.data.filter(
        (room) => !bookedRoomIds.includes(room.roomId) && room.available
      );

      setAvailableRooms(available);
    } catch (err) {
      console.error("Error fetching available rooms:", err);
      toast.error("Failed to load available rooms");
    } finally {
      setLoading(false);
    }
  };

  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotal = () => {
    if (!categoryDetails) return 0;
    return categoryDetails.price * calculateNights();
  };

  const handleBookRoom = async (room) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      toast.error("Please login to book a room");
      navigate("/login");
      return;
    }

    try {
      const bookingData = {
        roomId: room.roomId,
        checkInDate: checkIn,
        checkOutDate: checkOut,
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Room booked successfully!");
      navigate("/"); // Redirect to home or booking confirmation page
    } catch (err) {
      console.error("Booking error:", err);
      toast.error(err.response?.data?.message || "Failed to book room");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#C5A059] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Searching for available rooms...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Booking Summary Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h1 className="font-['Playfair_Display'] text-3xl font-bold text-gray-900 mb-4">
              Available Rooms
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#C5A059]" />
                <div>
                  <p className="text-xs text-gray-500">Check In</p>
                  <p className="font-semibold">{formatDate(checkIn)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#C5A059]" />
                <div>
                  <p className="text-xs text-gray-500">Check Out</p>
                  <p className="font-semibold">{formatDate(checkOut)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#C5A059]" />
                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="font-semibold capitalize">{category}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-[#C5A059]" />
                <div>
                  <p className="text-xs text-gray-500">Guests</p>
                  <p className="font-semibold">{guests} {guests === 1 ? 'Guest' : 'Guests'}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  {calculateNights()} {calculateNights() === 1 ? 'Night' : 'Nights'}
                </p>
                {categoryDetails && (
                  <p className="text-2xl font-bold text-[#C5A059]">
                    ${calculateTotal()}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Available Rooms List */}
          {availableRooms.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No Rooms Available
              </h2>
              <p className="text-gray-600 mb-6">
                Unfortunately, there are no available rooms for your selected dates.
                Please try different dates or another category.
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-[#C5A059] text-white px-8 py-3 rounded-md hover:bg-[#B39049] transition-colors"
              >
                Search Again
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {availableRooms.map((room) => (
                <div
                  key={room._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="md:flex">
                    {/* Room Image */}
                    <div className="md:w-1/3">
                      {room.photos && room.photos.length > 0 ? (
                        <img
                          src={room.photos[0]}
                          alt={`Room ${room.roomId}`}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-64 md:h-full bg-gray-200 flex items-center justify-center">
                          <MapPin className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Room Details */}
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-['Playfair_Display'] text-2xl font-bold text-gray-900 mb-2">
                            Room {room.roomId}
                          </h3>
                          <p className="text-gray-600 capitalize">
                            {room.category} Room
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Per Night</p>
                          <p className="text-3xl font-bold text-[#C5A059]">
                            ${categoryDetails?.price}
                          </p>
                        </div>
                      </div>

                      {/* Room Description */}
                      {room.specialDescription && (
                        <p className="text-gray-600 mb-4">{room.specialDescription}</p>
                      )}

                      {/* Room Features */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4 text-[#C5A059]" />
                          <span>Up to {room.maxGuests} guests</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Wifi className="w-4 h-4 text-[#C5A059]" />
                          <span>Free WiFi</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Coffee className="w-4 h-4 text-[#C5A059]" />
                          <span>Breakfast Included</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-[#C5A059]" />
                          <span>Free Cancellation</span>
                        </div>
                      </div>

                      {/* Category Features */}
                      {categoryDetails?.features && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {categoryDetails.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Book Button */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div>
                          <p className="text-sm text-gray-500">Total for {calculateNights()} nights</p>
                          <p className="text-2xl font-bold text-gray-900">
                            ${calculateTotal()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleBookRoom(room)}
                          className="bg-[#C5A059] text-white px-8 py-3 rounded-md hover:bg-[#B39049] transition-colors font-semibold"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}