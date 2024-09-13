import React from "react";
import Text from "../text";
import { ArrowDown, CaretDown } from "@phosphor-icons/react";

interface DropdownOption {
  label: string;
  value: string;
}

type Props = {
  label: string;
  options: DropdownOption[];
  onSelectOption: (selectedOption: DropdownOption) => void;
};

function Dropdown({ label, options, onSelectOption }: Props) {
  const [selectedOption, setSelectedOption] =
    React.useState<DropdownOption | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
 
  const handleSelectOption = (option: DropdownOption) => {
    setSelectedOption(option);
    onSelectOption(option);
    setIsOpen(false);
  };

  return (
    <div className=" flex flex-col items-start justify-center gap-2">
      {label && (
        <label
          className={`font-['Poppins'] text-[#616161] font-bold text-sm md:text-md uppercase`}
          // htmlFor={fieldName}
        >
          {label}
        </label>
      )}
      <div className="relative w-full">
        <button
          className="w-full h-14 px-5 text-sm bg-extralight rounded-lg"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selectedOption ? (
            <span className="flex items-center justify-between">
              <Text
                label={selectedOption.label}
                size="md"
                color="gray"
                className="text-start"
              />
              <CaretDown size={20} color="gray" weight="bold" />
            </span>
          ) : (
            <span className="flex items-center justify-between">
              <Text
                label="Selecione uma opção"
                weight="medium"
                size="md"
                color="gray"
                className="uppercase"
              />
              <CaretDown size={20} color="gray" weight="bold" />
            </span>
          )}
        </button>
        {isOpen && (
          <ul className="absolute top-50 w-full bg-white mt-2 rounded-md z-30">
            {options.map((option) => (
              <li
                key={option.value}
                className="py-4 px-4 hover:bg-extralight rounded-md cursor-pointer"
                onClick={() => handleSelectOption(option)}
              >
                <Text label={option?.label} size="md" color="gray" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
