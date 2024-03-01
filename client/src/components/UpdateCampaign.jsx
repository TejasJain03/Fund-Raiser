import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateCampaign() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goalAmount: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);

  const { campaignId } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`/getcampaign/${campaignId}`)
      .then((response) => {
        setFormData(response.data.campaign);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [campaignId]);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axiosInstance
      .put(`/updatecampaign/${campaignId}`, formData)
      .then((response) => {
        console.log(response.data);
        toast.success("Campaign details updated!", {
          onClose: () => {
            navigate(`/useraboutcampaign/${campaignId}`);
          },
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update campaign details.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 p-8 shadow-md rounded-md bg-white">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Update Campaign Details
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-semibold text-gray-700"
            >
              Campaign Title:
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-lg font-semibold text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="goalAmount"
              className="block text-lg font-semibold text-gray-700"
            >
              Goal Amount:
            </label>
            <input
              type="number"
              id="goalAmount"
              value={formData.goalAmount}
              onChange={handleChange}
              required
              className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="startDate"
              className="block text-lg font-semibold text-gray-700"
            >
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={formData.startDate.slice(0, 10) || ""}
              onChange={handleChange}
              required
              className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-lg font-semibold text-gray-700"
            >
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              value={formData.endDate.slice(0, 10) || ""}
              onChange={handleChange}
              required
              className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className={`bg-yellow text-white px-6 py-3 rounded-full focus:outline-none focus:ring focus:border-blue-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Campaign"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}
