import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import clsx from "clsx";

const SettingsModal = () => {
  const isThisModalOpen = useSelector(
    (state: RootState) => state.model.isSettingsModalOpen
  );

  return (
    <div
      className={clsx(
        `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md   bg-white rounded-mdshadow-lg drop-shadow-md transition-all z-[100] p-4`,
        !isThisModalOpen && "hidden"
      )}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h2 className=" border-b shadow-sm font-medium text-sky-500 pb-1 p-2 text-2xl">
        Settings
      </h2>
      <Tabs defaultValue="account" className="w-[400px] z-[101]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Account</CardTitle>
              <CardDescription className="text-sm leading-5">
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-sky-500 hover:bg-sky-600">
                Save changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Password</CardTitle>
              <CardDescription className="text-sm">
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-sky-500 hover:bg-sky-600">
                Save password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsModal;
