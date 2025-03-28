import { useField } from "@unform/core";
import React, { useEffect, useRef } from "react";

interface Option {
  id: string;
  label: string;
}

interface RadioProps {
  name: string;
  options: Option[];
  onChange: any;
  required?: boolean
}

const Radio: React.FC<RadioProps> = ({ name, options, onChange, required }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: "value",
      ref: inputRefs.current,
      getValue(refs: HTMLInputElement[]) {
        const checked = refs.find((ref) => ref.checked);

        return checked ? checked.value : null;
      },
      // @ts-ignore
      setValue(refs: HTMLInputElement[], value: string) {
        const item = refs.find((ref) => ref.value === value);

        if (item) {
          item.checked = true;
        }
      },
    });
  }, [fieldName, registerField]);

  return (
    <div className="flex gap-4">
      {options.map((option, index) => (
        <label key={option.id} className=" flex gap-2">
          <input
            onChange={(event) => onChange(event.target.value)}
            // @ts-ignore
            ref={(elRef) => (inputRefs.current[index] = elRef)}
            type="radio"
            name={fieldName}
            value={option.id}
            defaultChecked={defaultValue === option.id}
            required={required}
          />
          <span className="font-['Poppins'] text-[#616161] font-bold text-sm md:text-md uppercase">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default Radio;
