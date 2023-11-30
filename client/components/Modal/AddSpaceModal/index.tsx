import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Step1 from "./Steps/Step1";
import { useEffect, useRef, useState } from "react";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import clsx from "clsx";

export default function AddSpaceModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const stepWrapperRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   if (stepWrapperRef.current) {
  //     stepWrapperRef.current.style.transform = `translateX(-${
  //       currentStep * 200
  //     }%)`;
  //     console.log("changed modal");
  //   }
  //   console.log(currentStep, currentStep * 200);
  //   setCurrentStep(0);
  // }, [currentStep, setCurrentStep]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-sky-500">Post new Space</DialogTitle>
          <DialogDescription>
            Please provide all the information about the space that you are
            providing to the client.
          </DialogDescription>
        </DialogHeader>

        <div
          ref={stepWrapperRef}
          className={clsx(`flex transition-all w-auto`)}
        >
          {currentStep == 0 && <Step1 setCurrentStep={setCurrentStep} />}
          {currentStep == 1 && <Step2 setCurrentStep={setCurrentStep} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
