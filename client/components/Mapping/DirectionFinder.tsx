import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IPin } from "@/lib/pins";
import axios from "axios";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { GrWaypoint } from "react-icons/gr";
import { useMap } from "react-map-gl";

interface iProps {
  startFindingDirection: VoidFunction;
  isLoading: boolean;
}

const DirectionFinder: FC<iProps> = ({ isLoading, startFindingDirection }) => {
  return (
    <>
      <Tooltip>
        <TooltipTrigger
          className="absolute top-10 right-5 text-sm bg-transparent"
          disabled={isLoading}
        >
          <GrWaypoint
            size={24}
            className={`${
              !isLoading
                ? "text-rose-500 cursor-pointer"
                : "text-gray-500 cursor-not-allowed"
            }`}
            onClick={startFindingDirection}
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
