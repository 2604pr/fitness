import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useSingleWorkout = (id) => {
  const [workout, setWorkout] = useState(null);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.authentication);

  useEffect(() => {
    const fetchWorkout = async () => {
      if (!user) {
        setError("User not logged in");
        return;
      }

      try {
        const response = await fetch("/workout/" + id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (!response.ok) {
          setError(json.error);
        } else {
          setWorkout(json);
        }
      } catch (err) {
        setError("An error occurred while fetching the workout data.");
      }
    };

    fetchWorkout();
  }, [id]);

  return { workout, error };
};

export default useSingleWorkout;
