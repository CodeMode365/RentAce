"use client";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { closeLogoutModal } from "@/lib/redux/slices/modal";
import { setLoggedOut } from "@/lib/redux/slices/globalSetting";

const LogoutModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isLoutoutModalOpen = useSelector(
    (state: RootState) => state.model.isLogoutOpen
  );

  const closeModal = () => {
    dispatch(closeLogoutModal());
  };

  const logOut = () => {
    localStorage.clear();
    dispatch(closeLogoutModal());
    dispatch(setLoggedOut());
  };

  return (
    <div
      className={`${
        isLoutoutModalOpen ? "block" : "hidden"
      } min-w-[300px] w-auto min-h-[100px] h-auto z-[99] absolute top-10 left-1/2 -translate-x-1/2 bg-white rounded-md px-3 shadow-lg`}
    >
      <div className="m-1">
        <h3 className="mt-2 font-[400] text-md text-rose-500">Logout</h3>
        <p className="text-[13px] text-slate-600 mb-2">
          Are you sure you want to logout?
        </p>
        <div className="max-w-min ml-auto flex mb-3">
          <Button
            size="sm"
            variant={"secondary"}
            className="mx-1 border text-xs py-0"
            onClick={() => closeModal()}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            variant={"destructive"}
            className="mx-1 text-xs py-0 border"
            onClick={() => {
              logOut();
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
