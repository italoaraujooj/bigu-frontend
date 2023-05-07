import clsx from "clsx";
import React from "react";

type Props = {
  label: string;
  size?: "sm" | "md" | "lg" | "6xl";
  color?: "white" | "dark" | "gray" | "red" | "green";
  weight?: "normal" | "medium" | "bold";
  className?: string;
};

const Text = (props: Props) => {
  const { label = "", size = "sm", color = "white", weight = "normal", className } = props;

  const styles = {
    sizes: {
      sm: "text-sm", // normal text (p)
      md: "text-md", // subtitle
      lg: "text-3xl font-bold", // title
      '6xl': "text-6xl"
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
