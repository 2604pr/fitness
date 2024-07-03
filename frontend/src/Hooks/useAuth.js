import { useSelector } from "react-redux";

const useAuth = () => {
  const register = useSelector((state) => state.authentication.register);
  const login = useSelector((state) => state.authentication.login);
  const isLoggedIn = !!register || !!login;
  return { isLoggedIn };
};

export default useAuth;
