import { FieldErrors, Path, UseFormRegister } from "react-hook-form";

interface IFormFieldProps<T extends Record<string, any>> {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  id: string;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  className?: string;
  inputClass?: string;
  labelClass?: string;
  errorClass?: string;
  accept?: string;
}
export default function FormField<T extends Record<string, any>>({
  label,
  name,
  type = "text",
  placeholder = "",
  id,
  register,
  errors,
  className = "mb-4",
  inputClass = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  labelClass = "ff-label block text-sm font-medium mb-1 ",
  errorClass = "form-err-msg sm:h-4 md:h-6 h-8",
  accept,
}: IFormFieldProps<T>) {
  return (
    <div className={className}>
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          placeholder={placeholder}
          className={inputClass}
          {...register(name)}
          aria-describedby={`${id}-error`}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={type !== "file" ? placeholder : undefined}
          className={inputClass}
          {...register(name)}
          accept={accept}
          aria-describedby={`${id}-error`}
        />
      )}
      <p id={`${id}-error`} className={errorClass}>
        {(errors?.[name]?.message as string | undefined) || " "}
      </p>
    </div>
  );
}
