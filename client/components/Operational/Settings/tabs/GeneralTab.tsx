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
import React, { useEffect, useState } from "react";
import {
  getUserInfo,
  submitUserUpdateForm,
  updateUserInfo,
} from "@/actions/UserAction";
import { IUser, IUserInfo } from "@/types/user";
import useAuthKey from "@/hooks/useAuthKey";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { getAuthToken } from "@/actions/AuthActions";

const GeneralTab = () => {
  const token = useAuthKey();

  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>();
  const userData: IUser | undefined = useSelector(
    (state: RootState) => state.globalSetting.userInfo
  );

  const handleSwitchToggle = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const fetchUserInfo = async () => {
    await getUserInfo(token)
      .then(async (res) => {
        await getAuthToken();
        toast.success(res.message);
        setUserInfo(res.data);
      })
      .then(() => {
        setIsSwitchOn(userInfo?.isPublic);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <>
      <form
        className="col-span-full grid grid-cols-12"
        action={submitUserUpdateForm}
      >
        <Card className="col-span-4 h-80">
          <CardContent className="">
            <Avatar className="mx-auto mt-10 shadow-md h-32 w-32 ">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="text-center w-full mt-4 mx-auto">
              <h2 className="text-xl font-medium text-gray-600">
                Ramesh Paudel
              </h2>
              <span className="text-sm text-gray-500">
                Senior Dev on RentAce
              </span>
            </div>

            <div className="text-center w-full mt-4 flex items-center justify-center">
              <Switch
                id="public-profile"
                name="public-profile"
                className="mr-4"
                checked={isSwitchOn}
                onChange={handleSwitchToggle}
              />
              <Label htmlFor="public-profile m">Public Profile</Label>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-8">
          <CardHeader>
            <CardTitle>General Info</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re
              done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4 ">
              <div className="space-y-1 col-span-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Ramesh Poudel"
                  defaultValue={userData!.username}
                  disabled
                />
              </div>
              <div className="space-y-1 col-span-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="e.g. rameshpoudel@xyz.com"
                  defaultValue={userData!.email}
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 ">
              <div className="space-y-1 col-span-1">
                <Label htmlFor="phone">Phone no.</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="e.g. 98xxxxxxx"
                  defaultValue={userInfo?.phone ?? undefined}
                />
              </div>
              <div className="space-y-1 col-span-1">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="e.g. Katmandu, Nepal"
                  defaultValue={userInfo?.Address ?? undefined}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 ">
              <div className="space-y-1 col-span-1">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="e.g. Nepal"
                  defaultValue={userInfo?.Country ?? undefined}
                />
              </div>
              <div className="space-y-1 col-span-1">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  placeholder="e.g. Bagmati"
                  defaultValue={userInfo?.State ?? undefined}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 ">
              <div className="space-y-1 col-span-1">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="e.g Kathmandu"
                  defaultValue={userInfo?.City ?? undefined}
                />
              </div>
              <div className="space-y-1 col-span-1">
                <Label htmlFor="zip">Zip code</Label>
                <Input
                  id="zip"
                  name="zip"
                  placeholder="e.g. 42600"
                  defaultValue={userInfo?.Zip ?? undefined}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 ">
              <Textarea
                className="col-span-2 min-h-[80px]"
                placeholder="Bio here"
                defaultValue={userInfo?.Bio ?? undefined}
              />
            </div>
          </CardContent>
          <CardFooter className="w-full">
            <Button className="ml-auto" type="submit">
              Save changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default GeneralTab;
