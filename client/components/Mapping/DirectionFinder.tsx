import React, { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GrWaypoint } from "react-icons/gr";

interface iProps {
  startFindingDirection: VoidFunction;
  isLoading: boolean;
}

const DirectionFinder: FC<iProps> = ({ isLoading, startFindingDirection }) => {
  return (
    <>
      <Tooltip>
        <TooltipTrigger
          className="absolute top-[70px] right-4 text-sm bg-secondary text-primary-foreground hover:bg-secondary/90 h-10 px-4 py-2 rounded-full shadow-lg "
          disabled={isLoading}
          onClick={startFindingDirection}
        >
          <GrWaypoint
            size={12}
            className={`${
              !isLoading
                ? "text-rose-500 cursor-pointer"
                : "text-gray-500 cursor-not-allowed"
            }`}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Find Direction</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
};

export default DirectionFinder;
