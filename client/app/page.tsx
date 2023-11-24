import Mapbox from "@/components/Mapping/Mapbox";
import AuthModal from "@/components/Modal/AuthModal";
import LogoutModal from "@/components/Modal/LogoutModal";
import OptionBar from "@/components/OptionBar";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";

const Home = () => {
  return (
    <>
      <TopBar />
      <OptionBar />
      <Sidebar />

      <AuthModal />

      <LogoutModal />
      <div>
        <Mapbox />
      </div>
    </>
  );
};

export default Home;
