import React from "react";
import Header from "../reusable/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Book, Heart, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Scatter } from "react-chartjs-2";
import Charts from "../Home/Charts";

const Profile = () => {
  return (
    <div className="w-full h-full p-4 overflow-y-auto absolute ">
      <Header title="Profile" />
      <div className="w-full p-2 my-4 px-6 ">
        <Card className="relative bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-500">
          <CardContent className="">
            <div className="flex items-center min-w-max mt-10 ">
              <Avatar className="mr-4  shadow-md h-32 w-32 z-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-medium -mb-1 text-gray-800">
                  Pabin B. Dhami
                </h2>
                <span className="text-sm text-gray-600 font-normal">
                  Random text for testing only
                </span>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 h-14 flex px-4 bg-sky-50 w-full justify-end items-end">
              <div className="flex py-2g">
                <h3 className="mx-2 my-2 flex">
                  <User size={24} />
                  <span className="mx-1">Profile</span>
                </h3>
                <h3 className="mx-2 my-2 flex ">
                  <Heart size={24} />
                  <span className="mx-1">Followers</span>
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-12 mt-4 gap-4">
          <Card className="col-span-4">
            <CardContent className="flex justify-evenly items-center mt-4">
              <div className="text-center ">
                <h2 className="text-lg font-medium text-gray-600">2,434</h2>
                <span className="text0sm font-normal text-gray-500">
                  Followers
                </span>
              </div>
              <div className="text-center ">
                <h2 className="text-lg font-medium text-gray-600">43,434</h2>
                <span className="text0sm font-normal text-gray-500">
                  Spaces
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className=" col-span-8"></Card>
        </div>

        <div className=" mt-4">
          <Charts />
        </div>
      </div>
    </div>
  );
};

export default Profile;
