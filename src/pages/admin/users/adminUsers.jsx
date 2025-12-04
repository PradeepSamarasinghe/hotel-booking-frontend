export default function AdminUsers() {
  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Users Management</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">All Users</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
            + Add User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-gray-600">ID</th>
                <th className="px-4 py-3 text-left text-gray-600">Name</th>
                <th className="px-4 py-3 text-left text-gray-600">Email</th>
                <th className="px-4 py-3 text-left text-gray-600">Phone</th>
                <th className="px-4 py-3 text-left text-gray-600">Role</th>
                <th className="px-4 py-3 text-left text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">John Doe</td>
                <td className="px-4 py-3">john@example.com</td>
                <td className="px-4 py-3">+1 234 567 890</td>
                <td className="px-4 py-3">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">Admin</span>
                </td>
                <td className="px-4 py-3">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Active</span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                  <button className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3">Jane Smith</td>
                <td className="px-4 py-3">jane@example.com</td>
                <td className="px-4 py-3">+1 234 567 891</td>
                <td className="px-4 py-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">Customer</span>
                </td>
                <td className="px-4 py-3">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Active</span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                  <button className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">3</td>
                <td className="px-4 py-3">Bob Wilson</td>
                <td className="px-4 py-3">bob@example.com</td>
                <td className="px-4 py-3">+1 234 567 892</td>
                <td className="px-4 py-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">Customer</span>
                </td>
                <td className="px-4 py-3">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">Inactive</span>
                </td>
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
