import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//redux slices
import { userLogout } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.authentication || {}); // auth is not undefined
  const { register, login } = auth;
  const userEmail = register?.email || login?.email;

  const [menu, setMenu] = useState(false);

  const displayMenu = () => {
    setMenu(!menu);
  };

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <header className="flex items-center justify-between flex-wrap p-6 shadow-md shadow-gray-300">
      <div className="flex items-center flex-shrink-0  mr-6">
        <Link to={"/"}>
          <h1 className="font-bold lg:text-3xl text-2xl text-blue-700">
            Fitness Planner
          </h1>
        </Link>
      </div>
      <div className="block lg:hidden">
        <span className="material-symbols-outlined" onClick={displayMenu}>
          menu
        </span>
      </div>
      <div
        className={`${
          menu ? "block" : "hidden"
        } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        <div className="text-sm lg:flex-grow"></div>
        <div>
          {userEmail && (
            <span className="text-blue-700 mr-4">Welcome, {userEmail}</span>
          )}

          {!userEmail ? (
            <>
              <button className="bg-blue-700 text-white rounded p-2 mr-2 block lg:inline-block lg:mt-0 mt-4">
                <Link to={"/user/register"}>Sign Up</Link>
              </button>
              <button className="bg-blue-700 text-white rounded p-2 mr-2 block lg:inline-block lg:mt-0 mt-4">
                <Link to={"/user/login"}>Sign In</Link>
              </button>
            </>
          ) : (
            <button
              className="text-blue-700 outline outline-1 outline-blue-700 rounded p-2 mr-2 block lg:inline-block lg:mt-0 mt-4"
              onClick={handleLogout}
            >
              <Link to={"/"}>Logout</Link>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
