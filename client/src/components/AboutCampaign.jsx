import Navbar from "./Navbar";
import Footer from "./Footer";
import axiosInstance from "../axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AboutCampaign() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState();
  const [reviews, setReviews] = useState();

  useEffect(() => {
    axiosInstance
      .get(`/getcampaign/${campaignId}`)
      .then((response) => {
        console.log(response.data.campaign.reviews[2]);
        setCampaign(response.data.campaign);
        setReviews(response.data.campaign.reviews);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [campaignId]);

  const isCampaignCompleted = () => {
    return campaign?.status === "completed";
  };

  // Function to check if the current date is past the campaign end date
  const isPastEndDate = () => {
    const currentDate = new Date();
    const endDate = new Date(campaign?.endDate);
    return currentDate > endDate;
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 p-8 shadow-md rounded-md">
        {campaign ? (
          <div className="md:flex">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-[500px] object-cover rounded-md shadow-md"
              />
            </div>
            <div className="md:w-1/2 md:ml-4 pl-4 ">
              <h1 className="text-5xl font-bold mb-6">{campaign.title}</h1>
              <p className="text-gray-800 mb-4 ">
                <span className="font-bold">Category:</span> {campaign.category}
              </p>
              <p className="text-gray-800 mb-4">
                <span className="font-bold">Goal Amount:</span> $
                {campaign.goalAmount}
              </p>
               {!isCampaignCompleted() || !isPastEndDate() && (
              <p className="text-gray-800 mb-4">
                <span className="font-bold">Current Amount:</span> $
                {campaign.currentAmount}
              </p>
               )}
              <p className="text-gray-800 mb-6">
                <span className="font-bold">Description:</span>{" "}
                {campaign.description}
              </p>
              <p className="text-gray-800 mb-4">
                <span className="font-bold">Start Date:</span>{" "}
                {new Date(campaign.startDate).toLocaleDateString()}
              </p>
              <p className="text-gray-800 mb-4">
                <span className="font-bold">End Date:</span>{" "}
                {new Date(campaign.endDate).toLocaleDateString()}
              </p>
              {!isCampaignCompleted() || !isPastEndDate() ? (
                <button
                  className="bg-yellow text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    navigate(`/makedonation/${campaign._id}`);
                  }}
                >
                  Donate
                </button>
              ) : (
                <p className="text-red-800 font-bold">
                  Donations are currently closed.
                </p>
              )}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="container mx-auto my-8 p-8 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6">Reviews</h2>
        {reviews && reviews.length > 0 ? (
          <ul>
            {reviews.map((review, index) => (
              <li key={index} className="mb-6 border-b pb-6">
                <p className="text-gray-800 text-lg mb-4">
                  {review.reviewBody}
                </p>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      src="https://via.placeholder.com/32"
                      alt={review.user}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                  </div>
                  <p className="text-gray-600">
                    <span className="font-bold">{review.user}</span> on{" "}
                    {review.datePosted.slice(0, 10) || ""}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-800">No reviews yet.</p>
        )}
      </div>

      <Footer />
    </>
  );
}
