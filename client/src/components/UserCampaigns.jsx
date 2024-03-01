import { useState, useEffect } from "react";
import axiosInstance from "../axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function UserCampaigns() {
  const [userCampaigns, setUserCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/createcampaign")
      .then(() => {
        axiosInstance
          .get("/getusercampaign")
          .then((response) => {
            setUserCampaigns(response.data.campaigns);
          })
          .catch((err) => {
            console.error("Error fetching user campaigns:", err);
          });
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, [navigate]);

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

  function formatDate(dateString) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <>
      <Navbar />
      <div className=" mx-auto my-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Your Campaigns</h2>

        {userCampaigns.length === 0 ? (
          <p className="text-gray-800 text-center mb-8">
            You have no campaigns at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
            {userCampaigns.map((campaign) => (
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
                    navigate(`/useraboutcampaign/${campaign._id}`);
                  }}
                >
                  Know More
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
