import clsx from "clsx";
import React from "react";

type Props = {
  label: string;
  size?: "xs" | "sm" | "md" | "base" | "lg" | "xl" | "5xl" | "6xl" | "2xl";
  color?: "white" | "dark" | "gray" | "red" | "green" | "black" | string;
  weight?: "normal" | "medium" | "bold";
  className?: string;
};

const Text: React.FC<Props> = ({
  label = "",
  size = "sm",
  color = "white",
  weight = "normal",
  className,
}) => {
  const styles = {
    sizes: {
      base: "text-base",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      xl: "text-xl",
      lg: "text-3xl font-bold",
      "2xl": "text-2xl",
      "5xl": "text-5xl leading-normal",
      "6xl": "text-6xl ",
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
      black: "text-black",
    },
  };

  const isCustomColor = !(color in styles.colors);

  return (
    <p
      className={clsx(
        "font-['Poppins']",
        styles.sizes[size],
        styles.weight[weight],
        !isCustomColor && styles.colors[color as keyof typeof styles.colors],
        className,
      )}
      style={isCustomColor ? { color } : undefined} // Aplica cor personalizada como inline style
    >
      {label}
    </p>
  );
};

export default Text;