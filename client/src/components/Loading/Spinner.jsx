import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <span className="loading loading-infinity text-primary w-20"></span>
    </div>
  );
};

export default Spinner;
