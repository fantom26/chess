"use client";
import { FC, HTMLProps, useId } from "react";
import { Controller, useFormContext } from "react-hook-form";

export interface SwitchProps extends HTMLProps<HTMLInputElement> {
  name: string;
  checked?: boolean;
}

export const ControlledSwitch: FC<SwitchProps> = (props) => {
  const { name, checked = false, ...rest } = props;
  const id = useId();
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={checked}
      render={({ field: { onChange, value } }) => (
        <>
          <input id={id} type="checkbox" className="toggle visually-hidden" value={value} onChange={onChange} {...rest} />
          <label htmlFor={id}></label>
        </>
      )}
    />
  );
};
