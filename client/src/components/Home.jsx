/* eslint-disable react/no-unescaped-entities */
import AllCampaign from "./AllCampaign";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Home() {
  // const navigate = useNavigate();
  const Img = "https://source.unsplash.com/800x600/?fundraising";

  return (
    <>
      <Navbar />
      <div className="w-full h-[60vh] flex flex-col md:flex-row">
        {/* Image Section */}
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
