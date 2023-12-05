import React from "react";
import Header from "../reusable/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import GeneralTab from "./tabs/GeneralTab";
import NotificationTab from "./tabs/NotificationTab";
import PasswordTab from "./tabs/PasswordTab";

const Settings = () => {
  return (
    <div className="w-full h-full p-4 overflow-y-auto absolute ">
      <Header title="Settings" />

      <Tabs defaultValue="general" className=" my-4 mx-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notification">Notificaitons</TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
        </TabsList>
        <TabsContent
          value="general"
          className="w-full grid grid-cols-12 gap-4 p-2 my-4 px-6"
        >
          <GeneralTab />
        </TabsContent>
        <TabsContent value="notification">
          <NotificationTab />
        </TabsContent>

        <TabsContent value="password">
          <PasswordTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
