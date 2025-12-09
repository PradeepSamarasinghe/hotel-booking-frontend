import { useState } from "react";
import { uploadImage } from "../../../utils/mediaUpload.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddGalleryItemForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !description) {
      return alert("Please fill in both name and description");
    }

    if (!image) {
      return alert("Please select an image to upload");
    }

    setIsLoading(true);

    try {
      // Upload image
      const result = await uploadImage(image, "gallery");
      const imageUrl = result?.url ?? result?.secure_url ?? null;
      if (!imageUrl) {
        throw new Error("Image upload failed (no URL returned)");
      }

      const galleryData = {
        name,
        description,
        image: imageUrl,
      };
        // Send to backend
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallery`,
        { item: galleryData }, // wrap payload in `item`
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast("Gallery item added successfully", { type: "success" });
      navigate("/admin/galleryItem");

      // Reset form
      setName("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error adding gallery item:", error);
      //   const serverMessage = error?.response?.data ?? error?.message ?? "Unknown error";
      //   alert("Failed to add gallery item: " + (serverMessage.message ?? JSON.stringify(serverMessage)));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New Gallery Item</h2>
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
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border rounded w-[100px] text-sm"
            required
          />
          <span>{image ? image.name : ""}</span>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span>Add Gallery Item</span>
          )}
        </button>
      </form>
    </div>
  );
}
