import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

//redux slices
import { userLogin } from "../redux/authSlice";

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    //login the user
    const userLoginInfo = { email, password };
    const responseUserLogin = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userLoginInfo),
    });

    const jsonUserLogin = await responseUserLogin.json();

    if (!responseUserLogin.ok) {
      setError(jsonUserLogin.error);
    } else {
      dispatch(userLogin(jsonUserLogin));
      navigate("/allworkout");
    }
  };
  return (
    <div className="my-10 flex justify-center">
      <form className="md:w-1/2 w-10/12 my-5" onSubmit={handleSubmit}>
        <h3 className="font-bold text-2xl text-blue-700 md:pt-10 mb-5">
          Sign In
        </h3>

        <div className="mb-2">
          <label className="text-blue-400 font-semibold  block mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full md:w-10/12 h-10 outline outline-1 rounded outline-gray-200"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="text-blue-400 font-semibold  block mb-2">
            Password
          </label>
          <input
            type="password"
            className="w-full md:w-10/12 h-10 outline outline-1 rounded outline-gray-200"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="bg-blue-700 text-white p-2 rounded mb-2">
          Sign In
        </button>

        <p className="text-blue-400 font-semibold mb-2 cursor-pointer">
          <Link to={"/user/register"}>
            New to Fitness Planner? Sign up now.
          </Link>
        </p>
        {error && (
          <p className="mt-4 text-red-600 outline outline-1 bg-red-50 p-2 rounded">
            ⚠️ {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default UserLogin;
