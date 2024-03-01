import Navbar from "./Navbar";
import Footer from "./Footer";
import axiosInstance from "../axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserAboutCampaign() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState();
  const [reviews, setReviews] = useState();

  useEffect(() => {
    axiosInstance
      .get(`/getcampaign/${campaignId}`)
      .then((response) => {
        setCampaign(response.data.campaign);
        setReviews(response.data.campaign.reviews);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [campaignId]);

  const handleUpdateCampaign = (campaignId) => {
    navigate(`/updatecampaign/${campaignId}`)
  };

  const handleDeleteCampaign = (campaignId) => {
    axiosInstance.delete(`/deletecampaign/${campaignId}`)
      .then((response) => {
        console.log("Delete response:", response.data);
        toast.success("Campaign deleted successfully!", {
          onClose: () => {
            navigate("/usercampaigns");
          }
        });
      })
      .catch((error) => {
        console.error("Delete error:", error);
        toast.error("Failed to delete the campaign.");
      });
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
            <div className="md:w-1/2 md:ml-4 pl-4 lg:pl-20">
              <h1 className="text-5xl font-bold mb-6">{campaign.title}</h1>
              <p className="text-gray-800 mb-4">
                <span className="font-bold">Category:</span> {campaign.category}
              </p>
              <p className="text-gray-800 mb-4">
                <span className="font-bold">Description:</span>{" "}
                {campaign.description}
              </p>
              <p className="text-gray-800 mb-4">
                <span className="font-bold">Goal Amount:</span>{" "}
                {campaign.goalAmount}
              </p>
              <p className="text-gray-800 mb-4">
                <span className="font-bold">Start Date:</span>{" "}
                {campaign.startDate.slice(0, 10)}
              </p>
              <p className="text-gray-800 mb-4">
                <span className="font-bold">End Date:</span>{" "}
                {campaign.endDate.slice(0, 10)}
              </p>

              <div className="mb-6">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                        Donated
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-teal-600">
                        {`${Math.round(
                          (campaign.currentAmount / campaign.goalAmount) * 100
                        )}%`}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex">
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                          0
                        </span>
                      </div>
                      <div className="flex flex-1 items-center justify-center">
                        <div className="w-full bg-teal-200">
                          <div
                            className="w-full bg-teal-500 py-1 rounded-full"
                            style={{
                              width: `${
                                (campaign.currentAmount / campaign.goalAmount) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex">
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                          100
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  className="bg-darkBlue text-white px-4 py-2 rounded-md mr-4"
                  onClick={()=>{handleUpdateCampaign(campaign._id)}}
                >
                  Update
                </button>
                <button
                  className="bg-red-600  text-white px-4 py-2 rounded-md"
                  onClick={()=>{handleDeleteCampaign(campaign._id)}}
                >
                  Delete
                </button>
              </div>
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
                      alt={review.user.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                  </div>
                  <p className="text-gray-600">
                    <span className="font-bold">{review.user.name}</span> on{" "}
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
      <ToastContainer />
    </>
  );
}
