"use client";
import { FC, HTMLProps } from "react";
import { Controller, useFormContext } from "react-hook-form";

export interface InputProps extends HTMLProps<HTMLInputElement> {
  name: string;
}

export const ControlledInput: FC<InputProps> = (props) => {
  const { name, type, placeholder, defaultValue = "" } = props;

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className="input-wrapper">
          <input type={type} placeholder={placeholder} {...field} className="input" />
          {error?.message && <p className="error">{error.message}</p>}
        </div>
      )}
    />
  );
};
