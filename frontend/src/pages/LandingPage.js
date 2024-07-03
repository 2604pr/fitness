import React from "react";
import { MainPageBg } from "../utils/constants";

const LandingPage = () => {
  return (
    <div className="relative">
      <img
        src={MainPageBg}
        alt="landingPageBackgroundImage"
        className="w-full h-auto"
      />
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <h1 className="text-white font-bold text-4xl bg-black bg-opacity-50 p-4 rounded">
          Get Result You Can See And Feel.
        </h1>
      </div>
    </div>
  );
};

export default LandingPage;
