import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { useParams } from "react-router-dom";

export default function UpdateCampaign() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goalAmount: "",
    startDate: "",
    endDate: "",
  });

  const { campaignId } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`/getcampaign/${campaignId}`)
      .then((response) => {
        console.log(response.data.campaign);
        setFormData(response.data.campaign);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [campaignId]);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Campaign details updated:", formData);
    axiosInstance
      .put(`/updatecampaign/${campaignId}`, formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h2>Update Campaign Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Campaign Title:</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="goalAmount">Goal Amount:</label>
          <input
            type="number"
            id="goalAmount"
            value={formData.goalAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={formData.startDate.slice(0, 10) || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={formData.endDate.slice(0, 10) || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Update Campaign</button>
        </div>
      </form>
    </>
  );
}
