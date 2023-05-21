import clsx from "clsx";
import React from "react";

type ButtonType = "submit" | "button" | "reset";
type ButtonColor = "yellow" | "green" | "dark-blue" | "light-blue";
type ButtonSize = "sm" | "base" | "md" | "lg" | "res";

type Props = {
  label: string;
  onClick?: () => void;
  type?: ButtonType;
  shape?: "rounded" | "square";
  size: ButtonSize;
  color: ButtonColor;
} & React.ComponentProps<"button">;

const Button = (props: Props) => {
  const {
    label,
    onClick,
    type = "submit",
    shape = "square",
    size,
    color,
    className,
  } = props;

  const styles = {
    sizes: {
      res: "w-36 h-10 px-3 text-base",
      sm: "w-48 h-12 px-8 text-xs",
      base: "w-48 h-14 px-6 text-sm",
      md: "w-60 h-16 px-8 text-xl",
      lg: "w-80 h-16 px-8 text-2xl",
    },
    colors: {
      yellow: "bg-yellow",
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
