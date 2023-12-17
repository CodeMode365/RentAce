import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Step1 from "./Steps/Step1";
import { useRef, useState } from "react";
import Step2, { iAcutalImages } from "./Steps/Step2";
import clsx from "clsx";
import { iSpaceData } from "@/types/space";
import { postNewSpace } from "@/actions/SpaceActions";
import useAuthKey from "@/hooks/useAuthKey";
import toast from "react-hot-toast";

const intialData: iSpaceData = {
  title: "",
  owner: "",
  spaceType: "",
  amount: "",
  payType: "",
  description: "",
  images: [],
};

export default function AddSpaceModal({
  children,
  pos,
}: {
  children: React.ReactNode;
  pos: {
    lng: number;
    lat: number;
  };
}) {
  const token = useAuthKey();
  const [currentStep, setCurrentStep] = useState(0);
  const stepWrapperRef = useRef<HTMLDivElement | null>(null);

  const [data, setData] = useState<iSpaceData>(intialData);

  const handleSubmit = (actualImages: iAcutalImages[]) => {
    const {
      amount,
      description: desc,
      owner: ownerName,
      payType,
      spaceType,
      title,
    } = data;
    postNewSpace(
      token,
      {
        amount,
        desc,
        ownerName,
        payType,
        spaceType,
        title,
      },
      actualImages,
      pos
    )
      .then((res) => {
        toast.success(res.message);
        setData(intialData);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

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
          {currentStep == 0 && (
            <Step1
              setCurrentStep={setCurrentStep}
              data={data}
              setData={setData}
            />
          )}
          {currentStep == 1 && (
            <Step2
              setCurrentStep={setCurrentStep}
              data={data}
              setData={setData}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
