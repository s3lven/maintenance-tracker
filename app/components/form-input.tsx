interface FormInputProps {
  label?: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const FormInput = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  error,
}: FormInputProps) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={label}
          className="block text-gray-300 text-sm font-medium mb-2"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        // TODO: Remove comment
        // required={required}
        className={`w-full px-3 py-2 bg-gray-800 border text-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-700 focus:border-blue-500"
        }`}
      />
      {error && <p className="text-red-500 text-sx mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
