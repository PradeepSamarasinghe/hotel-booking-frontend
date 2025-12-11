import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function AdminRooms() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  }

  const [rooms, setRooms] = useState([]);
  const [roomIsLoaded, setRoomIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!roomIsLoaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/rooms/`)
        .then((res) => {
          console.log("Rooms Data:", res.data);
          setRooms(res.data || []);
          setRoomIsLoaded(true);
        })
        .catch((err) => {
          console.error("Failed to load rooms:", err);
          toast.error("Failed to load rooms");
        });
    }
  }, [roomIsLoaded]);

  function handleDelete(roomId) {
    if (!window.confirm("Delete this room? This action cannot be undone.")) return;

    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/rooms/${encodeURIComponent(roomId)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRoomIsLoaded(false); // refetch
        toast("Room deleted", { type: "success" });
      })
      .catch((err) => {
        console.error("Error deleting room:", err);
        toast("Error deleting room", { type: "error" });
      });
  }

  function addRoom() {
    navigate("/admin/addRoomForm");
  }

  return (
    <div className="w-full p-6 bg-amber-300">
      <h1 className="text-3xl font-bold text-white mb-6">Rooms Management</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">All Rooms</h2>
          <button
            onClick={() => addRoom()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
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
                <th className="px-4 py-3 text-left text-gray-600">Photos</th>
                <th className="px-4 py-3 text-left text-gray-600">Description</th>
                <th className="px-4 py-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => (
                <tr key={room._id ?? room.roomId} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{room.roomId}</td>
                  <td className="px-4 py-3">{room.category}</td>
                  <td className="px-4 py-3">
                    {room.available ? (
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                        Available
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
                        Unavailable
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">{room.maxGuests ?? "—"}</td>

                  <td className="px-4 py-3">
                    {Array.isArray(room.photos) && room.photos.length > 0 ? (
                      <img
                        src={room.photos[0]}
                        alt={room.roomId}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-500">
                        No photo
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-3">{room.specialDescription ?? room.notes ?? "—"}</td>

                  <td className="px-4 py-3">
                    <Link
                      to={"/admin/updateRoomForm"}
                      state={room}
                      className="text-blue-500 hover:text-blue-700 mr-3"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(room.roomId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {rooms.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No rooms found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
