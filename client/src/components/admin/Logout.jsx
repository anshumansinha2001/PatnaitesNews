import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const Logout = () => {
  const [dontLogout, setDontLogout] = useState(false);
  const [choiceMade, setChoiceMade] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let userChoice = window.confirm("Do you want to Logout?");
    setChoiceMade(true);
    if (userChoice) {
      const admin = localStorage.getItem("cache");
      if (admin) localStorage.removeItem("cache");
      setDontLogout(false);
    } else {
      setDontLogout(true);
    }
  }, []);

  if (!choiceMade) {
    return null; // or a loading indicator
  }

  return dontLogout ? (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default Logout;
