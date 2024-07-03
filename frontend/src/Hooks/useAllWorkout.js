import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//redux slices
import { allWorkouts } from "../redux/workoutSlice";

const useAllWorkout = () => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const fetchWorkoutsData = async () => {
        const result = await fetch("/workout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await result.json();
        dispatch(allWorkouts(data));
      };
      fetchWorkoutsData();
    }
  }, [dispatch]);

  return isAuthenticated;
};

export default useAllWorkout;
