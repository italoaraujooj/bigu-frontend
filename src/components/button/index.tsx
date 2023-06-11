import clsx from "clsx";
import React from "react";

type ButtonType = "submit" | "button" | "reset";
type ButtonColor = "yellow" | "green" | "dark-blue" | "light-blue" | "red" ;
type ButtonSize = "sm" | "base" | "md" | "lg" | "res";
type ButtonText = "white" | "black";

type Props = {
  label: string;
  onClick?: () => void;
  type?: ButtonType;
  shape?: "rounded" | "square";
  size: ButtonSize;
  color: ButtonColor;
  text?: ButtonText;
  loading?: boolean;
} & React.ComponentProps<"button">;

const Button = (props: Props) => {
  const {
    label,
    onClick,
    type = "submit",
    shape = "square",
    size,
    color,
    text = "white",
    loading,
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
      red:"bg-red"
    },
    shapes: {
      rounded: "rounded-full",
      square: "rounded-lg",
    },
    text: {
      white: "text-white",
      black: "text-black"
    }
  };

  return (
    <button
      className={clsx([
        styles.sizes[size],
        styles.colors[color],
        styles.shapes[shape],
        styles.text[text],
        "font-bold",
        className,
      ])}
      type={type}
      onClick={onClick}
    >
      {loading ? <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
      </svg> : label}
    </button>
  );
};

export default Button;
