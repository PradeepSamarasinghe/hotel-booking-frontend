import { useState } from "react";
import { uploadImage } from "../../../utils/mediaUpload.js";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddCategoryForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [features, setFeatures] = useState(""); // comma-separated
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  // if no token, redirect to login (optional: do this in useEffect)
  if (!token) {
    window.location.href = "/login";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // simple client-side validation
    if (!name || !description || price == null) {
      return alert("Please fill name, price and description");
    }

    if (!image) {
      return alert("Please choose an image for the category");
    }

    setIsLoading(true);

    // prepare features array
    const featuresArray = features
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    try {
      // upload image
      const result = await uploadImage(image, "categories");

      // support different upload return shapes
      const imageUrl = result?.url ?? result?.secure_url ?? null;
      if (!imageUrl) {
        throw new Error("Image upload failed (no URL returned)");
      }

      const categoryData = {
        name: name,
        price: price,
        features: featuresArray,
        description: description,
        image: imageUrl,
      };

      // send to backend (await and handle errors in catch)
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/category`,
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // success
      toast("Category added successfully", { type: "success" });
      // optionally reset form
      setName("");
      setPrice(0);
      setFeatures("");
      setDescription("");
      setImage(null);
    } catch (error) {
      // show detailed error: server response body if present, otherwise message
      console.error("Error adding category (detailed):", error);

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
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
            <span>Add Category</span>
          )}
        </button>
      </form>
    </div>
  );
}
