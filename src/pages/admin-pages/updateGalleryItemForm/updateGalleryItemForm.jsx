import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { uploadImage } from "../../../utils/mediaUpload.js";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdateGalleryItemForm() {
  const location = useLocation();
  const navigate = useNavigate();

  // require location.state (redirect if missing)
  if (!location.state) {
    navigate("/admin/galleryItem");
    return null;
  }

  const id = location.state._id || location.state.id;
  const initialImageUrl = location.state.image || "";

  const [name, setName] = useState(location.state.name || "");
  const [description, setDescription] = useState(location.state.description || "");
  const [newImageFile, setNewImageFile] = useState(null); // optional new file
  const [previewUrl, setPreviewUrl] = useState(initialImageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // update preview when user selects a new file or when initial image changes
  useEffect(() => {
    if (newImageFile) {
      const obj = URL.createObjectURL(newImageFile);
      setPreviewUrl(obj);
      return () => URL.revokeObjectURL(obj);
    }
    setPreviewUrl(initialImageUrl);
  }, [newImageFile, initialImageUrl]);

  function handleFileChange(e) {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setNewImageFile(null);
      return;
    }

    // validation
    const maxBytes = 5 * 1024 * 1024; // 5 MB
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      e.target.value = "";
      return;
    }
    if (file.size > maxBytes) {
      toast.error("File too large. Max 5 MB.");
      e.target.value = "";
      return;
    }

    setNewImageFile(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      toast.error("Please fill name and description");
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      let imageUrl = initialImageUrl;

      // upload new image if selected
      if (newImageFile) {
        const result = await uploadImage(newImageFile, "gallery", (percent) =>
          setUploadProgress(percent)
        );
        imageUrl = result?.url ?? result?.secure_url ?? null;
        if (!imageUrl) throw new Error("Image upload failed (no URL returned)");
      }

      const galleryData = {
        name: name.trim(),
        description: description.trim(),
        image: imageUrl,
      };

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallery/${id}`,
        { item: galleryData }, // backend expects { item: { ... } }
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Gallery item updated successfully");
      navigate("/admin/galleryItem");
    } catch (err) {
      console.error("Error updating gallery item:", err);
      const server = err?.response?.data ?? err?.message ?? "Unknown error";
      toast.error(String(server));
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Update Gallery Item</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Image (optional)</label>

          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border rounded w-[100px] text-sm"
            />

            <div className="flex flex-col">
              <span className="text-sm text-gray-700 truncate max-w-[220px]">
                {newImageFile
                  ? newImageFile.name
                  : initialImageUrl
                  ? initialImageUrl.split("/").pop()
                  : "No image"}
              </span>

              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="preview"
                  className="mt-2 max-h-28 object-contain rounded"
                />
              ) : null}
            </div>
          </div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-2 text-sm">Uploading {uploadProgress}%</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded flex justify-center items-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin" />
          ) : (
            <span>Update Gallery Item</span>
          )}
        </button>
      </form>
    </div>
  );
}
