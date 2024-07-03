import React, { useState } from "react";
import { useDispatch } from "react-redux";

//redux slices
import { newWorkout } from "../redux/workoutSlice";

const AddWorkout = () => {
  const [title, setTitle] = useState("");
  const [reps, setResp] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const getToken = () => {
      return localStorage.getItem("token");
    };

    const token = getToken();
    if (!token) {
      setError("User is not authenticated");
      return;
    }

    const workout = { title, reps, load };

    const response = await fetch("/workout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(workout),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.err);
    } else {
      setTitle("");
      setResp("");
      setLoad("");
      setError(null);
      dispatch(newWorkout(json));
    }
  };

  return (
    <div className=" md:col-span-5 md:m-4">
      <h3 className="text-center font-bold text-xl text-blue-700 pt-10">
        Add a New Workout
      </h3>

      <form className="md:p-10 pt-5" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-blue-400 font-semibold  block mb-2">
            Excersize Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full md:w-10/12 h-10 outline outline-1 rounded outline-gray-200"
          />
        </div>

        <div className="mb-4">
          <label className="text-blue-400 font-semibold block mb-2">
            Load (in kg):
          </label>
          <input
            type="number"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            className="w-full md:w-10/12 h-10 outline outline-1 rounded outline-gray-200"
          />
        </div>

        <div className="mb-4">
          <label className="text-blue-400 font-semibold  block mb-2">
            Number of Reps:
          </label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setResp(e.target.value)}
            className="w-full md:w-10/12 h-10 outline outline-1 rounded outline-gray-200"
          />
        </div>

        <button className="bg-blue-700 text-white p-2 rounded">
          Add Workout
        </button>
        {error && (
          <div className="mt-4 text-red-600 outline outline-1 bg-red-50 p-2 rounded">
            ⚠️ {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddWorkout;
