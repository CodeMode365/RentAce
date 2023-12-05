import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";

const NotificationTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="">Notification Settings</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="">
          <h2 className="mt-4">Activity</h2>
          <div className="">
            <span className="text-center w-full mt-4 flex items-center">
              <Switch id="email-on-comment" className="mr-4" />
              <Label htmlFor="email-on-comment">
                Email me when someone coments
              </Label>
            </span>
            <span className="text-center w-full mt-4 flex items-center">
              <Switch id="email-on-follow" className="mr-4" />
              <Label htmlFor="email-on-follow">
                Email me when someone follows me
              </Label>
            </span>
            <span className="text-center w-full mt-4 flex items-center">
              <Switch id="email-on-message" className="mr-4" />
              <Label htmlFor="email-on-message">
                Email me when someone message me
              </Label>
            </span>
          </div>
        </div>

        <div className="">
          <h2 className="mt-4">Application</h2>
          <div className="">
            <span className=" w-full mt-4 flex items-center">
              <Switch id="news-announcements" className="mr-4" />
              <Label htmlFor="news-announcements">News and announcements</Label>
            </span>
            <span className="text-center w-full mt-4 flex items-center">
              <Switch id="request-approvals" className="mr-4" />
              <Label htmlFor="request-approvals">Something gets approved</Label>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationTab;
