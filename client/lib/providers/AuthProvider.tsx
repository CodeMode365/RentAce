"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.globalSetting.isLoggedIn
  );

  if (isLoggedIn) {
    return <>{children}</>;
  }
};

export default AuthProvider;
