import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminBooking() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const token = localStorage.getItem("token");

  // if no token, redirect to login
  if (!token) {
    window.location.href = "/login";
  }

  // Fetch bookings from API
  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings(res.data.bookings || res.data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings");
    } finally {
      setIsLoading(false);
    }
  }

  // Update booking status
  async function updateBookingStatus(bookingId, newStatus, reason = "") {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/${bookingId}`,
        { status: newStatus, reason: reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(`Booking ${newStatus} successfully`);
      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Failed to update booking status");
    }
  }

  // Handle confirm booking
  function handleConfirm(bookingId) {
    updateBookingStatus(bookingId, "confirmed");
  }

  // Handle cancel booking
  function handleCancel(bookingId) {
    const reason = prompt("Enter cancellation reason (optional):");
    updateBookingStatus(bookingId, "cancelled", reason || "");
  }

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return statusStyles[status] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filter bookings based on status
  const filteredBookings =
    statusFilter === "all"
      ? bookings
      : bookings.filter((b) => b.status === statusFilter);

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Bookings Management</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">All Bookings</h2>
          <div className="flex gap-2">
            <select
              className="border rounded-lg px-3 py-2 text-gray-600"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              onClick={fetchBookings}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
            >
              Refresh
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="border-t-2 border-t-blue-500 w-8 h-8 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-600">Booking ID</th>
                  <th className="px-4 py-3 text-left text-gray-600">Room ID</th>
                  <th className="px-4 py-3 text-left text-gray-600">Email</th>
                  <th className="px-4 py-3 text-left text-gray-600">Check In</th>
                  <th className="px-4 py-3 text-left text-gray-600">Check Out</th>
                  <th className="px-4 py-3 text-left text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-gray-600">Notes</th>
                  <th className="px-4 py-3 text-left text-gray-600">Booked On</th>
                  <th className="px-4 py-3 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.bookingId} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{booking.bookingId}</td>
                      <td className="px-4 py-3">{booking.roomId}</td>
                      <td className="px-4 py-3">{booking.email}</td>
                      <td className="px-4 py-3">{formatDate(booking.checkInDate)}</td>
                      <td className="px-4 py-3">{formatDate(booking.checkOutDate)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-sm capitalize ${getStatusBadge(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="text-gray-600 text-sm truncate max-w-[150px] block"
                          title={booking.notes || booking.reason}
                        >
                          {booking.notes || booking.reason || "-"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {formatDateTime(booking.timeStamp)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {booking.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleConfirm(booking.bookingId)}
                                className="text-green-500 hover:text-green-700"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => handleCancel(booking.bookingId)}
                                className="text-red-500 hover:text-red-700"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {booking.status === "confirmed" && (
                            <button
                              onClick={() => handleCancel(booking.bookingId)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Cancel
                            </button>
                          )}
                          {booking.status === "cancelled" && (
                            <span className="text-gray-400 text-sm">No actions</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}