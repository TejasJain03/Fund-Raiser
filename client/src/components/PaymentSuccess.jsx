import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axios";

function PaymentSuccess() {
  const { reference, name, campaignId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState("");

  const handleSubmitReview = (name) => {
    axiosInstance
      .post(`/${campaignId}/givereview`, {reviewBody:review,name:name,campaignId:campaignId})
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    console.log(reference);
    console.log(name);
  }, [name, reference]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center p-8 border rounded-lg shadow-lg bg-white">
        <h1 className="text-3xl font-bold mb-4 ">
          Thank You for Your Donation!
        </h1>
        <p className="text-lg">
          Your payment was <span className="text-green-600">successful</span>,
          and we appreciate your generous support.
        </p>
        <p className="font-bold mt-4">Reference ID: {reference}</p>

        <div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="What do you think about this campaign..."
            className="mt-4 p-2 border rounded-md w-full"
          />
          <button
            onClick={() => {
              handleSubmitReview(name);
            }}
            className="bg-yellow text-white px-4 py-2 rounded-md mt-4"
          >
            Submit Review
          </button>
        </div>

        <button
          onClick={() => {
            navigate("/");
          }}
          className="px-4 py-2 mt-6 rounded-lg text-white bg-darkBlue"
        >
          Skip Review
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
