import { FC, HTMLProps, ReactNode } from "react";

import { ButtonVariant } from "@utils/enums";

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  variant: ButtonVariant;
  children: ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
}

export const Button: FC<Partial<ButtonProps>> = (props) => {
  const { variant = ButtonVariant.contained, children, type, ...rest } = props;

  const generateClassNames = () => {
    let className = "btn";

    if (variant === ButtonVariant.contained) {
      className += " contained";
    }

    if (variant === ButtonVariant.outlined) {
      className += " outlined";
    }

    return className;
  };

  return (
    <button type={type} className={generateClassNames()} {...rest}>
      <span>{children}</span>
    </button>
  );
};
