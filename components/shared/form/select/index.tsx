import { TSelectOption } from "@contexts/modal/utils/validation";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select, { StylesConfig } from "react-select";

const customStyles: StylesConfig<TSelectOption, false> = {
  control: (provided) => ({
    ...provided,
    boxShadow: "initial",
    backgroundColor: "var(--clr-bg)",
    borderColor: "var(--select-border)",
    color: "var(--clr-white)",
    fontFamily: "var(--font-family)",
    fontSize: "var(--font-size)",
    borderRadius: "5px",
    transition: "border var(--transition), color var(--transition), background-color var(--transition)",
    "&:hover": {
      backgroundColor: "var(--select-hover-background)",
      color: "var(--clr-white)",
      transition: "border var(--transition), color var(--transition), background-color var(--transition)"
    },
    "&:focus": {
      backgroundColor: "var(--select-focus-background)",
      color: "var(--clr-white)",
      transition: "border var(--transition), color var(--transition), background-color var(--transition)"
    }
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--clr-white)"
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "var(--select-active-background)" : state.isFocused ? "var(--select-hover-background)" : "var(--clr-bg)",
    color: state.isSelected ? "var(--clr-white)" : state.isFocused ? "var(--clr-white)" : "var(--clr-white)",
    transition: "color var(--transition), background-color var(--transition)",

    "&:hover": {
      backgroundColor: "var(--select-hover-background)",
      color: "var(--clr-white)",
      transition: "color var(--transition), background-color var(--transition)"
    }
  })
};

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
      render={({ field: { onChange, value } }) => (
        <Select
          value={value}
          styles={customStyles}
          options={options}
          defaultValue={defaultValue}
          components={{
            IndicatorSeparator: () => null
          }}
          onChange={(value) => onChange(value)}
        />
      )}
    />
  );
};
