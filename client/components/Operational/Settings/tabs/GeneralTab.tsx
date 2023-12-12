import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const GeneralTab = () => {
  return (
    <>
      <Card className="col-span-4 h-80">
        <CardContent className="">
          <Avatar className="mx-auto mt-10 shadow-md h-32 w-32 ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="text-center w-full mt-4 mx-auto">
            <h2 className="text-xl font-medium text-gray-600">Ramesh Paudel</h2>
            <span className="text-sm text-gray-500">Senior Dev on RentAce</span>
          </div>

          <div className="text-center w-full mt-4 flex items-center justify-center">
            <Switch id="public-profile" className="mr-4" />
            <Label htmlFor="public-profile m">Public Profile</Label>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-8">
        <CardHeader>
          <CardTitle>General Info</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you&apos;re done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-4 ">
            <div className="space-y-1 col-span-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="e.g. Ramesh Poudel" />
            </div>
            <div className="space-y-1 col-span-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="e.g. rameshpoudel@xyz.com" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="space-y-1 col-span-1">
              <Label htmlFor="phone">Phone no.</Label>
              <Input id="phone" placeholder="e.g. 98xxxxxxx" />
            </div>
            <div className="space-y-1 col-span-1">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="e.g. Katmandu, Nepal" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="space-y-1 col-span-1">
              <Label htmlFor="country">Country</Label>
              <Input id="country" placeholder="e.g. Nepal" />
            </div>
            <div className="space-y-1 col-span-1">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="e.g. Bagmati" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="space-y-1 col-span-1">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="e.g Kathmandu" />
            </div>
            <div className="space-y-1 col-span-1">
              <Label htmlFor="zip">Zip code</Label>
              <Input id="zip" placeholder="e.g. 42600" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <Textarea
              className="col-span-2 min-h-[80px]"
              placeholder="Bio here"
            />
          </div>
        </CardContent>
        <CardFooter className="w-full">
          <Button className="ml-auto">Save changes</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default GeneralTab;
