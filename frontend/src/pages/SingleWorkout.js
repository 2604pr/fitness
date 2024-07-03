import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

//component
import EditWorkout from "../components/EditWorkout";

//custom hook
import useSingleWorkout from "../Hooks/useSingleWorkout";

const SingleWorkout = () => {
  const { id } = useParams();
  const { error, workout: initialWorkout } = useSingleWorkout(id);

  const workout =
    useSelector((store) =>
      store.workout.getWorkouts.find((workout) => workout._id === id)
    ) || initialWorkout;

  if (error) {
    return (
      <div className="m-5">
        <p className="text-red-600 text-center font-bold text-2xl md:p-2 pb-5">
          ⚠️ {error}
        </p>
        <Link to="/allworkout">
          <button className="bg-black text-white p-2 rounded">Back</button>
        </Link>
      </div>
    );
  }

  if (!workout) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-5">
      <button class="material-symbols-outlined outline outline-1 m-4 rounded p-2 hidden sm:block">
        <Link to="/allworkout">arrow_back</Link>
      </button>

      <div className="md:p-2 pb-5 md:grid md:grid-cols-12">
        <div className="md:col-span-7 md:m-4 md:p-10">
          <h4 className="text-blue-600 font-semibold text-lg">
            {workout.title}
          </h4>
          <p className="font-medium">Number of reps: {workout.reps}</p>
          <p className="font-medium">Load (kg): {workout.load}</p>
          <p className="font-medium">
            {formatDistanceToNow(new Date(workout.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
        <EditWorkout data={workout} />
      </div>

      <button class="material-symbols-outlined outline outline-1 m-4 rounded p-2 md:hidden">
        <Link to="/allworkout">arrow_back</Link>
      </button>
    </div>
  );
};

export default SingleWorkout;
