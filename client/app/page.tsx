import Mapbox from "@/components/Mapping/Mapbox";
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
      <div>
        <Mapbox />
      </div>
    </>
  );
};

export default Home;
