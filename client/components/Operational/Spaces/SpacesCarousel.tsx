import React from "react";

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
import FullImage from "@/components/reusables/FullImage";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import AlertModal from "@/components/Modal/AlertModal";

const SpacesCarousel = () => {
  return (
    <Card className="p-4 shadow-md">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        style={{ paddingBottom: "14px" }}
      >
        {Array.from({ length: 10 }).map((_, ind) => (
          <SwiperSlide
            key={"slider-" + ind}
            className="rounded-md overflow-hidden"
          >
            <div className="cursor-pointer h-40 min-w-max bg-sky-100 rounded-lg flex items-center justify-center overflow-hidden ">
              <AlertModal>
                <button className="z-[2] rounded-full text-rose-500 bg-white/80 absolute bottom-2 right-2 p-2 hover:bg-rose-500 hover:text-white transition-all">
                  <Trash2 size={18} />
                </button>
              </AlertModal>

              <div className="z-[2]">
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
                  className="object-cover hover:scale-110 hover:brightness-50 brightness-75 transition-all z-[1]"
                />
              </FullImage>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  );
};

export default SpacesCarousel;
