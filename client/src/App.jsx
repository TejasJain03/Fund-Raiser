import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
// import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Donation from "./components/Donation";
import CreateCampaign from "./components/CreateCampaign";
import NotFound from "./components/NotFound";
import LoginPage from "./components/LoginPage";
import SingupPage from "./components/SignUpPage";
import PaymentConfirm from "./components/PaymentConfirm";
import UpdateCampaign from "./components/UpdateCampaign";
import AboutCampaign from "./components/AboutCampaign";
import UserCampaigns from "./components/UserCampaigns";
import PaymentSuccess from "./components/PaymentSuccess";
import UserAboutCampaign from "./components/UserAboutEvent";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/makedonation/:campaignId" element={<Donation />} />
          <Route
            path="/updatecampaign/:campaignId"
            element={<UpdateCampaign />}
          />
          <Route path="/createcampaign" element={<CreateCampaign />} />
          <Route
            path="/paymentsuccess/:campaignId/:name/:reference"
            element={<PaymentSuccess />}
          ></Route>
          <Route path="/paymentConfirm" element={<PaymentConfirm />} />
          <Route
            path="/aboutcampaign/:campaignId"
            element={<AboutCampaign />}
          />
          <Route path="/usercampaigns" element={<UserCampaigns />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/useraboutcampaign/:campaignId"
            element={<UserAboutCampaign />}
          />
          <Route path="/register" element={<SingupPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
