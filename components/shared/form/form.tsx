"use client";
import { ReactNode } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { ControlledSelect } from ".";
import { ControlledSwitch } from "./switch";

interface FormProps {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
}

export const Form = (props: FormProps) => {
  const { children, methods, onSubmit } = props;

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  );
};

Form.Select = ControlledSelect;
Form.Switch = ControlledSwitch;
