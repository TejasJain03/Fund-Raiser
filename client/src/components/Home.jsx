/* eslint-disable react/no-unescaped-entities */
import AllCampaign from "./AllCampaign";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Home() {
  // const navigate = useNavigate();
  const Img = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <>
      <Navbar />
      <div className="w-full h-[60vh] flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-[50vh] md:h-full p-4 flex items-center">
          <img
            src={Img}
            className="w-full h-full object-cover rounded-lg"
            alt=""
          />
        </div>

        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8">
          <blockquote className="text-gray-700 text-xl md:text-2xl lg:text-3xl leading-relaxed italic">
            "Giving is not just about making a donation. It's about making a
            difference."
            <span className="block text-gray-500 text-lg mt-4">
              - Kathy Calvin
            </span>
          </blockquote>
        </div>
      </div>

      <AllCampaign />
      <Footer />
    </>
  );
}
