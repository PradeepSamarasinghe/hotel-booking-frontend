import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/header.jsx";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [categoryIsLoaded, setCategoryIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    if (!categoryIsLoaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/category/`)
        .then((res) => {
          console.log("Categories Data:", res.data);
          setCategories(res.data.categories || res.data);
          setCategoryIsLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [categoryIsLoaded]);

  function deleteCategory(name) {
    const token = localStorage.getItem("token");

    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/category/${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCategoryIsLoaded(false);
      })
      .catch((error) => {
        console.error("There was an error deleting the category!", error);
      });
  }

  // Separate categories into rooms and suites
  const rooms = categories.filter(cat => 
    cat.name.toLowerCase().includes('room') || 
    cat.name.toLowerCase().includes('deluxe') ||
    cat.name.toLowerCase().includes('superior') ||
    cat.name.toLowerCase().includes('standard')
  );
  
  const suites = categories.filter(cat => 
    cat.name.toLowerCase().includes('suite') || 
    cat.name.toLowerCase().includes('presidential')
  );

  const CategoryCard = ({ category, index }) => (
    <div
      className="relative group cursor-pointer overflow-hidden"
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {/* Image Container */}
      <div className="relative h-[450px] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Price Badge */}
        <div className="absolute top-6 right-6 bg-[#C5A059] text-white px-5 py-2 rounded-sm">
          <span className="text-2xl font-bold">${category.price}</span>
          <span className="text-sm ml-1">/ night</span>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h3 className="font-['Playfair_Display'] text-3xl font-bold mb-3">
            {category.name}
          </h3>
          <p className="text-white/90 text-sm leading-relaxed mb-4 line-clamp-2">
            {category.description}
          </p>

          {/* Features Pills */}
          {category.features && category.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {category.features.slice(0, 3).map((feature, idx) => (
                <span
                  key={idx}
                  className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/30"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}

          {/* Hover Action Buttons */}
          <div
            className={`transform transition-all duration-300 ${
              hoveredCard === index
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
          >
            <div className="flex gap-3">
              <button className="flex-1 bg-[#C5A059] text-white py-3 px-6 rounded-sm hover:bg-[#B39049] transition-colors duration-300 font-semibold tracking-wide">
                Find Out More
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Are you sure you want to delete ${category.name}?`)) {
                    deleteCategory(category.name);
                  }
                }}
                className="bg-red-600 text-white py-3 px-6 rounded-sm hover:bg-red-700 transition-colors duration-300 font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f8f8f8]">
        {/* Hero Section */}
        <section className="relative h-[60vh] bg-cover bg-center" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1600')"
        }}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
            <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold mb-4 text-center">
              Accommodation
            </h1>
            <div className="w-20 h-1 bg-[#C5A059] mb-6" />
            <p className="text-lg md:text-xl text-center max-w-3xl leading-relaxed">
              Aurelia Grand features beautifully appointed rooms & suites providing a sleep sanctuary with stunning views. 
              Spacious and bathed in natural light, designed with supreme comfort and style in mind.
            </p>
          </div>
        </section>

        {/* Intro Section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Aurelia Grand features beautiful rooms & suites providing a sleep sanctuary. 
              Spacious and bathed in natural light, the rooms are designed with supreme comfort and style in mind, 
              setting new standards in luxury living.
            </p>
            <div className="inline-block bg-[#C5A059] text-white px-8 py-4 rounded-sm">
              <p className="text-sm font-semibold tracking-wider mb-1">RATES STARTING FROM JUST</p>
              <p className="text-3xl font-bold">USD 85++</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-8 text-center shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#C5A059]/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <p className="text-4xl font-bold text-gray-800 mb-2">{rooms.length}</p>
              <p className="text-gray-600 uppercase tracking-wider text-sm">Rooms</p>
            </div>

            <div className="bg-white p-8 text-center shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#C5A059]/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="text-4xl font-bold text-gray-800 mb-2">{suites.length}</p>
              <p className="text-gray-600 uppercase tracking-wider text-sm">Suites</p>
            </div>

            <div className="bg-white p-8 text-center shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#C5A059]/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-sm text-gray-600 uppercase tracking-wider">
                <p className="mb-1">Check-in: <span className="font-bold text-gray-800">2:00 PM</span></p>
                <p>Check-out: <span className="font-bold text-gray-800">12:00 PM</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* Rooms Section */}
        {rooms.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Rooms
              </h2>
              <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                Let your cares slip away and enjoy a blissful night of sleep.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rooms.map((category, index) => (
                <CategoryCard key={index} category={category} index={`room-${index}`} />
              ))}
            </div>
          </section>
        )}

        {/* Suites Section */}
        {suites.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Suites
              </h2>
              <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                Stylish comfort with unparalleled views, complemented by plush décor.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suites.map((category, index) => (
                <CategoryCard key={index} category={category} index={`suite-${index}`} />
              ))}
            </div>
          </section>
        )}

        {/* All Categories (if no clear room/suite distinction) */}
        {rooms.length === 0 && suites.length === 0 && categories.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category, index) => (
                <CategoryCard key={index} category={category} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {categories.length === 0 && (
          <section className="max-w-7xl mx-auto px-4 py-20 text-center">
            <div className="text-gray-400">
              <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p className="text-xl font-['Playfair_Display']">No categories available at the moment</p>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-gray-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-4">
              Need Help Choosing?
            </h2>
            <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-6" />
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Our dedicated team is here to help you find the perfect accommodation for your stay. 
              Contact us for personalized recommendations and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#C5A059] hover:bg-[#B39049] text-white px-8 py-3 rounded-sm font-semibold tracking-wide transition-colors duration-300">
                Contact Us
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-sm font-semibold tracking-wide transition-all duration-300">
                Book Now
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}