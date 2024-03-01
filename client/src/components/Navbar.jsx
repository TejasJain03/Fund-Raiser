import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="w-full font-sans h-20 bg-darkBlue flex justify-between items-center px-6">
        <h1
          className="text-white text-3xl cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          PledgeNow
        </h1>
        <h1
          className="text-white w-full text-center cursor-pointer"
          onClick={() => {
            navigate("/createcampaign");
          }}
        >
          Create Campaign
        </h1>
        <h1></h1>
        {isLoggedIn ? (
          <h1
            className="text-white cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </h1>
        ) : (
          <h1
            className="text-white cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </h1>
        )}
      </div>
    </>
  );
}
