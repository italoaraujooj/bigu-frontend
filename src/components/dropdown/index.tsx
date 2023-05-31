import React from 'react'

interface DropdownOption {
  label: string;
  value: string;
}

type Props = {
  options: DropdownOption[];
  onSelectOption: (selectedOption: DropdownOption) => void;
}

function Dropdown({ options, onSelectOption }: Props) {
  const [selectedOption, setSelectedOption] = React.useState<DropdownOption | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelectOption = (option: DropdownOption) => {
    setSelectedOption(option);
    onSelectOption(option);
    setIsOpen(false);
  }

  return (
    <div>
      <button>
        { selectedOption ? selectedOption.label : 'Selecione uma opção'}
      </button>
      {isOpen && (
        <ul>
          {options.map((option) => (
            <li key={option.value} onClick={() => handleSelectOption(option)}>
              {option?.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown;