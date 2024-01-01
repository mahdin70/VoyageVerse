import { Link, useNavigate, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  };

  const user = useContext(UserContext);

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-4xl md:text-xl font-extrabold">
        <Link
          to="/"
          className="no-underline text-white hover:text-gray-300 bg-black px-4 py-2"
        >
          VoyageVerse
        </Link>
      </h1>

      {path === "/" && (
        <div className="flex items-center space-x-2">
          <div className="relative flex items-center">
            <BsSearch
              onClick={() =>
                navigate(prompt ? "?search=" + prompt : navigate("/"))
              }
              className="cursor-pointer absolute left-4 text-gray-500"
            />
            <input
              onChange={(e) => setPrompt(e.target.value)}
              className="rounded-full w-[200px] pl-8 pr-3 py-2 border-2 border-black focus:outline-none focus:border-blue-500"
              placeholder="Search a Post"
              type="text"
            />
          </div>
        </div>
      )}

      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3>
            <Link
              to="/write"
              className="no-underline text-black hover:text-gray-800"
            >
              Write
            </Link>
          </h3>
        ) : (
          <h3>
            <Link
              to="/login"
              className="no-underline text-black hover:text-gray-800"
            >
              Login
            </Link>
          </h3>
        )}
        {user ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative">
              <FaBars size={30} />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3>
            <Link
              to="/register"
              className="no-underline text-black hover:text-gray-800"
            >
              Register
            </Link>
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden">
        <p className="cursor-pointer relative">
          <FaBars size={30} />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
