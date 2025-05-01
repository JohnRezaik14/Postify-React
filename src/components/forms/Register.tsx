export interface ILoginProps {}
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/authContext";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// import { useAuth } from "../../hooks/useAuth";
import { useAuth } from "../../contexts/AuthContext";
// import { useState } from "react";

//^ components

// import ProgressBar from "../ProgressBar";
import EmailInput from "./inputs/EmailInput";
import PasswordInput from "./inputs/PasswordInput";
import UsernameInput from "./inputs/UsernameInput";
import { toast } from "react-toastify";

type Inputs = {
  username: string;
  email: string;
  password: string;
  createdOn: Date;
};

// for sign up
const SignUpSchema = yup.object().shape({
  username: yup
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

export function Register(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(SignUpSchema),
  });
  const { register: registerUser } = useAuth();
  const handlesubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const response = await registerUser(
      data.username,
      data.email,
      data.password
    );
    // console.log(response);
    toast.error(response.error);
  };
  const handleError: SubmitErrorHandler<Inputs> = (errors: any) => {
    console.log(errors);
  };
  const handleAuthSwitch = () => {
    props.setAuthMode((prev: boolean) => !prev);
  };
  // const { authUser, loading, error } = useAuth(type);
  return (
    <>
      {/* <ProgressBar loading={loading} /> */}
      {/* <ToastContainer autoClose={3000} /> */}
      <form onSubmit={handleSubmit(handlesubmit, handleError)}>
        <div className="login-form sm:w-sm md:md w-md">
          <UsernameInput register={register} errors={errors} />
          <EmailInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} />
          <div className="form-buttons">
            <button type="submit" className="form-button hover:text-[#1058b4]">
              Sign Up
            </button>

            <p className="text-[#ccc]">
              Already a member?{" "}
              <button
                className="text-[#1058b4] font-bold hover:text-[#eff8fa] transition-all ease-in-out duration-300 cursor-pointer"
                onClick={handleAuthSwitch}
              >
                {" "}
                Signin
              </button>{" "}
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
