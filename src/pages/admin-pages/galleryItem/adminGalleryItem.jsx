import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function AdminGalleryItem() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    window.location.href = "/login";
    return null;
  }

  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loaded) return;

    const fetchItems = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // backend may return array or wrapped object
        const data = Array.isArray(res.data) ? res.data : res.data.items ?? res.data;
        setItems(data || []);
        setLoaded(true);
      } catch (err) {
        console.error("Gallery fetch error:", err);
        setError(err?.response?.data ?? err.message);
      }
    };

    fetchItems();
  }, [loaded, token]);

  const handleDelete = async (id) => {
    const ok = confirm("Delete this gallery item?");
    if (!ok) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/${encodeURIComponent(id)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoaded(false); // refetch
      toast("Gallery item deleted", { type: "success" });
    } catch (err) {
      console.error("Delete error:", err);
      toast("Failed to delete gallery item", { type: "error" });
    }
  };

  const handleAdd = () => {
    navigate("/admin/addGalleryItem");
  };

  const handleEdit = (item) => {
    navigate("/admin/updateGalleryItem", { state: item });
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Gallery Management</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Gallery Items</h2>
          <button
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            + Upload Image
          </button>
        </div>

        {error && (
          <div className="mb-4 text-red-600">
            Failed to load gallery: {typeof error === "string" ? error : JSON.stringify(error)}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {!loaded && !error && (
            // keep layout consistent: show placeholders equal to examples count (6)
            <>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="relative group rounded-lg overflow-hidden shadow-md animate-pulse bg-gray-100 h-64" />
              ))}
            </>
          )}

          {loaded && items.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">No gallery items found</div>
          )}

          {loaded &&
            items.map((item) => (
              <div key={item._id ?? item.id} className="relative group rounded-lg overflow-hidden shadow-md">
                <img
                  src={item.image}
                  alt={item.title ?? item.name ?? "Gallery"}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id ?? item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
                <div className="p-2 bg-gray-50">
                  <p className="text-sm font-medium text-gray-700">{item.title ?? item.name ?? "Untitled"}</p>
                  <p className="text-xs text-gray-500">Category: {item.category ?? "Uncategorized"}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
