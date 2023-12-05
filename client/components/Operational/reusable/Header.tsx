import React, { FC } from "react";

interface iProps {
  title?: string;
}

const Header: FC<iProps> = ({ title }) => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const fullDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  } ${hours}:${minutes}:${seconds}`;

  return (
    <header className="flex w-11/12 mx-auto justify-between border-b py-2">
      <div className="">
        <h2 className="text-md font-normal">{title}</h2>
      </div>
      <div>
        <span className="text-xs">{fullDate}</span>
      </div>
    </header>
  );
};

export default Header;
