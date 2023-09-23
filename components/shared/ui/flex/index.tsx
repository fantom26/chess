import { FC, ReactNode } from "react";

type JustifyContent = "center" | "start" | "end" | "flex-start" | "flex-end" | "left" | "right" | "space-between" | "stretch" | "space-around";

type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";

type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

type AlignItems = "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end";

export interface FlexProps {
  className: string;
  container: boolean;
  justifyContent: JustifyContent;
  flexDirection: FlexDirection;
  flexGrow: number;
  flexBasis: string;
  flexShrink: number;
  flexWrap: FlexWrap;
  flex: string;
  gap: string;
  alignItems: AlignItems;
  margin: string;
  padding: string;
  width: string;
  height: string;
  maxWidth: string;
  children: ReactNode;
}

export const Flex: FC<Partial<FlexProps>> = (props) => (
  <div
    className={props.className}
    style={{
      display: props.container ? "flex" : "block",
      justifyContent: props.justifyContent || "flex-start",
      flexDirection: props.flexDirection || "row",
      flexGrow: props.flexGrow || 0,
      flexBasis: props.flexBasis || "auto",
      flexShrink: props.flexShrink || 1,
      gap: props.gap || "initial",
      flexWrap: props.flexWrap || "nowrap",
      flex: props.flex || "0 1 auto",
      alignItems: props.alignItems || "stretch",
      margin: props.margin || "0",
      padding: props.padding || "0",
      width: props.width || "auto",
      height: props.height || "auto",
      maxWidth: props.maxWidth || "none"
    }}
  >
    {props.children}
  </div>
);
