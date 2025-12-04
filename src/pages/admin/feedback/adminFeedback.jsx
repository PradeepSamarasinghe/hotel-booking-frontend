export default function AdminFeedback() {
  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Feedback Management</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Customer Feedback</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2 text-gray-600">
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>
        <div className="space-y-4">
          <div className="border rounded-lg p-4 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-800">John Doe</h3>
                <p className="text-sm text-gray-500">Room 101 - Deluxe</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-gray-600 text-sm">(5/5)</span>
              </div>
            </div>
            <p className="text-gray-600 mb-2">Excellent service and beautiful room! The staff was very friendly and helpful. Will definitely come back again.</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Dec 1, 2025</span>
              <div className="flex gap-2">
                <button className="text-blue-500 hover:text-blue-700">Reply</button>
                <button className="text-red-500 hover:text-red-700">Delete</button>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-800">Jane Smith</h3>
                <p className="text-sm text-gray-500">Room 201 - Suite</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★★★★</span>
                <span className="text-gray-300">★</span>
                <span className="text-gray-600 text-sm">(4/5)</span>
              </div>
            </div>
            <p className="text-gray-600 mb-2">Great experience overall. The room was clean and spacious. Only minor issue was the slow WiFi.</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Nov 28, 2025</span>
              <div className="flex gap-2">
                <button className="text-blue-500 hover:text-blue-700">Reply</button>
                <button className="text-red-500 hover:text-red-700">Delete</button>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-800">Bob Wilson</h3>
                <p className="text-sm text-gray-500">Room 102 - Standard</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★★★</span>
                <span className="text-gray-300">★★</span>
                <span className="text-gray-600 text-sm">(3/5)</span>
              </div>
            </div>
            <p className="text-gray-600 mb-2">Average stay. Room was okay but could use some updates. Breakfast was good though.</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Nov 25, 2025</span>
              <div className="flex gap-2">
                <button className="text-blue-500 hover:text-blue-700">Reply</button>
                <button className="text-red-500 hover:text-red-700">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
