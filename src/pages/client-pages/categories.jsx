import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/header.jsx";
export default function Categories() {

    const [categories, setCategories] = useState([])
    const [categoryIsLoaded, setCategoryIsLoaded] = useState(false);

    useEffect(
        () => {
            if(!categoryIsLoaded){
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/category/`).then((res) => {
                console.log("Categories Data:", res.data);
                setCategories(res.data.categories || res.data);
            }).catch((err) => {
                console.log(err);
            })
            }
        }, [categoryIsLoaded]
    )

    function deleteCategory(name) {
        const token = localStorage.getItem("token");
        
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/category/${name}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setCategoryIsLoaded(false);
        }).catch(error => {
            console.error("There was an error deleting the category!", error);
        });
    }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Room Categories</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Discover the perfect room for your stay. From cozy standard rooms to luxurious suites, 
            we have accommodations to suit every need and budget.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full font-bold">
                  ${category.price}<span className="text-sm font-normal">/night</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h2>
                <p className="text-gray-600 mb-4 flex-grow">{category.description}</p>

                {/* Features */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Book Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300">
                  Book Now
                </button>
                <button onClick={() => deleteCategory(category.name)} className="w-full bg-red-600 hover:bg-red-800 text-white font-semibold mt-1 py-3 rounded-lg transition-colors duration-300">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Our team is here to help you find the perfect room for your stay. 
            Contact us for personalized recommendations.
          </p>
          <button className="bg-white text-gray-800 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors duration-300">
            Contact Us
          </button>
        </div>
      </div>
    </div>
    </>
  );
}