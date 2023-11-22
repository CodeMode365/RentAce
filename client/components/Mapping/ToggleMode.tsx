import React, { FC } from "react";
import { Button } from "../ui/button";
import { FaCloudSun } from "react-icons/fa";
import { FaCloudMoon } from "react-icons/fa";

interface iProps {
  isDay: boolean;
  setIsDay: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleMode: FC<iProps> = ({ isDay, setIsDay }) => {
  return (
    <Button onClick={() => setIsDay(!isDay)} className="absolute z-50 right-5 top-[88px]">
      {isDay ? <FaCloudMoon size={12}/> : <FaCloudSun size={12}/>}
    </Button>
  );
};

export default ToggleMode;
