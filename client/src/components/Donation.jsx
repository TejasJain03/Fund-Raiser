import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Donation() {
  const navigate = useNavigate();
  const { campaignId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    amount: "",
  });
  const [campaignData, setCampaignData] = useState(null);

  useEffect(() => {
    axiosInstance(`/getcampaign/${campaignId}`)
      .then((response) => {
        setCampaignData(response.data.campaign);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [campaignId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  
  return (
    <>
      <Navbar />
      <div className="container mx-auto  my-8 min-h-[60vh] grid grid-cols-1 md:grid-cols-2 gap-10 ">
        <div className="md:w-[90%]  ">
          {campaignData ? (
            <>
              <h2 className="text-3xl font-bold mb-8 text-center">
                {campaignData.title}
              </h2>
              <p className="text-xl text-gray-800 mb-4">
                <span className="font-bold">Description:</span>{" "}
                {campaignData.description}
              </p>
              <p className="text-xl text-gray-800 mb-4">
                <span className="font-bold">Category:</span>{" "}
                {campaignData.category}
              </p>
              <p className="text-xl text-gray-800 mb-2">
                <span className="font-bold">Goal Amount:</span> $
                {campaignData.goalAmount}
              </p>
            </>
          ) : (
            <p>Loading campaign data...</p>
          )}
        </div>


        <div className="md:w-full">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Make a Donation
          </h2>
          <form
            onSubmit={() => {
              navigate("/paymentConfirm", {
                state: { formData, campaignId, campaignData },
              });
            }}
            className="grid grid-cols-1 gap-4 w-full"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                onChange={handleChange}
                required
                className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                onChange={handleChange}
                required
                className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number:
              </label>
              <input
                type="tel"
                id="phoneNumber"
                onChange={handleChange}
                required
                className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount:
              </label>
              <input
                type="number"
                id="amount"
                onChange={handleChange}
                required
                className="mt-1 p-3 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-yellow text-white px-6 py-3 rounded-full "
              >
                Donate
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
