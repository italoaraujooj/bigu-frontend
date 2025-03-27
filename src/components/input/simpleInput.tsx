import React from "react";
import clsx from "clsx";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const SimpleInput = React.forwardRef<HTMLInputElement, Props>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          "w-full h-12 px-4 text-sm rounded-lg bg-white text-black placeholder-gray-400",
          className
        )}
        {...rest}
      />
    );
  }
);

SimpleInput.displayName = "SimpleInput";

export default SimpleInput;
