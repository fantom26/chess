import { ReactNode } from "react";
import { FormProvider, UseFormReturn, useForm } from "react-hook-form";
import { ControlledSelect } from ".";

interface FormProps {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
}

export const Form = (props: FormProps) => {
  const { children, onSubmit } = props;
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  );
};

Form.Select = ControlledSelect;
