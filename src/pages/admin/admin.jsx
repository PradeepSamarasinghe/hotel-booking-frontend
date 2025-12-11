import { Link, useLocation } from "react-router-dom";
import {
  CiBookmarkCheck,
  CiViewList,
  CiBoxes,
  CiUser,
  CiChat1,
  CiImageOn,
  CiLogout,
  CiHome,
} from "react-icons/ci";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import AdminBooking from "../admin-pages/bookings/adminBookings.jsx";
import AdminCategories from "../admin-pages/categories/adminCategories.jsx";
import AdminRooms from "../admin-pages/rooms/adminRooms.jsx";
import AdminUsers from "../admin-pages/users/adminUsers.jsx";
import AdminFeedback from "../admin-pages/feedback/adminFeedback.jsx";
import AdminGalleryItem from "../admin-pages/galleryItem/adminGalleryItem.jsx";
import AddCategoryForm from "../admin-pages/addCategoryForm/addCategoryForm.jsx";
import UpdateCategory from "../admin-pages/updateCategoryForm/updateCategory.jsx";
import AddGalleryItemForm from "../admin-pages/addGalleryItemForm/addGalleryItemForm.jsx";
import UpdateGalleryItemForm from "../admin-pages/updateGalleryItemForm/updateGalleryItemForm.jsx";
import AddRoomForm from "../admin-pages/addRoomForm/addRoomForm.jsx";
import UpdateRoomForm from "../admin-pages/updateRoomForm/updateRoomForm.jsx";

export default function AdminPage() {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const menuItems = [
    { 
      path: "/admin/bookings", 
      icon: CiBookmarkCheck, 
      label: "Bookings",
      color: "from-blue-500 to-blue-600"
    },
    { 
      path: "/admin/categories", 
      icon: CiViewList, 
      label: "Categories",
      color: "from-purple-500 to-purple-600"
    },
    { 
      path: "/admin/rooms", 
      icon: CiBoxes, 
      label: "Rooms",
      color: "from-green-500 to-green-600"
    },
    { 
      path: "/admin/users", 
      icon: CiUser, 
      label: "Users",
      color: "from-orange-500 to-orange-600"
    },
    { 
      path: "/admin/feedback", 
      icon: CiChat1, 
      label: "Feedback",
      color: "from-pink-500 to-pink-600"
    },
    { 
      path: "/admin/galleryItem", 
      icon: CiImageOn, 
      label: "Gallery",
      color: "from-indigo-500 to-indigo-600"
    },
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <div className="w-full min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarCollapsed ? "w-20" : "w-72"
        } bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 h-screen flex flex-col transition-all duration-300 shadow-2xl fixed left-0 top-0 z-50`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            {!isSidebarCollapsed && (
              <div>
                <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[#C5A059]">
                  AURELIA
                </h1>
                <p className="text-gray-400 text-xs tracking-[0.3em] mt-1">
                  ADMIN PANEL
                </p>
              </div>
            )}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="text-gray-400 hover:text-[#C5A059] transition-colors"
            >
              {isSidebarCollapsed ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {/* Home Link */}
            <Link
              to="/"
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isSidebarCollapsed ? "justify-center" : ""
              } hover:bg-gray-800/50`}
            >
              <CiHome className="w-6 h-6 text-gray-400 group-hover:text-[#C5A059]" />
              {!isSidebarCollapsed && (
                <span className="text-gray-300 group-hover:text-white font-medium">
                  Back to Home
                </span>
              )}
            </Link>

            <div className="my-4 border-t border-gray-700/50" />

            {/* Menu Items */}
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                    isSidebarCollapsed ? "justify-center" : ""
                  } ${
                    isActive
                      ? "bg-[#C5A059] text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? "text-white" : "text-gray-400 group-hover:text-[#C5A059]"}`} />
                  {!isSidebarCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-white rounded-l-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700/50">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 text-gray-300 hover:bg-red-500/10 hover:text-red-400 w-full ${
              isSidebarCollapsed ? "justify-center" : ""
            }`}
          >
            <CiLogout className="w-6 h-6" />
            {!isSidebarCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main
        className={`flex-1 ${
          isSidebarCollapsed ? "ml-20" : "ml-72"
        } transition-all duration-300`}
      >
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {menuItems.find((item) => isActiveRoute(item.path))?.label || "Dashboard"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Manage your hotel operations efficiently
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C5A059] to-[#B39049] flex items-center justify-center text-white font-bold">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 min-h-[calc(100vh-80px)]">
          <Routes>
            <Route path="/bookings" element={<AdminBooking />} />
            <Route path="/categories" element={<AdminCategories />} />
            <Route path="/addCategoryForm" element={<AddCategoryForm />} />
            <Route path="/updateCategory" element={<UpdateCategory />} />
            <Route path="/rooms" element={<AdminRooms />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/feedback" element={<AdminFeedback />} />
            <Route path="/galleryItem" element={<AdminGalleryItem />} />
            <Route path="/addGalleryItemForm" element={<AddGalleryItemForm />} />
            <Route path="/updateGalleryItemForm" element={<UpdateGalleryItemForm />} />
            <Route path="/addRoomForm" element={<AddRoomForm />} />
            <Route path="/updateRoomForm" element={<UpdateRoomForm />} />
            
            {/* Default Dashboard */}
            <Route
              path="/"
              element={
                <div className="space-y-8">
                  {/* Welcome Card */}
                  <div className="bg-gradient-to-r from-[#C5A059] to-[#B39049] rounded-xl p-8 text-white shadow-lg">
                    <h1 className="font-['Playfair_Display'] text-3xl font-bold mb-2">
                      Welcome to Aurelia Grand Admin
                    </h1>
                    <p className="text-white/90">
                      Manage your luxury hotel operations with ease
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: "Total Bookings", value: "156", icon: CiBookmarkCheck, color: "blue" },
                      { label: "Active Rooms", value: "45", icon: CiBoxes, color: "green" },
                      { label: "Total Users", value: "328", icon: CiUser, color: "orange" },
                      { label: "Reviews", value: "89", icon: CiChat1, color: "pink" },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {stat.label}
                          </span>
                        </div>
                        <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Link
                        to="/admin/addRoomForm"
                        className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-all"
                      >
                        <CiBoxes className="w-6 h-6 text-blue-600" />
                        <span className="font-semibold text-blue-900">Add New Room</span>
                      </Link>
                      <Link
                        to="/admin/addCategoryForm"
                        className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:shadow-md transition-all"
                      >
                        <CiViewList className="w-6 h-6 text-purple-600" />
                        <span className="font-semibold text-purple-900">Add Category</span>
                      </Link>
                      <Link
                        to="/admin/addGalleryItemForm"
                        className="flex items-center gap-3 p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg hover:shadow-md transition-all"
                      >
                        <CiImageOn className="w-6 h-6 text-indigo-600" />
                        <span className="font-semibold text-indigo-900">Add Gallery Item</span>
                      </Link>
                    </div>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}