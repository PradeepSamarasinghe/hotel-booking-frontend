import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadImage } from "../../../utils/mediaUpload.js";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdateRoomForm() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    // if no state, go back to list
    window.location.href = "/admin/rooms";
    return null;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
    return null;
  }

  // initial values from location.state
  const initial = location.state;
  const roomId = initial.roomId ?? initial._id ?? "";

  const [category, setCategory] = useState(initial.category || "");
  const [maxGuests, setMaxGuests] = useState(initial.maxGuests ?? 3);
  const [available, setAvailable] = useState(initial.available ?? true);
  const [specialDescription, setSpecialDescription] = useState(initial.specialDescription || "");
  const [notes, setNotes] = useState(initial.notes || "");

  // photos management
  const [existingPhotos, setExistingPhotos] = useState(Array.isArray(initial.photos) ? initial.photos : []);
  const [photosToRemove, setPhotosToRemove] = useState(new Set()); // indexes marked for removal
  const [newFiles, setNewFiles] = useState([]); // File[]
  const [newPreviews, setNewPreviews] = useState([]); // object URLs for preview

  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // overall percent for new uploads

  // keep previews in sync and revoke on change/unmount
  useEffect(() => {
    // revoke old previews
    return () => {
      newPreviews.forEach((p) => URL.revokeObjectURL(p));
    };
  }, [newPreviews]);

  function handleNewFiles(e) {
    const selected = Array.from(e.target.files || []).filter((f) => f.type.startsWith("image/"));
    if (selected.length === 0) return;

    // limit to 6 new files (optional)
    const combined = [...newFiles, ...selected].slice(0, 6);

    // create object URLs for previews and revoke old
    newPreviews.forEach((p) => URL.revokeObjectURL(p));
    const urls = combined.map((f) => URL.createObjectURL(f));
    setNewFiles(combined);
    setNewPreviews(urls);
  }

  function toggleRemoveExisting(idx) {
    const copy = new Set(photosToRemove);
    if (copy.has(idx)) copy.delete(idx);
    else copy.add(idx);
    setPhotosToRemove(copy);
  }

  function removeNewFile(idx) {
    const nextFiles = newFiles.filter((_, i) => i !== idx);
    const nextPreviews = newPreviews.filter((_, i) => i !== idx);
    // revoke the removed preview URL
    URL.revokeObjectURL(newPreviews[idx]);
    setNewFiles(nextFiles);
    setNewPreviews(nextPreviews);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    setUploadProgress(0);

    try {
      // 1) upload newFiles (if any) and collect URLs
      let uploadedUrls = [];
      if (newFiles.length > 0) {
        const perFileProgress = new Array(newFiles.length).fill(0);
        const uploadPromises = newFiles.map((file, idx) =>
          uploadImage(file, "rooms", (percent) => {
            perFileProgress[idx] = percent;
            const avg = Math.round(perFileProgress.reduce((a, b) => a + b, 0) / perFileProgress.length);
            setUploadProgress(avg);
          }).then((res) => res?.url ?? res?.secure_url ?? null)
        );

        uploadedUrls = (await Promise.all(uploadPromises)).filter(Boolean);

        if (uploadedUrls.length !== newFiles.length) {
          // some uploads failed (fallback: continue with those that succeeded)
          toast("Some photos failed to upload", { type: "warning" });
        }
      }

      // 2) compute final photos array: existing (except removed) + uploaded
      const retainedExisting = existingPhotos.filter((_, idx) => !photosToRemove.has(idx));
      const finalPhotos = [...retainedExisting, ...uploadedUrls];

      // 3) build payload to send (controller uses req.body as update)
      const payload = {
        roomId: roomId, // controller uses roomId param; keeping here for clarity
        category,
        maxGuests: Number(maxGuests) || 1,
        available: !!available,
        photos: finalPhotos,
        specialDescription,
        notes,
      };

      // 4) send to backend (PUT)
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms/${encodeURIComponent(roomId)}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Room updated successfully");
      navigate("/admin/rooms");
    } catch (err) {
      console.error("Update room error:", err);
      const server = err?.response?.data ?? err?.message ?? "Update failed";
      toast.error(String(server));
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Update Room</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Room No (cannot change)</label>
          <input type="text" value={roomId} className="w-full border rounded px-3 py-2 bg-gray-100" disabled />
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
          <label className="block mb-1 font-medium">Existing Photos</label>
          <div className="flex gap-3 flex-wrap">
            {existingPhotos.length === 0 && <div className="text-sm text-gray-500">No photos</div>}
            {existingPhotos.map((url, idx) => {
              const removed = photosToRemove.has(idx);
              return (
                <div key={idx} className="relative">
                  <img
                    src={url}
                    alt={`photo-${idx}`}
                    className={`w-28 h-20 object-cover rounded-md ${removed ? "opacity-40" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => toggleRemoveExisting(idx)}
                    className={`absolute -top-1 -right-1 w-6 h-6 rounded-full text-xs flex items-center justify-center ${
                      removed ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                    title={removed ? "Keep photo" : "Remove photo"}
                  >
                    {removed ? "✓" : "×"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Add New Photos (optional)</label>
          <input type="file" accept="image/*" multiple onChange={handleNewFiles} className="border rounded text-sm" />
          <div className="mt-2 flex gap-3 flex-wrap">
            {newPreviews.map((p, i) => (
              <div key={p} className="relative">
                <img src={p} alt={`new-${i}`} className="w-28 h-20 object-cover rounded-md" />
                <button
                  type="button"
                  onClick={() => removeNewFile(i)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="text-sm text-gray-700">Uploading photos: {uploadProgress}%</div>
        )}

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
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border rounded px-3 py-2" rows={2} />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            {isLoading ? "Updating..." : "Update Room"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/rooms")}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
