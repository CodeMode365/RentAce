import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useSettings from "@/hooks/useSetting";
import { error } from "console";
import React, { useState } from "react";
import toast from "react-hot-toast";

const initial = {
  old: "",
  new: "",
  retype: "",
};

const PasswordTab = () => {
  const { updatePassword } = useSettings();
  const [password, setPassword] = useState(initial);

  const handleSubmit = async () => {
    console.log(password);
    if (password.new !== password.retype) {
      toast.error("The new passwords doesn't match!");
    } else {
      await updatePassword(password.old, password.new)
        .then((res) => {
          setPassword(initial);
        })
        .catch((err) => toast.error(err.message));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="">Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="password"
          placeholder="Old password"
          className="my-4"
          value={password.old}
          onChange={(e) => setPassword({ ...password, old: e.target.value })}
        />
        <Input
          placeholder="New password"
          className="my-4"
          value={password.new}
          onChange={(e) => setPassword({ ...password, new: e.target.value })}
          type="password"
        />
        <Input
          placeholder="Confirm New Password"
          className="my-4"
          value={password.retype}
          onChange={(e) => setPassword({ ...password, retype: e.target.value })}
          type="password"
        />
      </CardContent>
      <CardFooter className="w-full">
        <Button
          className="ml-auto"
          onClick={() => {
            handleSubmit();
          }}
        >
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PasswordTab;
