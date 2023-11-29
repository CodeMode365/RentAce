import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Step1 from "./Steps/Step1";
import { useEffect, useState } from "react";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";

export default function AddSpaceModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    console.log(currentStep, currentStep * 200);
  }, [currentStep, setCurrentStep]);

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
          className={`flex  transition-all -translate-x-[${
            Number(currentStep) * 200
          }%]`}
        >
          <Step1 setCurrentStep={setCurrentStep} />
          <Step2 setCurrentStep={setCurrentStep} />
          <Step3 setCurrentStep={setCurrentStep} />
        </div>
        {/* 
        {currentStep === 2 && (
          <DialogFooter>
            <Button
              type="submit"
              className="w-full border-sky-500 border text-sky-500 shadow-xl hover:bg-sky-500 hover:text-white"
              size={"sm"}
              variant={"secondary"}
            >
              Post Space
            </Button>
          </DialogFooter>
        )} */}
      </DialogContent>
    </Dialog>
  );
}
