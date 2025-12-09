import { useState } from "react";
import { uploadImage } from "../../../utils/mediaUpload.js";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UpdateCategory() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    // redirect and stop rendering
    window.location.href = "/admin/categories";
    return null;
  }

  const [name, setName] = useState(location.state.name);
  const [price, setPrice] = useState(location.state.price);
  const [features, setFeatures] = useState(location.state.features.join(", ")); // comma-separated
  const [description, setDescription] = useState(location.state.description);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting:");

    // build features array
    const featuresArray = features
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);
    console.log("Features Array:", featuresArray);

    setIsLoading(true);

    try {
      // If no new image selected — just update using existing image URL
      if (!image) {
        const categoryData = {
          price: price,
          features: featuresArray,
          description: description,
          image: location.state.image, // keep existing image
        };

        await axios.put(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/category/${encodeURIComponent(name)}`,
          categoryData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        toast("Category updated successfully", { type: "success" });
        navigate("/admin/categories");
        return;
      } else {
        // Upload image and get URL
        const result = await uploadImage(image, "categories");
        const imageUrl = result?.url ?? result?.secure_url ?? null;
        if (!imageUrl) {
          throw new Error("Image upload failed (no URL returned)");
        }

        // Prepare category data with new image
        const categoryData = {
          price: price,
          features: featuresArray,
          description: description,
          image: imageUrl,
        };

        // Send to backend
        await axios.put(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/category/${encodeURIComponent(name)}`,
          categoryData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        toast("Category updated successfully", { type: "success" });
        navigate("/admin/categories");
      }

      // Optionally reset form fields (I keep them as-is so admin can see new state)
      // setName("");
      // setPrice(0);
      // setFeatures("");
      // setDescription("");
      // setImage(null);
    } catch (error) {
      console.error("Error updating category:", error);
      toast("Failed to update category", { type: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Update Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
            disabled //name cannot be changed
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Features (comma-separated)
          </label>
          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="w-full border rounded px-3 py-2"
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
            /* not required so admin can keep existing image */
          />
          <span>{image ? image.name : ""}</span>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded flex justify-center items-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span>Update Category</span>
          )}
        </button>
      </form>
    </div>
  );
}
