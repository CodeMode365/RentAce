"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setLoggedIn } from "../redux/slices/globalSetting";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (window) {
      if (localStorage.getItem("token")) {
        if (localStorage.getItem("isAuthorized")) {
          dispatch(setLoggedIn());
        }
      }
    }
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
