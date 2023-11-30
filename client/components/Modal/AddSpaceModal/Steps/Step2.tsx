import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageDown, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Controller,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Input } from "@/components/ui/input";
import FullImage from "@/components/reusables/FullImage";

interface iProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const Step2: FC<iProps> = ({ setCurrentStep }) => {
  const [images, setImages] = useState<FileList | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    console.log(images);
    setImages((prev) =>
      prev ? ((prev as FileList).length > 0 ? prev : files) : files
    );

    const selectedImage = e.target.files?.[0];

    if (selectedImage) {
      // Create a preview URL for the selected image
      const imageURL = URL.createObjectURL(selectedImage);
      setPreviews((prev) => [...prev, imageURL]);
    }
  };

  return (
    <div className="grid gap-4 py-4  min-w-full">
      <h2 className="font-medium text-sky-500">Extra Info</h2>

      <div className="">
        <Label className="text-left">Description</Label>
        <Textarea
          placeholder="Describe your space here..."
          className="col-span-4 mt-4"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-left block col-span-4">Images</Label>
        <div className="col-span-4">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
            spaceBetween={10}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            style={{
              paddingBottom: "14px",
              gridColumn: "span 4/ span 4",
            }}
          >
            <SwiperSlide>
              <div className="relative h-40 min-w-max bg-sky-100 rounded-lg flex items-center justify-center overflow-hidden flex-col">
                <Label htmlFor="newImage" className="cursor">
                  <Input
                    type="file"
                    id="newImage"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <ImageDown
                    className="text-sky-400 mb-2 cursor-pointer"
                    size={40}
                  />
                  <span className="text-sky-400 text-center cursor-pointer">
                    Upload
                  </span>
                </Label>
              </div>
            </SwiperSlide>

            {[...previews.toReversed()].map((prevu, ind) => (
              <SwiperSlide key={"new-space-slide" + ind}>
                <div className="relative cursor-pointer h-40 min-w-max bg-sky-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <button className="z-20 rounded-full text-rose-500 bg-white/80 absolute bottom-2 right-2 p-2 hover:bg-rose-500 hover:text-white transition-all">
                    <Trash2 size={18} />
                  </button>
                  <FullImage src={prevu} title={"Full screen View"}>
                    <Image
                      fill
                      src={prevu}
                      alt="Image"
                      className="object-cover hover:scale-110 hover:brightness-50 brightness-75 transition-all z-10"
                    />
                  </FullImage>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="w-full flex justify-between items-center">
        <Button
          className=" bg-sky-500 shadow-xl font-normal text-white hover:bg-sky-500 hover:text-white"
          size={"sm"}
          variant={"secondary"}
          onClick={() => setCurrentStep((prevStep) => 0)}
        >
          Prev
        </Button>
        <Button
          className=" bg-sky-500 shadow-xl font-normal text-white hover:bg-sky-500 hover:text-white"
          size={"sm"}
          variant={"secondary"}
          // onClick={() => setCurrentStep((prevStep) => prevStep + 1)}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Step2;