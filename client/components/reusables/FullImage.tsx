import Image from "next/image";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

const FullImage = ({
  children,
  src,
  title,
}: {
  children: React.ReactNode;
  src: string;
  title: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-h-[80vh] w-auto max-w-[70vw] overflow-hidden bg-transparent shadow-none border-none pt-10">
        <Image
          width={400}
          height={400}
          src={src}
          alt={`${title} full image`}
          className="object-contain h-full w-full"
        />
      </DialogContent>
    </Dialog>
  );
};

export default FullImage;
