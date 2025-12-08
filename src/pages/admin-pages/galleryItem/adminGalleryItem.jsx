export default function AdminGalleryItem() {
  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Gallery Management</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Gallery Items</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
            + Upload Image
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="relative group rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" 
              alt="Hotel Exterior" 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Edit</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
            </div>
            <div className="p-2 bg-gray-50">
              <p className="text-sm font-medium text-gray-700">Hotel Exterior</p>
              <p className="text-xs text-gray-500">Category: Exterior</p>
            </div>
          </div>

          <div className="relative group rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400" 
              alt="Deluxe Room" 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Edit</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
            </div>
            <div className="p-2 bg-gray-50">
              <p className="text-sm font-medium text-gray-700">Deluxe Room</p>
              <p className="text-xs text-gray-500">Category: Rooms</p>
            </div>
          </div>

          <div className="relative group rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400" 
              alt="Suite Bedroom" 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Edit</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
            </div>
            <div className="p-2 bg-gray-50">
              <p className="text-sm font-medium text-gray-700">Suite Bedroom</p>
              <p className="text-xs text-gray-500">Category: Rooms</p>
            </div>
          </div>

          <div className="relative group rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400" 
              alt="Swimming Pool" 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Edit</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
            </div>
            <div className="p-2 bg-gray-50">
              <p className="text-sm font-medium text-gray-700">Swimming Pool</p>
              <p className="text-xs text-gray-500">Category: Amenities</p>
            </div>
          </div>

          <div className="relative group rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400" 
              alt="Restaurant" 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Edit</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
            </div>
            <div className="p-2 bg-gray-50">
              <p className="text-sm font-medium text-gray-700">Restaurant</p>
              <p className="text-xs text-gray-500">Category: Dining</p>
            </div>
          </div>

          <div className="relative group rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400" 
              alt="Spa" 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Edit</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
            </div>
            <div className="p-2 bg-gray-50">
              <p className="text-sm font-medium text-gray-700">Spa & Wellness</p>
              <p className="text-xs text-gray-500">Category: Amenities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
