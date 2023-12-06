import React, { FC } from "react";
import { Button } from "../ui/button";
import { FaCloudSun } from "react-icons/fa";
import { FaCloudMoon } from "react-icons/fa";

interface iProps {
  isDay: boolean;
  setIsDay: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleMode: FC<iProps> = ({ isDay, setIsDay }) => {
  const handleTogglMode = () => {
    setIsDay(!isDay);
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  };
  return (
    <Button
      onClick={() => handleTogglMode()}
      className="absolute z-50 right-4 top-[118px] rounded-full text-sky-600"
      variant={"secondary"}
    >
      {isDay ? <FaCloudMoon size={12} /> : <FaCloudSun size={12} />}
    </Button>
  );
};

export default ToggleMode;
