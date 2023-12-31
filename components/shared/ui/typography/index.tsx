import { ElementType, FC, HTMLAttributes, ReactNode } from "react";

import { TagVariant } from "@utils/enums";

export interface TypographyProps extends HTMLAttributes<HTMLHeadingElement> {
  tag?: ElementType;
  variant?: TagVariant;
  uppercase?: boolean;
  center?: boolean;
  classNames?: string;
  children?: ReactNode;
  gutterBottom?: boolean;
}

export const Typography: FC<TypographyProps> = (props) => {
  const { classNames, tag: Tag = "div", variant = TagVariant.DIV, uppercase = false, center = false, children, gutterBottom = false } = props;

  const getClasses = () => {
    let className = classNames ? `typography ${classNames}` : "typography";

    switch (variant) {
      case TagVariant.H1: {
        className += " h1";
        break;
      }
      case TagVariant.H2: {
        className += " h2";
        break;
      }
      case TagVariant.H3: {
        className += " h3";
        break;
      }
      case TagVariant.PARAGRAPH: {
        className += " paragraph";
        break;
      }
      default: {
        break;
      }
    }

    if (gutterBottom) className += " gutterBottom";

    if (uppercase) className += " uppercase";

    if (center) className += " center";

    return className;
  };

  return (
    <Tag className={getClasses()} variant={variant}>
      {children}
    </Tag>
  );
};
