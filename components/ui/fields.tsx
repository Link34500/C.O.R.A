import { FieldError, UseFormRegister } from "react-hook-form";

type FormFieldProps<T extends string> = {
  name: T;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
};

export function FormField<T extends string>({
  name,
  type = "text",
  placeholder,
  register,
  error,
}: FormFieldProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        type={type}
        placeholder={placeholder}
        className={`input w-full ${error ? "border-red-500" : ""}`}
        {...register(name)}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
