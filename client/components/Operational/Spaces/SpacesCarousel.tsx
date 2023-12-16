import React, { useEffect, useState } from "react";

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
import { RotateCcw, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import AlertModal from "@/components/Modal/AlertModal";
import { Button } from "@/components/ui/button";
import { deleteSpace, getMySpaces } from "@/actions/SpaceActions";
import useAuthKey from "@/hooks/useAuthKey";
import toast from "react-hot-toast";
import {
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialog,
} from "@/components/ui/alert-dialog";
import { ISpace } from "@/types/space";
import { toPascalCase } from "@/lib/utilities/toPascalCase";
import ReusableTooltip from "@/components/reusables/ReusableTooltip";

const SpacesCarousel = () => {
  const token = useAuthKey();
  const [mySpaces, setMySpaces] = useState<ISpace[]>([]);

  const getSpaces = () => {
    getMySpaces(token)
      .then((res) => {
        toast.success(res.message);
        console.log(res.data);
        setMySpaces(res.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleDeleteSpace = (spaceId: string) => {
    deleteSpace(token, spaceId)
      .then((res) => {
        toast.success(res.message);
        getSpaces();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    getSpaces();
  }, []);
  return (
    <Card className="p-4 shadow-md">
      <Button
        onClick={() => {
          getSpaces();
        }}
        size={"icon"}
        variant={"secondary"}
        className="mb-2"
      >
        <ReusableTooltip content={<p>Refetch spaces</p>}>
          <RotateCcw className="focus-within:scale-105" />
        </ReusableTooltip>
      </Button>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        style={{ paddingBottom: "14px" }}
      >
        {mySpaces.length > 0 &&
          mySpaces.map((spc, ind) => (
            <SwiperSlide
              key={"slider-" + ind}
              className="rounded-md overflow-hidden"
            >
              <div className="cursor-pointer h-40 min-w-max bg-sky-100 rounded-lg flex items-center justify-center overflow-hidden ">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="z-[2] rounded-full text-rose-500 bg-white/80 absolute bottom-2 right-2 p-2 hover:bg-rose-500 hover:text-white transition-all">
                      <Trash2 size={18} />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Delete?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the space and once deleted the space info cannot
                        be retrived again.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-rose-500 hover:bg-rose-500"
                        onClick={() => handleDeleteSpace(spc.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <div className="z-[2]">
                  <h3 className="font-semibold text-white">
                    {toPascalCase(spc.title)}
                  </h3>
                  <p className="text-xs text-center text-white">
                    {spc.desc.slice(0, 15)}...
                  </p>
                </div>
                {spc.images && (
                  <FullImage src={spc?.images[0]?.imageUrl} title="Full image">
                    <Image
                      fill
                      src={spc?.images[0]?.imageUrl}
                      alt="Image"
                      className="object-cover hover:scale-110 hover:brightness-50 brightness-75 transition-all z-[1]"
                    />
                  </FullImage>
                )}
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </Card>
  );
};

export default SpacesCarousel;
