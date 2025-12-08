import HomePage from "./pages/client-pages/homePage.jsx";
import AdminPage from "./pages/admin/admin.jsx";
import LoginPage from "./pages/login/login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "./pages/client-pages/categories.jsx";
import Test from "./components/tes/test.jsx";
import { Toaster } from "react-hot-toast"; 


function App() {

  return (
    <BrowserRouter>

    <Toaster/>
      <Routes path="/*">
        <Route path="/*" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/test" element={<Test />}></Route>
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
