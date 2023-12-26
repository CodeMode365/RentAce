"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  setLoggedIn,
  setLoggedOut,
  setUserInfo,
} from "../redux/slices/globalSetting";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.globalSetting);

  useEffect(() => {
    async function authenticate() {
      try {
        if (window) {
          if (localStorage.getItem("token")) {
            if (localStorage.getItem("isAuthorized")) {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/my-info`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              const response = await res.json();
              if (!res.ok) {
                localStorage.clear();
                dispatch(setLoggedOut());
                return;
              }
              dispatch(setLoggedIn());
              dispatch(setUserInfo({ userInfo: response }));
            }
          }
        }
      } catch (error) {
        localStorage.clear();
        dispatch(setLoggedOut());
      }
    }
    authenticate();
  }, [isLoggedIn]);

  return <>{children}</>;
};

export default AuthProvider;
