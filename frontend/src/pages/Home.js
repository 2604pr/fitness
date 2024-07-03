import React from "react";
import { useSelector } from "react-redux";

//components
import WorkoutDetails from "../components/WorkoutDetails";
import AddWorkout from "../components/AddWorkout";

//custom hooks
import useAllWorkout from "../Hooks/useAllWorkout";

const Home = () => {
  useAllWorkout();
  const fullWorkouts = useSelector((store) => store.workout.getWorkouts);

  return (
    <div className="p-10 md:grid md:grid-cols-12">
      <div className="md:col-span-7">
        {fullWorkouts && fullWorkouts.length > 0 ? (
          fullWorkouts.map((workout) => (
            <WorkoutDetails key={workout._id} data={workout} />
          ))
        ) : (
          <h1 className="font-bold text-blue-700 md:m-4 text-center">
            No workouts available.
          </h1>
        )}
      </div>
      <AddWorkout />
    </div>
  );
};

export default Home;
