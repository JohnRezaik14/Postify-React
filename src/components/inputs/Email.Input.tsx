// import * as React from "react";

export interface IEmailInputProps {
  register: any;
  errors?: any;
}
export default function EmailInput({ register, errors }: IEmailInputProps) {
  return (
    <div className="form-field">
      <label className="ff-label" htmlFor="">
        Email
      </label>
      <input
        className="ff-input"
        type="text"
        placeholder="your email"
        {...register("email")}
        name="email"
      />
      <p className="form-err-msg sm:h-4 md:h-6 h-8"> {errors.email?.message}</p>
    </div>
  );
}
