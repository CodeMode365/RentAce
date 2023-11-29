import { Button } from "@/components/ui/button";
import React, { FC, useState } from "react";

interface iProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const Step3: FC<iProps> = ({ setCurrentStep }) => {
  return (
    <div className="grid gap-4 py-4 translate-x-[200%]  min-w-full">
      <strong>Step3</strong>
      <div className="w-full flex justify-between items-center">
        <Button
          className=" bg-sky-500 shadow-xl font-normal text-white hover:bg-sky-500 hover:text-white"
          size={"sm"}
          variant={"secondary"}
          onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
        >
          Prev
        </Button>
      </div>
    </div>
  );
};

export default Step3;
