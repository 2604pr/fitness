import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

//redux slices
import { userRegister } from "../redux/authSlice";

const UserRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const newUser = { name, email, password };

    const responseNewUser = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const jsonNewUser = await responseNewUser.json();
    if (!responseNewUser.ok) {
      setError(jsonNewUser.error);
    } else {
      dispatch(userRegister(jsonNewUser));
      navigate("/allworkout");
    }
  };

  return (
    <div className="my-10 flex justify-center">
      <form className="md:w-1/2 w-10/12 my-5" onSubmit={handleSubmit}>
        <h3 className="font-bold text-2xl text-blue-700 md:pt-10 mb-5">
          Sign Up
        </h3>

        <div className="mb-2">
          <label className="text-blue-400 font-semibold  block mb-2">
            User Name
          </label>
          <input
            type="text"
            className="w-full md:w-10/12 h-10 outline outline-1 rounded outline-gray-200"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
          Sign Up
        </button>
        <p className="text-blue-400 font-semibold mb-2 cursor-pointer">
          <Link to={"/user/login"}>Already registered? Sign In Now.</Link>
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

export default UserRegister;
