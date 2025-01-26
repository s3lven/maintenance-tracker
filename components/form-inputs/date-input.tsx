import React from "react";

interface DateInputProps {
  id: string;
  error?: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
}

const DateInput = ({
  id,
  label,
  required = true,
  error,
  defaultValue,
}: DateInputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-gray-300 text-sm font-medium mb-2"
      >
        {label} {required && <span className="text-red-500"></span>}
      </label>
      <input
        id={id}
        name={id}
        type="date"
        required={required}
        defaultValue={defaultValue}
        className={`w-full px-3 py-2 bg-gray-800 border text-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-700 focus:border-blue-500"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DateInput;
