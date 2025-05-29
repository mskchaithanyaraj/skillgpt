import React from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface AuthInputProps {
  label: string;
  id: string;
  type?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  required?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  id,
  type = "text",
  register,
  errors,
  required = false,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...register(id, { required })}
        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {errors[id] && (
        <p className="text-sm text-destructive">{`${label} is required`}</p>
      )}
    </div>
  );
};

export default AuthInput;
