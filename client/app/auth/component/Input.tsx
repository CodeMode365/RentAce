import { RegisterType, formErrorType } from "@/types/form";
import React from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export interface inputProps {
  title: string;
  placeholder: string;
  id: "password" | "email" | "username" | "confirmPassword";
  type: "password" | "text" | "email";
  showIcon?: boolean;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  register: RegisterType;
  errors: formErrorType;
}

const Input: React.FC<inputProps> = ({
  title,
  placeholder,
  id,
  type,
  showIcon = false,
  errors,
  register,
  showPassword,
  setShowPassword,
}) => {
  return (
    <label className=" flex flex-col">
      <span className="my-2">{title}</span>

      <div className="rounded-sm border-2 flex items-center justify-between px-1 focus-within:border-sky-400">
        <input
          type={showIcon && showPassword ? "text" : type}
          id={title}
          placeholder={placeholder}
          className="w-full h-full py-2 m-1 focus:border-none focus:outline-none"
          {...register(id)}
        />

        {!showPassword && showIcon && (
          <AiFillEye
            onClick={() => {
              setShowPassword?.(true);
            }}
            size={24}
            className={"text-sky-400 cursor-pointer mr-2"}
          />
        )}

        {showPassword && showIcon && (
          <AiFillEyeInvisible
            onClick={() => {
              setShowPassword?.(false);
            }}
            size={24}
            className={"text-sky-400 cursor-pointer mr-2"}
          />
        )}
      </div>

      {errors[id] && (
        <span className="min-h-30 mt-1 text-red-500 px-2 text-sm">
          {errors[id].message}
        </span>
      )}
    </label>
  );
};

export default Input;
