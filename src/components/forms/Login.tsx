export interface ILoginProps {}
// SubmitErrorHandler,
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { useAuth } from "../../hooks/useAuth";
import { useAuth } from "../../contexts/AuthContext";
import EmailInput from "./inputs/EmailInput";
import PasswordInput from "./inputs/PasswordInput";

import { toast } from "react-toastify";
// import ProgressBar from "../ProgressBar";

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

export function Login(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const { login } = useAuth();
  const handlesubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    // console.log(data);

    const response = await login(data.email, data.password);
    // console.log(response.error);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response);
    }
    // console.log(response);
  };
  // const handleError: SubmitErrorHandler<Inputs> = (error: any) => {};
  const handleAuthSwitch = () => {
    //toggle in modes
    props.setAuthMode((prev: boolean) => !prev);
  };

  return (
    <>
      {/* <ProgressBar loading={loading} /> */}
      <div className="">
        {/* <ToastContainer autoClose={3000} /> */}
        <form onSubmit={handleSubmit(handlesubmit)}>
          <div className="login-form sm:w-sm md:md w-md">
            <EmailInput register={register} errors={errors} />
            <PasswordInput register={register} errors={errors} />
            <div className="form-buttons">
              <button
                type="submit"
                className="form-button hover:text-[#1058b4]"
              >
                Log in
              </button>

              <p className="text-[#ccc]">
                New to Postify?{" "}
                <button
                  className="text-[#1058b4] font-bold hover:text-[#eff8fa] transition-all ease-in-out duration-300 cursor-pointer"
                  onClick={handleAuthSwitch}
                >
                  {" "}
                  create an account
                </button>{" "}
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
