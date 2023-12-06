import React from "react";
import Header from "../reusable/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import InfoCard from "../Home/InfoCard";
import SpacesModal from "@/components/Modal/SpacesModal";
import SpacesCarousel from "./SpacesCarousel";
import { Button } from "@/components/ui/button";
import TableData from "../Home/TableData";

const Spaces = () => {
  return (
    <div className="w-full h-full p-4 overflow-y-auto absolute ">
      <Header title="Spaces" />

      <div className="w-full grid grid-cols-8 gap-6 p-2 my-4 px-6">
        <Card className="col-span-5 h-40 flex items-center justify-center">
          <CardHeader>
            <CardTitle>
              Welcome back! <br />
              Pabin B. Dhami
            </CardTitle>
            <CardDescription>
              Now you can post new spaces from here!
              <Button className="-mb-4 my-2">Post Space</Button>
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <Image
              src="/icons/post-icon.svg"
              alt="Posting icon"
              height={200}
              width={200}
            />
          </CardContent>
        </Card>
        <Card className="col-span-3 h-40 ">
          <Skeleton className="w-full h-full" />
        </Card>
      </div>

      <div className="w-full grid grid-cols-8 gap-6 p-2 my-4 px-6">
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
      </div>

      <div className="w-full p-2 my-4 px-6">
        <SpacesCarousel />
      </div>

      <TableData />
    </div>
  );
};

export default Spaces;
