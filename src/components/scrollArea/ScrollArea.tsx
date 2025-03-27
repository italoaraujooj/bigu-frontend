import clsx from "clsx";
import React, { ReactNode } from "react";

interface ScrollAreaProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollArea({ children, className }: ScrollAreaProps) {
  return <div className={clsx("overflow-y-auto", className)}>{children}</div>;
}
