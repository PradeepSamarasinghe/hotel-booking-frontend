export default function AdminBooking() {
  // Sample booking data based on the Mongoose model
  const bookings = [
    {
      bookingId: "BK001",
      roomId: "101",
      email: "john.doe@example.com",
      status: "confirmed",
      reason: "",
      checkInDate: "2025-12-05",
      checkOutDate: "2025-12-08",
      notes: "Early check-in requested",
      timeStamp: "2025-11-28T10:30:00"
    },
    {
      bookingId: "BK002",
      roomId: "205",
      email: "jane.smith@example.com",
      status: "pending",
      reason: "",
      checkInDate: "2025-12-10",
      checkOutDate: "2025-12-12",
      notes: "",
      timeStamp: "2025-11-29T14:15:00"
    },
    {
      bookingId: "BK003",
      roomId: "302",
      email: "bob.wilson@example.com",
      status: "cancelled",
      reason: "Change of plans",
      checkInDate: "2025-12-01",
      checkOutDate: "2025-12-03",
      notes: "Refund processed",
      timeStamp: "2025-11-25T09:00:00"
    },
    {
      bookingId: "BK004",
      roomId: "108",
      email: "alice.johnson@example.com",
      status: "confirmed",
      reason: "",
      checkInDate: "2025-12-15",
      checkOutDate: "2025-12-20",
      notes: "Anniversary celebration - special decoration requested",
      timeStamp: "2025-11-30T16:45:00"
    },
    {
      bookingId: "BK005",
      roomId: "401",
      email: "charlie.brown@example.com",
      status: "pending",
      reason: "",
      checkInDate: "2025-12-22",
      checkOutDate: "2025-12-26",
      notes: "Christmas stay",
      timeStamp: "2025-12-01T08:20:00"
    }
  ];

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    };
    return statusStyles[status] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Bookings Management</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">All Bookings</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2 text-gray-600">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
              + Add Booking
            </button>
          </div>
        </div>
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
              {bookings.map((booking) => (
                <tr key={booking.bookingId} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{booking.bookingId}</td>
                  <td className="px-4 py-3">{booking.roomId}</td>
                  <td className="px-4 py-3">{booking.email}</td>
                  <td className="px-4 py-3">{formatDate(booking.checkInDate)}</td>
                  <td className="px-4 py-3">{formatDate(booking.checkOutDate)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-sm capitalize ${getStatusBadge(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-gray-600 text-sm truncate max-w-[150px] block" title={booking.notes || booking.reason}>
                      {booking.notes || booking.reason || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDateTime(booking.timeStamp)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-blue-500 hover:text-blue-700">Edit</button>
                      <button className="text-green-500 hover:text-green-700">Confirm</button>
                      <button className="text-red-500 hover:text-red-700">Cancel</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}