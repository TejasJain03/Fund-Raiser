import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

export default function AllCampaign() {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(Cookie.get("access_token"));
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

  function formatDate(dateString) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <>
      <div className="mx-auto min-h-screen mt-8 ">
        <h1 className="text-3xl font-bold mb-6 text-center p-8 text-gray-900">
          All Campaigns
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-gray-100 shadow-lg p-6 mb-6 h-auto rounded-md flex flex-col justify-between"
            >
              <div>
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-96 object-cover mb-4 rounded-md"
                />
                <h2 className="text-2xl font-bold mb-2 text-gray-900">
                  {campaign.title}
                </h2>
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
              </div>
              <button
                className="bg-yellow text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                onClick={() => {
                  navigate(`/aboutcampaign/${campaign._id}`);
                }}
              >
                Know More
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="bg-darkBlue text-white px-4 py-2 rounded-md"
            onClick={() => {
              navigate("/usercampaigns");
            }}
          >
            Your Campaigns
          </button>
        </div>
      </div>
    </>
  );
}
