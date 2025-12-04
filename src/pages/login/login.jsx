import "./login.css";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
            email: email,
            password: password
        }).then((res) => {
            // console.log(res.data);
            localStorage.setItem("token", res.data.token);

            // const token = localStorage.getItem("token");
            // console.log("Stored Token:", token);
            // console.log("Login Response Data:", res.data.userData);
            
            if(res.data.isAdmin) {
                window.location.href = "/admin";
            }else{
                window.location.href = "/";
            }
            
        }).catch((err) => {
            console.log(err);
        });
    }

  return (
    <div className="w-full h-screen pic-bg flex justify-center items-center">
      <div className="w-[380px] p-8 backdrop-blur-xl bg-white/10 rounded-xl shadow-lg flex flex-col items-center">

        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 rounded-md mb-4 bg-white/20 text-white placeholder-gray-200 border border-white/40 focus:outline-none focus:border-blue-300"
          defaultValue={email}
          onChange={
            (e) => {
                // console.log(e)
                setEmail(e.target.value);
            }
          }
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 rounded-md mb-6 bg-white/20 text-white placeholder-gray-200 border border-white/40 focus:outline-none focus:border-blue-300"
            defaultValue={password}
            onChange={
                (e) => {
                    // console.log(e.target.value)
                    setPassword(e.target.value)
                }
            }
        />

        <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 duration-200">
          Login
        </button>

        <p className="text-gray-200 text-sm mt-4">
          Forgot password?
        </p>
      </div>
    </div>
  );
}
