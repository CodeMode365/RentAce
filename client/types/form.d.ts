import { FieldError, UseFormRegister } from "react-hook-form";

export type formErrorType = FieldErrors<{
    password: string;
    email: string;
    username: string;
    confirmPassword: string;
}>;

export type RegisterType = UseFormRegister<{
    password: string;
    email: string;
    username?: string;
    confirmPassword?: string;
}>;