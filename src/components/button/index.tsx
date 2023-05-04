import clsx from "clsx";
import React from "react";

type ButtonType = "submit" | "button" | "reset";
type ButtonColor = "yellow" | "green" | "dark-blue" | "light-blue";
type ButtonSize = "sm" | "md" | "lg";

type Props = {
  label: string;
  onClick?: () => void;
  type?: ButtonType;
  shape: "rounded" | "square";
  size: ButtonSize;
  color: ButtonColor;
} & React.ComponentProps<"button">;

const Button = (props: Props) => {
  const {
    label,
    onClick,
    type = "submit",
    shape,
    size,
    color,
    className,
  } = props;

  const styles = {
    sizes: {
      sm: "w-48 h-12 px-8 text-base",
      md: "w-60 h-16 px-8 text-xl",
      lg: "w-80 h-16 px-8 text-2xl",
    },
    colors: {
      yellow: "bg-primary",
      green: "bg-green",
      "dark-blue": "bg-dark-blue",
      "light-blue": "bg-light-blue",
    },
    shapes: {
      rounded: "rounded-full",
      square: "rounded-lg",
    },
  };

  return (
    <button
      className={clsx([
        styles.sizes[size],
        styles.colors[color],
        styles.shapes[shape],
        "font-bold",
        "text-white",
        className,
      ])}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
