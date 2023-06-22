import clsx from "clsx";
import React from "react";

type Props = {
  label: string;
  size?: "xs" | "sm" | "md" | "base" | "lg" | "xl" | "5xl" | "6xl" | "2xl";
  color?: "white" | "dark" | "gray" | "red" | "green" | "black";
  weight?: "normal" | "medium" | "bold";
  className?: string;
};

const Text = (props: Props) => {
  const { label = "", size = "sm", color = "white", weight = "normal", className } = props;

  const styles = {
    sizes: {
      base: 'text-base',
      xs: "text-xs",
      sm: "text-sm", // normal text (p)
      md: "text-md", // subtitle
      xl: "text-xl",
      lg: "text-3xl font-bold",
      '2xl': "text-2xl", // title
      '5xl': "text-5xl leading-normal			", // title
      '6xl': "text-6xl "
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    },
    colors: {
      white: "text-white",
      dark: "text-default",
      gray: "text-gray",
      red: "text-red-500",
      green: "text-green",
      black: "text-black"
    },
  };
  return (
    <p
    className={clsx(
        "font-['Poppins']",
        styles.sizes[size],
        styles.colors[color],
        styles.weight[weight],
        className,
      )}
    >
      {label}
    </p>
  );
};

export default Text;
