import HomePage from "./pages/client-pages/homePage.jsx";
import AdminPage from "./pages/admin-pages/admin.jsx";
import LoginPage from "./pages/login/login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Divide } from "lucide-react";
import Categories from "./pages/client-pages/categories.jsx";
function App() {

  return (
    <BrowserRouter>
    
      <Routes path="/*">
        <Route path="/*" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/admin/*" element={<AdminPage />} />
        {/* <Route path="/*" element={
          <div className="w-full h-screen flex justify-center items-center bg-red-500">
            <h1 className="text-white text-3xl font-bold">404 - Page Not Found</h1>
          </div>
        }/> */}
      </Routes>

    </BrowserRouter>
  );  
}

export default App;
