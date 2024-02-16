import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { useCallback } from "react";

const ProtextedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate("/Auth", { state: { msg, redirect } });
    }
  }, [user]);

  return children;
};

export default ProtextedRoute;
