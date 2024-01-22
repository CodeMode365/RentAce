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
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

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
  const { userInfo } = useSelector((state: RootState) => state.globalSetting);

  const [currentStep, setCurrentStep] = useState(0);
  const stepWrapperRef = useRef<HTMLDivElement | null>(null);

  const intialData: iSpaceData = {
    title: "",
    owner: userInfo?.username ?? "",
    spaceType: "",
    amount: "",
    payType: "",
    description: "",
    images: [],
  };

  const [data, setData] = useState<iSpaceData>(intialData);
  const [actualImages, setActualImages] = useState<iAcutalImages[]>([]);

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
        setActualImages([]);
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
              actualImages={actualImages}
              setActualImages={setActualImages}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
