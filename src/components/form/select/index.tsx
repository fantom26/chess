import { TSelectOption } from "@/utils/validation";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";

export interface SelectProps {
  name: string;
  options: TSelectOption[];
  defaultValue?: TSelectOption | null;
}

export const ControlledSelect: FC<SelectProps> = (props) => {
  const { name, options, defaultValue = null } = props;

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => <Select value={value} options={options} defaultValue={defaultValue} onChange={(value) => onChange(value)} />}
    />
  );
};
