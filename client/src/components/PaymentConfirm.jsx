import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { useLocation } from "react-router-dom";

export default function PaymentConfirm() {
  const [key, setKey] = useState();
  const location = useLocation();
  const { formData, campaignId } = location.state;
  const [loading, setLoading] = useState(false);
  const campaign = campaignId.campaignId;

  const createOrder = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.post("/create-order", {
        amount: formData.amount,
      });
      const options = {
        key: key,
        amount: response.data.amount * 100,
        currency: response.data.currency,
        name: "Fund Raising",
        description: "Donation",
        order_id: response.data.id,

        handler: (response) => {
          console.log("Payment successful");
          console.log("Donation submitted:", formData);
          axiosInstance
            .post(`/${campaign}/makedonation`, { formData, response })
            .then((response) => {
              console.log(response.data);
            })
            .catch((err) => {
              console.log(err.response.data);
            });
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axiosInstance
      .get("/get-key")
      .then((response) => {
        setKey(response.data.key);
        console.log(campaign);
        console.log(formData.amount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col items-center mt-8">
      <p className="mt-2 text-gray-700 cursor-pointer">Are you sure?</p>
      <button
        onClick={createOrder}
        className="bg-darkBlue text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-blue-800 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        {loading ? (
          <>
            <span className="mr-2">Processing...</span>
            <span className="animate-spin">&#129312;</span>
          </>
        ) : (
          "Donate Now"
        )}
      </button>
    </div>
  );
}
