import { useState, useEffect } from "react";
import { uploadImage } from "../../../utils/mediaUpload.js"; // adjust path if needed
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddRoomForm() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // redirect if not logged in
  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
  }, [token]);

  const [roomId, setRoomId] = useState("");
  const [category, setCategory] = useState("");
  const [maxGuests, setMaxGuests] = useState(3);
  const [available, setAvailable] = useState(true);
  const [specialDescription, setSpecialDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState([]); // File[]
  const [previews, setPreviews] = useState([]); // object URL previews
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // overall percent

  // cleanup previews when files change/unmount
  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p));
    };
  }, [previews]);

  function handleFilesChange(e) {
    const selected = Array.from(e.target.files || []);
    if (selected.length === 0) return;

    // simple validation: only images and max 6 files
    const filtered = selected.filter((f) => f.type.startsWith("image/"));
    if (filtered.length !== selected.length) {
      toast.error("Some files were ignored because they are not images");
    }

    const maxFiles = 6;
    const total = [...files, ...filtered].slice(0, maxFiles);
    setFiles(total);

    // create previews
    const urls = total.map((f) => URL.createObjectURL(f));
    // revoke old previews
    previews.forEach((p) => URL.revokeObjectURL(p));
    setPreviews(urls);
  }

  function removeFileAt(index) {
    const nextFiles = files.filter((_, i) => i !== index);
    const nextPreviews = previews.filter((_, i) => i !== index);
    // revoke the removed preview URL
    // (we already removed it from state, revoke explicitly)
    // can't revoke after state change easily; revoke the removed one now:
    // (safer approach: when setting new previews we revoked old ones above)
    setFiles(nextFiles);
    setPreviews(nextPreviews);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!roomId.trim() || !category.trim()) {
      return toast.error("Please provide room number and category");
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      // 1) upload photos (if any)
      let photoUrls = [];
      if (files.length > 0) {
        // upload each file and track overall progress
        const perFileProgress = new Array(files.length).fill(0);

        const uploadPromises = files.map((file, idx) =>
          uploadImage(file, "rooms", (percent) => {
            perFileProgress[idx] = percent;
            // compute overall percent as average
            const total = Math.round(
              perFileProgress.reduce((a, b) => a + b, 0) /
                perFileProgress.length
            );
            setUploadProgress(total);
          }).then((res) => res?.url ?? res?.secure_url ?? null)
        );

        photoUrls = (await Promise.all(uploadPromises)).filter(Boolean);

        if (photoUrls.length === 0 && files.length > 0) {
          throw new Error("Photo upload failed");
        }
      }

      // 2) prepare payload
      const payload = {
        roomId: roomId.trim(),
        category: category.trim(),
        maxGuests: Number(maxGuests) || 1,
        available: !!available,
        photos: photoUrls, // can be empty array
        specialDescription: specialDescription.trim(),
        notes: notes.trim(),
      };

      // 3) send to backend
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Room added successfully");
      // reset form
      setRoomId("");
      setCategory("");
      setMaxGuests(3);
      setAvailable(true);
      setSpecialDescription("");
      setNotes("");
      setFiles([]);
      previews.forEach((p) => URL.revokeObjectURL(p));
      setPreviews([]);
      setUploadProgress(0);

      // navigate back to list or keep on form
      navigate("/admin/rooms");
    } catch (err) {
      console.error("Add room failed:", err);
      const serverMsg =
        err?.response?.data?.message ?? err?.message ?? "Failed to add room";
      toast.error(String(serverMsg));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New Room</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Room No (unique)</label>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select a category</option>
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Max Guests</label>
            <input
              type="number"
              min={1}
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Available</label>
            <div className="flex items-center gap-2">
              <input
                id="available-checkbox"
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                className="h-4 w-4"
              />
              <label htmlFor="available-checkbox" className="text-sm">
                Is available for booking
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Photos (max 6)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesChange}
            className="border rounded text-sm"
          />
          <div className="mt-2 flex gap-3 flex-wrap">
            {previews.map((p, i) => (
              <div key={p} className="relative">
                <img
                  src={p}
                  alt={`preview-${i}`}
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeFileAt(i)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Special Description</label>
          <textarea
            value={specialDescription}
            onChange={(e) => setSpecialDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={2}
          />
        </div>

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="text-sm text-gray-700">
            Uploading photos: {uploadProgress}%
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin" />
          ) : (
            <span>Add Room</span>
          )}
        </button>
      </form>
    </div>
  );
}
