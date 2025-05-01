export interface IUsernameInputProps {
  register: any;
  errors?: any;
}

export default function UsernameInput({
  register,
  errors,
}: IUsernameInputProps) {
  return (
    <div className="form-field">
      <label className="ff-label" htmlFor="">
        username
      </label>
      <input
        className="ff-input"
        type="text"
        placeholder="your username"
        {...register("username")}
        name="username"
      />
      <p className="form-err-msg sm:h-4 md:h-6 h-8">
        {" "}
        {errors.username?.message}
      </p>
    </div>
  );
}
