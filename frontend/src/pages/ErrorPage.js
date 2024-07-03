import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="text-center mt-10">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="font-bold text-red-600 text-3xl">
          ⚠️ {error.status} {error.statusText}
        </i>
      </p>
    </div>
  );
};

export default ErrorPage;
