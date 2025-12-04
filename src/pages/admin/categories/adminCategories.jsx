export default function AdminCategories() {
  return (
    <div className="w-full p-6 bg-amber-300">
      <h1 className="text-3xl font-bold text-white mb-6">Categories Management</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">All Categories</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
            + Add Category
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-gray-600">ID</th>
                <th className="px-4 py-3 text-left text-gray-600">Name</th>
                <th className="px-4 py-3 text-left text-gray-600">Description</th>
                <th className="px-4 py-3 text-left text-gray-600">Price</th>
                <th className="px-4 py-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">Deluxe</td>
                <td className="px-4 py-3">Luxury room with ocean view</td>
                <td className="px-4 py-3">$250/night</td>
                <td className="px-4 py-3">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                  <button className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3">Standard</td>
                <td className="px-4 py-3">Comfortable room with city view</td>
                <td className="px-4 py-3">$150/night</td>
                <td className="px-4 py-3">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                  <button className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">3</td>
                <td className="px-4 py-3">Suite</td>
                <td className="px-4 py-3">Premium suite with living area</td>
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
