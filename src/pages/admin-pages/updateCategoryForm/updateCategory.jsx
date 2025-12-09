import { useState } from "react";
import { uploadImage } from "../../../utils/mediaUpload.js";
import axios from "axios";

export default function UpdateCategory() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [features, setFeatures] = useState(""); // comma-separated
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting:");

    if (!image) {
      console.warn("No image selected");
      return;
    }
    setIsLoading(true);

    const featuresArray = features.split(",").map((f) => f.trim()).filter((f) => f);
    console.log("Features Array:", featuresArray);

    try {
      // Upload image and get URL
      const result = await uploadImage(image, "categories");
      const imageUrl = result.url;

      // Prepare category data
      const categoryData = {
        name: name,
        price: price,
        features: featuresArray,
        description: description,
        image: imageUrl,
      };

      // Send to backend
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/category`,
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Reset form
      setName("");
      setPrice(0);
      setFeatures("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category. Please try again.");
    }finally {
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
            {
                isLoading?
                <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
                :
                <span>Update Category</span>

            }
          
        </button>
      </form>
    </div>
  );
}
