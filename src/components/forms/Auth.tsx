export interface ILoginProps {}
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/authContext";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { useLogin } from "../hooks/useLogin";
// import { useState } from "react";
// import { useEffect } from "react";
import "./login.css";
import EmailInput from "./inputs/EmailInput";
import PasswordInput from "./inputs/PasswordInput";
import { SubmitOptions } from "react-router";
type Inputs = {
  email: string;
  password: string;
};
// for login
const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .trim()
      .lowercase()
      .required("Email is required")
      .email("Enter a valid email"),
    password: yup.string().required().trim(),
  })
  .required();
// for sign up
const SignUpSchema = yup.object().shape({
  userName: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username too long"),
  email: yup
    .string()
    .trim()
    .lowercase()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*]/,
      "Password must contain at least one special character"
    ),
  createdOn: yup.date().default(() => new Date()),
});
export function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const handlesubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(data);
    // console.log(typeof data);

    axios
      .post("http://localhost:3001/signin", data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleError: SubmitErrorHandler<Inputs> = (errors: any) => {
    console.log(errors);
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit(handlesubmit, handleError)}>
        <div className="login-form sm:w-sm md:md w-md">
          <EmailInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} />
          <div className="form-message h-6">
            {/* <p>here to send messages and guides</p> */}
          </div>
          <div className="form-buttons">
            <button type="submit" className="form-button">
              Log in
            </button>
            <p>
              Already a member?{" "}
              <button className="text-purple-400 font-bold hover:text-violet-300 cursor-pointer">
                {" "}
                create an account
              </button>{" "}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
