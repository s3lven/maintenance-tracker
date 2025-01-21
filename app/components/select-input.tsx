import { SelectInputOptions } from "@/types";
import React from "react";

interface SelectInputProps {
  label?: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectInputOptions;
  required?: boolean;
  error?: string;
  dataTestId?: string | null;
}

const SelectInput = ({
  label,
  id,
  value,
  onChange,
  required = false,
  options,
  error,
  dataTestId = null
}: SelectInputProps) => {
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="block text-gray-300 text-sm font-medium mb-2"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 bg-gray-800 border text-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-700 focus:border-blue-500"
        }`}
        // TODO: Remove required
        // required={required}
        data-testid={dataTestId || null}
      >
        <option value="N/A" disabled>
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sx mt-1">{error}</p>}
    </>
  );
};

export default SelectInput;
