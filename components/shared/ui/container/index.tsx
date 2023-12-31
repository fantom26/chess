"use client";
import { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => <div className="container">{children}</div>;
