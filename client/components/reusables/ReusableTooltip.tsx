import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

const ReusableTooltip = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
};

export default ReusableTooltip;
