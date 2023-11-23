"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input, { inputProps } from "./component/Input";

import { RxCross2 } from "react-icons/rx";
import { Button } from "@/components/ui/button";

export default function Auth() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

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
    resetForm(); // Reset the form and clear errors when toggling
  };

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    const { username, email, password } = data;
    await useAuth({ username, email, password, isLogin })
      .then(() => {
        toast.success(`Successfully ${isLogin ? "Logged In" : "Registered"}!`);
        setTimeout(() => router.push("/dashboard"), 2000);
        resetForm();
      })
      .catch((error: Error) => {
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
    },
    {
      id: "email",
      placeholder: "xyz@example.com",
      errors,
      register: register,
      title: "Email",
      type: "email",
      registerOnly: false,
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
    },
  ];

  return (
    <>
      <Toaster />
      <form
        className="relative bg-white rounded-md p-6 shadow-lg min-w-[320px] w-[30vw] max-w-[500px] drop-shadow-md transition-all "
        onSubmit={handleSubmit(onSubmit)}
      >
        <Button
          variant={"secondary"}
          size={"icon"}
          className="rounded-full absolute -top-3 -right-3"
          onClick={() => {
            router.back();
          }}
        >
          <RxCross2 size={24} />
        </Button>
        <h2 className="my-1 text-xl font-normal text-center text-black/80">
          <span className="text-sky-500 font-medium text-2xl">
            {isLogin ? "Login" : "Register"}
          </span>{" "}
          to your account
        </h2>
        {isLogin && (
          <p className="text-center text-gray-400 leading-5">
            Please create new account if <br />
            you haven&apos;t created one.
          </p>
        )}

        {InputList.map((EachInput) => {
          return (
            (!EachInput.registerOnly || !isLogin) && (
              <Input {...EachInput} key={EachInput.id} />
            )
          );
        })}

        <div className="flex items-center justify-between mx-2 flex-col md:flex-row">
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

        {!isLogin && (
          <p className="text-center leading-5 mx-1 text-gray-400 mt-2 text-sm">
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
      </form>
    </>
  );
}
