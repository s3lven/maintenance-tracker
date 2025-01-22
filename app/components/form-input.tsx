interface FormInputProps {
  label?: string;
  id: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const FormInput = ({
  label,
  id,
  type = "text",
  placeholder,
  defaultValue,
  required = false,
  error,
}: FormInputProps) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
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
        defaultValue={defaultValue as string}
        // TODO: Remove required
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
