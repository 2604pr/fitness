import React, { useState } from "react";
import { useDispatch } from "react-redux";

//slice
import { updateWorkout } from "../redux/workoutSlice";

const EditWorkout = ({ data }) => {
  const [title, setTitle] = useState(data.title);
  const [load, setLoad] = useState(data.load);
  const [reps, setReps] = useState(data.reps);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const editWorkout = async (e) => {
    e.preventDefault();

    const getToken = () => {
      return localStorage.getItem("token");
    };

    const token = getToken();
    if (!token) {
      setError("User is not authenticated");
      return;
    }

    const response = await fetch("/workout/" + data._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        load,
        reps,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.err);
    } else {
      dispatch(updateWorkout(json));
    }
  };

  return (
    <div className="md:col-span-5 md:m-4">
      <h3 className="text-center font-bold text-xl text-blue-700 pt-10">
        Edit Workout
      </h3>
      <form className="md:p-10 pt-5" onSubmit={editWorkout}>
        <div className="mb-3">
          <label className="text-blue-400 font-semibold block mb-2">
            Excersize Title:
          </label>
          <input
            type="text"
            className="w-full md:w-10/12 h-10 outline outline-1 rounded outline-gray-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="text-blue-400 font-semibold block mb-2">
            Load (in kg):
          </label>
          <input
            type="number"
            className="w-full md:w-10/12 h-10 outline outline-1 rounded outline-gray-200"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="text-blue-400 font-semibold block mb-2">
            Number of Reps:
          </label>
          <input
            type="number"
            className="w-full md:w-10/12 h-10 outline outline-1 rounded outline-gray-200"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </div>
        <button className="bg-blue-700 text-white p-2 rounded">Submit</button>
        {error && (
          <div className="mt-4 text-red-600 outline outline-1 bg-red-50 p-2 rounded">
            ⚠️ {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default EditWorkout;
