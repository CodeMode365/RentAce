import { getSingleSpace } from "@/actions/SpaceActions";
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
import { ISpace } from "@/types/space";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactTimeago from "react-timeago";

import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import FullImage from "@/components/reusables/FullImage";
import { FaStar } from "react-icons/fa";
import CommentSection from "./CommentSection";
import ProviderInfo from "./ProviderInfo";

export function DetailSpaceView({
  children,
  spaceId,
  setIsDetailView,
  isDetailView,
}: {
  children: React.ReactNode;
  spaceId: string;
  isDetailView: boolean;
  setIsDetailView: Dispatch<SetStateAction<boolean>>;
}) {
  const [spaceData, setSpaceData] = useState<ISpace>();

  const getDetails = () => {
    if (isDetailView) {
      getSingleSpace(spaceId, true)
        .then((res) => {
          setSpaceData(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  useEffect(() => {
    getDetails();
    console.log(spaceData?.images);
  }, [isDetailView]);
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent
          className="sm:max-w-[525px] max-h-[80vh] overflow-y-auto"
          onCloseAutoFocus={() => {
            setIsDetailView(false);
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-sky-500">
              {spaceData?.title}
            </DialogTitle>
            <DialogDescription className="text-sm">
              {spaceData?.desc}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-x-4 gap-y-0 py-4 border-y ">
            <h3 className="text-sky-500">
              Type:{" "}
              <span className="text-gray-500">{spaceData?.spaceType}</span>
            </h3>
            <h3 className="text-sky-500">
              Price:{" "}
              <span className="text-gray-500">
                {`${spaceData?.amount} (${spaceData?.payType})`}{" "}
              </span>
            </h3>
            <h3 className="text-sky-500">
              Owner:{" "}
              <span className="text-gray-500">
                {`${spaceData?.ownerName}`}{" "}
              </span>
            </h3>
            <h3 className="text-sky-500 flex items-center">
              <span className="mr-2">Total Rating: </span>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((rate, index) => (
                  <FaStar
                    className="text-yellow-500"
                    size={18}
                    key={index + "rating"}
                  />
                ))}{" "}
                <span className="ml-2">(434)</span>
              </div>
            </h3>
          </div>

          {/* <Card className="p-4 shadow-md max-w-full"> */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={
              spaceData?.images && spaceData?.images?.length > 4 ? 3 : 2
            }
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            style={{ paddingBottom: "14px" }}
            direction="horizontal"
            className={`relative h-52 w-full ${
              !spaceData ||
              (spaceData.images &&
                spaceData?.images?.length <= 0 &&
                "hidden h-0 w-0 p-0 m-0")
            }`}
          >
            {spaceData?.images &&
              spaceData.images.map((img, ind) => (
                <SwiperSlide
                  key={"slider-" + ind}
                  className="rounded-md overflow-hidden w-20 cursor-pointer"
                >
                  <FullImage src={img.imageUrl} title="Full image">
                    <Image
                      fill
                      sizes=""
                      src={img?.imageUrl}
                      alt="Image"
                      className="object-cover hover:scale-110 hover:brightness-50 brightness-75 transition-all z-[200]"
                    />
                  </FullImage>
                </SwiperSlide>
              ))}
          </Swiper>
          <CommentSection />

          <div>
            <h3>
              Created by: <span>{`${spaceData?.creator?.username}`} </span>
            </h3>
            <h3>
              <ReactTimeago date={spaceData?.createdAt as Date} />
            </h3>
            <ProviderInfo />
          </div>
          <DialogFooter>
            <Button variant={"destructive"}>Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
