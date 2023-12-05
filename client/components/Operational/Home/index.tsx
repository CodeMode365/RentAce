import React from "react";
import InfoCard from "./InfoCard";

import Header from "./Header";
import Charts from "./Charts";
import TableData from "./TableData";

const Home = () => {
  return (
    <div className="w-full h-full p-4 overflow-y-auto absolute ">
      <Header />

      <div className="w-full grid grid-cols-8 gap-4 p-2 my-4 px-6">
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
      </div>

      <Charts />

      <TableData />
    </div>
  );
};

export default Home;
