import React, { FC } from "react";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";
import dynamic from "next/dynamic";

const ReusableTooltip = dynamic(() => import("../reusables/ReusableTooltip"), {
  ssr: true,
});

interface iProps {
  onClick: VoidFunction;
}

const RefetchData: FC<iProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="absolute z-20 right-4 top-[172px] rounded-full text-sky-600 h-11 w-11 shadow-lg"
      variant={"secondary"}
    >
      <ReusableTooltip content={<p>Refresh data</p>}>
        <RefreshCw size={16} className="rounded-full"/>
      </ReusableTooltip>
    </Button>
  );
};

export default RefetchData;
