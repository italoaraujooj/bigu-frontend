import clsx from "clsx";
import React, { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={clsx(
        "rounded-lg border bg-white text-gray-900 shadow",
        className
      )}
      {...props}
    />
  );
};

export const CardContent = ({ className, ...props }: CardContentProps) => {
  return <div className={clsx("px-6 py-4", className)} {...props} />;
};
