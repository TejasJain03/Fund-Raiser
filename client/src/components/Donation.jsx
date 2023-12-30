import { useState } from "react";
// import axiosInstace from "../axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Donation() {
  const navigate = useNavigate();
  const campaignId = useParams(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Donation submitted:", formData);
  //   axiosInstace
  //     .post(`/${campaignId}/makedonation`, formData)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data);
  //     });

  // };

  return (
    <>
      <h2>Make a Donation</h2>
      <form
        onSubmit={() => {
          navigate("/paymentConfirm", { state: { formData, campaignId } });
        }}
      >
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" onChange={handleChange} required />
        </div>
        <div>
          <button type="submit">Donate</button>
        </div>
      </form>
    </>
  );
}
