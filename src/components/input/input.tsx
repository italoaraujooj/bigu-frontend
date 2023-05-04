import clsx from 'clsx';
import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'

type InputType = "text" | "email" | "password" | "tel" | "file" | "search";
type InputColor = "light" | "extralight";
type InputSize = "sm";

interface Props {
  name: string
  label: string
  type: InputType
  color: InputColor
  sizing: InputSize
  placeholder:string
}

type InputProps = JSX.IntrinsicElements['input'] & Props

export default function Input(props: InputProps) {
  const {
    name,
    label,
    type,
    sizing,
    color,
    placeholder,
    className,
  } = props;

  const styles = {
    sizes: {
      sm: "w-80 h-14 px-5 text-sm",
    },
    colors: {
      light: "bg-light",
      extralight: "bg-extralight",
    }
  };
  
  const inputRef = useRef<HTMLInputElement>(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <>
      {label && <label className="font-['Poppins'] text-[#616161] font-bold text-sm md:text-lg" htmlFor={fieldName}>{label}</label>}

      <input
        className={clsx([
          styles.sizes[sizing],
          styles.colors[color],
          "rounded-xl",
          "placeholder-[#808080]",
          "font-['Poppins']",
          className,
        ])}
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
      />

      {error && <span>{error}</span>}
    </>
  )
}