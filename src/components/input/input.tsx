import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { useField } from "@unform/core";

type InputType = "text" | "email" | "password" | "tel" | "file" | "search" | "date";
type InputColor = "light" | "extralight";
type InputSize = "sm" | "adjustable" | "xs";

interface Props {
  name: string;
  label?: string;
  type?: InputType;
  color?: InputColor;
  sizing: InputSize;
  placeholder: string;
  shape?: "rounded" | "square";
  readOnly?: boolean;
  visibility?: string;
  value?: string | number;
  mask?: (value: string) => string;
  className?: string;
  required?:boolean
  validate?: (value: string) => string | undefined;
  maxLength?: number;
};

// type InputProps = JSX.IntrinsicElements["input"] & Props;


export default function Input(props: Props) {
  const {
    name,
    label,
    type = "text",
    sizing,
    color = "extralight",
    shape = "rounded",
    placeholder,
    readOnly,
    visibility,
    value,
    required,
    mask,
    className,
    validate,
    maxLength = 100,
  } = props;

  const styles = {
    sizes: {
      xs: "w-24 h-14 px-5 text-sm",
      sm: "w-80 h-14 px-5 text-sm",
      adjustable: 'w-full h-14 px-5 text-sm'
    },
    shapes: {
      square: "rounded-none",
      rounded: "rounded-lg",
    },
    colors: {
      light: "bg-light",
      extralight: "bg-extralight",
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const maskedValue = mask ? mask(value) : value;

    inputRef.current!.value = maskedValue;
  };

  const handleBlur = () => {
    const inputValue = inputRef.current!.value;
    const error = validate ? validate(inputValue) : undefined;

    // TODO: Handle the error state and display the error message accordingly
  };

  return (
    <div className={clsx(["flex flex-col", visibility])}>
      {label && (
        <label
          className="font-['Poppins'] text-[#616161] font-bold text-sm md:text-md uppercase"
          htmlFor={fieldName}
        >
          {label}
        </label>
      )}

      <input
        className={clsx([
          styles.sizes[sizing],
          styles.colors[color],
          styles.shapes[shape],
          "text-gray",
          "placeholder-placeholder",
          "font-['Poppins']",
          "my-2",
          className,
        ])}
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        value={value}
        required={required}
        onChange={handleChange}
        onBlur={handleBlur}
        maxLength={maxLength}
      />
      {error && <span>{error}</span>}
    </div>
  );
}
