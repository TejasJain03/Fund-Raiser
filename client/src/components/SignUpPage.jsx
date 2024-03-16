import { useState } from "react";
import axiosInstance from "../axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup submitted:", formData);
    axiosInstance
      .post("/register", formData)
      .then((response) => {
        console.log(response.data);
        toast.success("Signup successful!", {
          onClose: () => {
            navigate("/login");
          }
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error signing up. Please try again.");
      });
  };
  

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-auto md:h-[80vh] mx-auto max-w-2xl mt-8 p-8 bg-white rounded-md">
        <div className="w-[100%] shadow-md p-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Register</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-lg font-semibold text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
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
                Create Password:
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
                className="bg-yellow text-white px-6 py-3 rounded-full focus:outline-none focus:ring focus:border-blue-300"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}
