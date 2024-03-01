/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axiosInstance from "../axios";
import Footer from "./Footer";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
    axiosInstance
      .post("/login", formData)
      .then((response) => {
        console.log(response.data);
        navigate("/usercampaigns");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-[80vh] mx-auto max-w-2xl mt-8 p-8 bg-white rounded-md">
        <div className="w-full p-8 shadow-md">
          <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-lg font-semibold text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="password"
                className="block text-lg font-semibold text-gray-700"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="bg-yellow text-white px-6 py-3 rounded-full focus:outline-none focus:ring"
              >
                Login
              </button>
            </div>
          </form>
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
