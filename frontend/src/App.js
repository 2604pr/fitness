import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

//components and pages
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import FootBar from "./components/FootBar";
import SingleWorkout from "./pages/SingleWorkout";
import ErrorPage from "./pages/ErrorPage";
import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/UserLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const AppComponent = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <FootBar />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppComponent />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/allworkout",
        element: (
          <ProtectedRoute redirectTo="/user/register">
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/allworkout/:id",
        element: (
          <ProtectedRoute redirectTo="/user/register">
            <SingleWorkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user/register",
        element: (
          <PublicRoute redirectTo="/allworkout">
            <UserRegister />
          </PublicRoute>
        ),
      },
      {
        path: "/user/login",
        element: (
          <PublicRoute redirectTo="/allworkout">
            <UserLogin />
          </PublicRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
