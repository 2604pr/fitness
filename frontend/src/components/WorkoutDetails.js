import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

//redux slices
import { deleteWorkout } from "../redux/workoutSlice";

const WorkoutDetails = ({ data }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const deleteData = async () => {
    const token = getToken();
    if (!token) {
      setError("User is not authenticated");
      return;
    }

    const response = await fetch("/workout/" + data._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.err);
    } else {
      dispatch(deleteWorkout(data));
    }
  };
  return (
    <div className="my-4 p-5 bg-slate-50 md:flex md:justify-between">
      <div>
        <h4 className="text-blue-600 font-semibold text-lg">{data.title}</h4>
        <p className="font-medium">Number of reps: {data.reps}</p>
        <p className="font-medium">Load (kg): {data.load}</p>
        <p className="font-medium">
          {formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}
        </p>
      </div>
      <div className="pt-2 md:flex md:flex-col">
        <Link to={"/allworkout/" + data._id}>
          <button className="material-symbols-outlined">visibility</button>
        </Link>
        <button className="material-symbols-outlined" onClick={deleteData}>
          delete
        </button>
      </div>
      {error && (
        <div className="mt-4 text-red-600 outline outline-1 bg-red-50 p-2 rounded">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};

export default WorkoutDetails;
