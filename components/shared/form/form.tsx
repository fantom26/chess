"use client";
import { ReactNode } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { ControlledInput } from "./input";
import { ControlledSwitch } from "./switch";
import { ControlledSelect } from "./select";

interface FormProps {
  classes?: string;
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
}

export const Form = (props: FormProps) => {
  const { children, classes, methods, onSubmit } = props;

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className={classes}>
        {children}
      </form>
    </FormProvider>
  );
};

Form.Select = ControlledSelect;
Form.Input = ControlledInput;
Form.Switch = ControlledSwitch;
