import React, { useState, ChangeEvent, useContext, useEffect } from 'react';
import {BreedsContext } from "../../Context";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [breeds, setBreeds] = useContext(BreedsContext);


  const handleOptionToggle = (value: string) => {
    const isSelected = selectedOptions.includes(value);
    let updatedOptions: string[];

    if (isSelected) {
      updatedOptions = selectedOptions.filter(option => option !== value);
    } else {
      updatedOptions = [...selectedOptions, value];
    }

    setSelectedOptions(updatedOptions);
    setBreeds(updatedOptions);
  };

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionCheckboxChange = (event: ChangeEvent<HTMLInputElement>, value: string) => {
    if (event.target.checked) {
      handleOptionToggle(value);
    } else {
      handleOptionToggle(value);
    }
  };

  useEffect(() => {
    setSelectedOptions(breeds);
  },[breeds]);

  const renderOptions = () => {
    return options.map(option => (
      <label key={option.value} className="flex items-center">
        <input
          type="checkbox"
          checked={selectedOptions.includes(option.value)}
          onChange={event => handleOptionCheckboxChange(event, option.value)}
          className="mr-2"
        />
        {option.label}
      </label>
    ));
  };

  return (
    <div className="relative">
      <div className="border rounded-md p-2 bg-color2 text-color4" onClick={handleDropdownToggle}>
        <div className="flex items-center justify-between">
          <div>
            {selectedOptions.length > 0 ? (<span> {selectedOptions.length} Selected </span>) : (
              <span className="text-gray-500">Any</span>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute w-full right-0 border rounded-md shadow-md z-10 p-2 bg-color2 text-color4">
          {renderOptions()}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
