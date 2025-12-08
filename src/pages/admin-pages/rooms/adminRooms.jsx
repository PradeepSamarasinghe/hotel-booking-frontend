export default function AdminRooms() {
  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Rooms Management</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">All Rooms</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
            + Add Room
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-gray-600">Room No</th>
                <th className="px-4 py-3 text-left text-gray-600">Category</th>
                <th className="px-4 py-3 text-left text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-gray-600">Max Guests</th>
                <th className="px-4 py-3 text-left text-gray-600">Price</th>
                <th className="px-4 py-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">101</td>
                <td className="px-4 py-3">Deluxe</td>
                <td className="px-4 py-3">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Available</span>
                </td>
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3">$250/night</td>
                <td className="px-4 py-3">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                  <button className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">102</td>
                <td className="px-4 py-3">Standard</td>
                <td className="px-4 py-3">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">Occupied</span>
                </td>
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3">$150/night</td>
                <td className="px-4 py-3">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                  <button className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">201</td>
                <td className="px-4 py-3">Suite</td>
                <td className="px-4 py-3">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">Maintenance</span>
                </td>
                <td className="px-4 py-3">4</td>
                <td className="px-4 py-3">$400/night</td>
                <td className="px-4 py-3">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                  <button className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
