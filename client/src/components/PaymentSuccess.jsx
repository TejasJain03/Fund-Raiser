import { useNavigate, useParams } from "react-router-dom";

function PaymentSuccess() {
  const { reference } = useParams();
  const navigate = useNavigate();

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
        <button
          onClick={() => {
            navigate("/");
          }}
          className="p-4 mt-6 rounded-lg text-white bg-darkBlue "
        >
          Go back to Home
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
