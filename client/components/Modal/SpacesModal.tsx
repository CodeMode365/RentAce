import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Controller,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import clsx from "clsx";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setIsAddingPin } from "@/lib/redux/slices/globalSetting";
import FullImage from "../reusables/FullImage";

const SpacesModal = () => {
  const dispatch = useDispatch();

  const startAddingPin = () => {
    dispatch(setIsAddingPin());
  };
  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={clsx(
          `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md  bg-white rounded-mdshadow-lg w-[650px] drop-shadow-md transition-all h-auto`
        )}
      >
        <div className="relative p-4 ">
          <h2 className=" border-b shadow-sm font-medium text-2xl text-sky-500 pb-1">
            Activities
          </h2>

          <div className="py-2 max-w-max px-4 mx-auto">
            <h3 className="text-xl text-rose-500 font-medium text-center shadow-lg">
              Your Spaces
            </h3>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
            spaceBetween={10}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log("slide change")}
            style={{ paddingBottom: "14px" }}
          >
            {Array.from({ length: 10 }).map((_, ind) => (
              <SwiperSlide key={"slider-" + ind}>
                <div className="relative cursor-pointer h-40 min-w-max bg-sky-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <button className="z-20 rounded-full text-rose-500 bg-white/80 absolute bottom-2 right-2 p-2 hover:bg-rose-500 hover:text-white transition-all">
                    <Trash2 size={18} />
                  </button>
                  <div className="z-20">
                    <h3 className="font-semibold text-white">
                      Parking Space {ind + 1}
                    </h3>
                    <p className="text-xs text-center text-white">
                      Sanothimi, Kathmandu
                    </p>
                  </div>
                  <FullImage
                    src="https://ik.imagekit.io/ParkingManagement/pexels-natasha-filippovskaya-4665699_H98ERhCQJ.jpg?updatedAt=1700900379518"
                    title="Full image"
                  >
                    <Image
                      fill
                      src="https://ik.imagekit.io/ParkingManagement/pexels-natasha-filippovskaya-4665699_H98ERhCQJ.jpg?updatedAt=1700900379518"
                      alt="Image"
                      className="object-cover hover:scale-110 hover:brightness-50 brightness-75 transition-all z-10"
                    />
                  </FullImage>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="">
            <p className="text-sm text-gray-600">
              <span className="text-sky-500">Note:</span> Please don&apos;t
              register the fake spaces.{" "}
            </p>
            <Button
              size={"sm"}
              className="float-right my-2 bg-sky-500 hover:bg-sky-600"
              onClick={() => startAddingPin()}
            >
              Add more
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpacesModal;
