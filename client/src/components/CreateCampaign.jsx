import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateCampaign() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goalAmount: "",
    startDate: "",
    endDate: "",
    category: "",
    image: null,
  });
  const [creatingCampaign, setCreatingCampaign] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCreatingCampaign(true); // Set state to indicate campaign creation is ongoing

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    axiosInstance
      .post("/createcampaign", formDataToSend)
      .then((response) => {
        console.log(response.data.success);
        toast.success("Campaign created successfully!", {
          onClose: () => {
            navigate("/usercampaigns");
          },
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error creating campaign. Please try again.");
        // navigate("/login");
      })
      .finally(() => {
        setCreatingCampaign(false); // Reset state after campaign creation process is completed
      });
  };

  useEffect(() => {
    axiosInstance
      .get("/createcampaign")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 p-8 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-bold mb-4">Create a Campaign</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Campaign Title:
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="mt-1 p-2 border rounded-md w-full"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category:
            </label>
            <input
              type="text"
              id="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="goalAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Goal Amount:
            </label>
            <input
              type="number"
              id="goalAmount"
              value={formData.goalAmount}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image:
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={creatingCampaign} 
              className="bg-yellow text-white px-4 py-2 rounded-md "
            >
              {creatingCampaign ? "Creating Campaign..." : "Create Campaign"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}
