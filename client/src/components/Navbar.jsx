import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full font-sans h-20 bg-darkBlue flex justify-between items-center px-6">
        <h1 className="text-white text-3xl">LOGO</h1>
        <h1
          className="text-white cursor-pointer"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </h1>
      </div>
    </>
  );
}
