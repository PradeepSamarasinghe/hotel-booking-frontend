import axios from "axios"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import {Link, useNavigate} from "react-router-dom" 

export default function AdminCategories() {

  const token = localStorage.getItem("token")

  if (!token) {
    window.location.href = "/login"
  } 

  const [categories, setCategories] = useState([])
  const [categoryIsLoaded, setCategoryIsLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!categoryIsLoaded) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/category/`)
        .then((res) => {
          console.log("Categories Data:", res.data)
          setCategories(res.data)
          setCategoryIsLoaded(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [categoryIsLoaded])

  function handleDelete(name) {

    // console.log(name)
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/category/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setCategoryIsLoaded(false)
      toast("successfully deleted category", {type: 'success'})
    }).catch((err) => {
      // console.log(err)
      toast("error deleting category", {type: 'error'})
    })
  }

  function addCategory() {
    // console.log("Added")
    // window.location.href = "/admin/AddCategoryForm"
    navigate("/admin/addCategoryForm")
  }

  return (
    <div className="w-full p-6 bg-amber-300">
      <h1 className="text-3xl font-bold text-white mb-6">Categories Management</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">All Categories</h2>
          <button onClick={() => {
            addCategory()
          }} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
            + Add Category
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                
                <th className="px-4 py-3 text-left text-gray-600">Name</th>
                <th className="px-4 py-3 text-left text-gray-600">Price</th>
                <th className="px-4 py-3 text-left text-gray-600">Features</th>
                <th className="px-4 py-3 text-left text-gray-600">Description</th>
                <th className="px-4 py-3 text-left text-gray-600">Image</th>
                <th className="px-4 py-3 text-left text-gray-600">Actions</th>

              </tr>
            </thead>

            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id} className="border-b hover:bg-gray-50">
                  
                  <td className="px-4 py-3">{category.name}</td>
                  <td className="px-4 py-3">Rs. {category.price}</td>
                  <td className="px-4 py-3 flex">
                    <ul className="">
                    {category.features.map((feature, fIndex) => (
                      <li key={fIndex} className="list-disc ml-5">{feature}</li>
                    ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3">{category.description}</td>
                  <td className="px-4 py-3">
                    <img src={category.image} alt={category.name} className="w-20 h-20 object-cover rounded-md" />
                  </td>
            
                  <td className="px-4 py-3">
                    <Link className="text-blue-500 hover:text-blue-700 mr-2"
                    to={"/admin/updateCategory"}
                    state = {category}>
                    
                      Edit
                    </Link>
                    <button onClick={() => {handleDelete(category.name)}} 
                    className="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {categories.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}
