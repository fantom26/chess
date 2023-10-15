"use client";
import { FC, HTMLProps } from "react";
import { Controller, FieldError, useFormContext } from "react-hook-form";

export interface InputProps extends HTMLProps<HTMLInputElement> {
  name: string;
  error?: FieldError | undefined;
}

export const Input: FC<InputProps> = (props) => {
  const { placeholder, type, name, error, onChange, value, ...rest } = props;

  return (
    <div className="input-wrapper">
      <input name={name} type={type} placeholder={placeholder} onChange={onChange} value={value} className="input" {...rest} />
      {error?.message && <p className="error">{error?.message}</p>}
    </div>
  );
};

export const ControlledInput: FC<InputProps> = (props) => {
  const { name, type, placeholder, defaultValue = "", ...rest } = props;

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Input name={name} error={error} type={type} placeholder={placeholder} onChange={onChange} value={value} {...rest} />
      )}
    />
  );
};
