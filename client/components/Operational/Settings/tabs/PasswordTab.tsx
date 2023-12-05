import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

const PasswordTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="">Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Old password" className="my-4" />
        <Input placeholder="New password" className="my-4" />
        <Input placeholder="Confirm New Password" className="my-4" />
      </CardContent>
      <CardFooter className="w-full">
        <Button className="ml-auto">Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default PasswordTab;
