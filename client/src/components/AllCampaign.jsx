import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AllCampaign() {
  const [campaigns, setCampaigns] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/getallcampaign")
      .then((response) => {
        console.log(response.data.campaigns);

        setCampaigns(response.data.campaigns);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = () => {
    axiosInstance
      .get("/logout")
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (campaignId) => {
    axiosInstance
      .delete(`/deletecampaign/${campaignId}`)
      .then((response) => {
        console.log(response.data);

        setCampaigns((prevCampaigns) =>
          prevCampaigns.filter((campaign) => campaign._id !== campaignId)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function formatDate(dateString) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return (
    <>
      <Navbar />
      <div className="container mx-auto min-h-[100vh] mt-8">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white shadow p-4 mb-4 w-64 h-auto"
          >
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-64 object-cover mb-2"
            />
            <h2 className="text-xl font-bold mb-2 text-gray-900">
              {campaign.title}
            </h2>
            {/* <p className="mb-2 text-gray-700">{campaign.description}</p> */}
            <p className="mb-2 text-gray-800">
              Goal Amount: {campaign.goalAmount}
            </p>
            <p className="mb-2 text-gray-800">
              Start Date: {formatDate(campaign.startDate)}
            </p>
            <p className="mb-2 text-gray-800">
              End Date: {formatDate(campaign.endDate)}
            </p>
            <p className="mb-2 text-gray-800">
              Category: {campaign.category}
            </p>
            <button
              className="bg-yellow text-white px-4 py-2 rounded-md hover:bg-yellow-600"
              onClick={() => {
                navigate(`/makedonation/${campaign._id}`);
              }}
            >
              Make Donation
            </button>
          </div>
        ))}
        {/* <div>
          <button
            onClick={() => {
              navigate(`/updatecampaign/${campaign._id}`);
            }}
          >
            Update Campaign
          </button>
          <button
            onClick={() => {
              handleDelete(campaign._id);
              console.log(campaign._id);
            }}
          >
            Delete
          </button>
        </div> */}
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Footer />
    </>
  );
}
