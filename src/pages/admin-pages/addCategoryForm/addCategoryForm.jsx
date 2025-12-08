import { useState } from "react";
import { uploadImage } from "../../../utils/mediaUpload.js";

export default function AddCategoryForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [features, setFeatures] = useState(""); // comma-separated
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

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

    try {
      // uploadImage(file, path, onProgress)
      const result = await uploadImage(image, "categories", (p) => {
        console.log("Upload progress:", p, "%");
      });

      // uploadImage resolves with { url }
      console.log("Download URL:", result.url);

      // continue: send category payload to backend using result.url
    } catch (err) {
      console.error("Upload failed:", err);
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
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </form>
    </div>
  );
}
