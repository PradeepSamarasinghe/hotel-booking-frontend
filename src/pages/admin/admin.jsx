import { Link } from "react-router-dom";
import {
  CiBookmarkCheck,
  CiViewList,
  CiBoxes,
  CiUser,
  CiChat1,
  CiImageOn,
} from "react-icons/ci";
import { Routes, Route } from "react-router-dom";
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


export default function AdminPage() {

  
  return (
    <div className="w-full max-height-[100vh] flex">
      <div className="w-[20%] bg-blue-300 h-[100vh] flex flex-col gap-5 p-6">
        <div className="text-white hover:text-blue-500 hover:font-bold flex items-center gap-2 py-1">
          <CiBookmarkCheck />
          <Link to="/admin/bookings">Bookings</Link>
        </div>

        <div className="text-white hover:text-blue-500 hover:font-bold flex items-center gap-2">
          <CiViewList />
          <Link to="/admin/categories">Categories</Link>
        </div>

        <div className="text-white hover:text-blue-500 hover:font-bold flex items-center gap-2">
          <CiBoxes />
          <Link to="/admin/rooms">Rooms</Link>
        </div>

        <div className="text-white hover:text-blue-500 hover:font-bold flex items-center gap-2">
          <CiUser />
          <Link to="/admin/users">Users</Link>
        </div>

        <div className="text-white hover:text-blue-500 hover:font-bold flex items-center gap-2">
          <CiChat1 />
          <Link to="/admin/feedback">Feedback</Link>
        </div>

        <div className="text-white hover:text-blue-500 hover:font-bold flex items-center gap-2">
          <CiImageOn />
          <Link to="/admin/galleryItem">Gallery Item</Link>
        </div>
      </div>

      <div className="w-[80%] max-h-[100vh] overflow-y-scroll bg-blue-900">
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
        </Routes>
      </div>
    </div>
  );
}
