"use client";

import React, { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthInput, { inputProps } from "@/components/reusables/AuthInput";

import useMedia from "@/hooks/useMedia";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "@/lib/redux/slices/globalSetting";
import { Auth } from "@/actions/AuthActions";

export default function AuthModal() {
  const { uploadMedia } = useMedia();
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState<File | null>();

  const fromSchema = z
    .object({
      username: z.string().min(1, "Username is required").max(50).optional(),
      email: z.string().email("Invalid email").min(1, "Email is required"),
      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must have more that 8 characters"),
      confirmPassword: z
        .string()
        .min(1, "Please confirm the password")
        .optional(),
    })
    .refine(
      (data) => {
        if (!isLogin) {
          if (data.username && data.confirmPassword) {
            return data.password === data.confirmPassword;
          }
        }
        return true;
      },
      {
        path: ["confirmPassword"],
        message: "Passwords don't match",
      }
    );

  type FormSchemaType = z.infer<typeof fromSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({ resolver: zodResolver(fromSchema) });

  const resetForm = useCallback(() => {
    reset();
  }, [reset]);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    const { username, email, password } = data;
    if (!isLogin) await uploadMedia(image);

    await Auth({ username, email, password, isLogin })
      .then((res) => {
        console.log(res, "responded");
        toast.success(`Successfully ${isLogin ? "Logged In" : "Registered"}!`);
        localStorage.setItem("token", res.token);
        localStorage.setItem("isAuthorized", JSON.stringify(true));
        setTimeout(() => {
          dispatch(setLoggedIn());
        }, 1000);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const InputList: (inputProps & { registerOnly: boolean })[] = [
    {
      id: "username",
      placeholder: "John Doe",
      errors,
      register,
      title: "Username",
      type: "text",
      registerOnly: true,
      isRequired: true,
    },
    {
      id: "email",
      placeholder: "xyz@example.com",
      errors,
      register: register,
      title: "Email",
      type: "email",
      registerOnly: false,
      isRequired: true,
    },
    {
      id: "password",
      placeholder: "*********",
      errors,
      register,
      title: "Password",
      type: "password",
      showIcon: true,
      registerOnly: false,
      isRequired: true,
      showPassword: showPassword,
      setShowPassword: setShowPassword,
    },
    {
      id: "confirmPassword",
      placeholder: "********",
      errors,
      register,
      title: "Re-enter Password",
      type: "password",
      registerOnly: true,
      isRequired: true,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className="mx-1 flex items-center justify-center p-0 bg-transparent hover:bg-transparent border-none"
          size={"sm"}
        >
          <span className=" h-full w-full flex justify-center items-center px-6 bg-sky-500 hover:bg-sky-600 rounded-2xl dark:text-white">
            Login
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent >
        <form onSubmit={handleSubmit(onSubmit)} className="px-6">
          <DialogHeader>
            <DialogTitle>
              <h2 className="my-1 font-normal text-center text-black/80 text-xl dark:text-white/80">
                <span className="text-sky-500 font-medium">
                  {isLogin ? "Login" : "Register"}
                </span>{" "}
                {isLogin && "to"} your account
              </h2>
            </DialogTitle>
            <DialogDescription>
              {isLogin && (
                <p className="text-center text-gray-400 text-md">
                  Please create new account if <br />
                  you haven&apos;t created one.
                </p>
              )}
            </DialogDescription>
          </DialogHeader>
          {InputList.map((EachInput) => {
            return (
              (!EachInput.registerOnly || !isLogin) && (
                <AuthInput {...EachInput} key={EachInput.id} />
              )
            );
          })}

          {!isLogin && (
            <label className=" flex flex-col text-md">
              <span className="my-1 ">{"Upload Profile"}</span>

              <div className="rounded-sm border-2 flex items-center justify-between px-1 focus-within:border-sky-400">
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => {
                    if (e.target.files) setImage(e.target.files[0]);
                  }}
                  placeholder={"Your profile"}
                  className="w-full h-full py-1 m-1 focus:border-none focus:outline-none "
                />
              </div>
            </label>
          )}

          <div className="flex items-center justify-between mx-2 flex-col md:flex-row text-md">
            <p className="mt-2 md:mt-0 text-md">
              {isLogin ? "Don't" : "Already"} have an Account?{" "}
              <button
                className="underline text-sky-500 cursor-pointer focus:border-none focus:outline-none focus:text-sky-400"
                onClick={toggleMode}
                type="button"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>

            <button
              disabled={isSubmitting}
              type="submit"
              className="my-3 bg-sky-400 shadow-lg shadow-sky-500/50 text-white  rounded-[4px] py-1 px-[14px] text-md focus:outline-sky-300 focus:outline disabled:bg-sky-300"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </div>

          <DialogFooter>
            {!isLogin && (
              <p className="text-center mx-1 text-gray-400 mt-2 text-md">
                By clicking Create Account you aggree to our
                <span className="text-sky-400 hover:underline cursor-pointer">
                  {" "}
                  Terms{" "}
                </span>
                and have read and acknoledege our
                <span className="text-sky-400 hover:underline cursor-pointer">
                  {" "}
                  Global Privacy statement.
                </span>
              </p>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
