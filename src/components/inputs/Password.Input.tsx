// import * as React from "react";

export interface IPasswordInputProps {
  register: any;
  errors?: any;
}

export default function PasswordInput({
  register,
  errors,
}: IPasswordInputProps) {
  return (
    <div className="form-field">
      <label className="ff-label" htmlFor="">
        Password
      </label>
      <input
        className="ff-input"
        type="password"
        autoComplete="off"
        placeholder="your password"
        {...register("password")}
        name="password"
      />
      <p className="form-err-msg sm:h-4 md:h-6 h-8">
        {" "}
        {errors.password?.message}
      </p>
    </div>
  );
}
