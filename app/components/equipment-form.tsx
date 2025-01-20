"use client";

import { EquipmentFormData } from "@/lib/validations";
import { useActionState, useState } from "react";
import { submitEquipmentForm } from "../actions/equipment";

import { Department, EquipmentStatus } from "@/types";

import FormInput from "./form-input";
import SelectInput from "./select-input";

const EquipmentForm = () => {
  const initialState = {
    errors: {
      name: undefined,
      location: undefined,
      department: undefined,
      status: undefined,
      model: undefined,
      serialNumber: undefined,
      installDate: undefined,
    },
    message: "",
  };
  const [state, formAction, isLoading] = useActionState(
    submitEquipmentForm,
    initialState
  );
  const [formData, setFormData] = useState<Partial<EquipmentFormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form
      action={formAction}
      className="bg-gray-600 p-6 rounded-lg shadow-md max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl">Equipment Form</h2>
      <FormInput
        label="Name"
        id="name"
        error={state.errors?.name?.[0]}
        value={formData.name || ""}
        onChange={handleInputChange}
      />
      <FormInput
        label="Location"
        id="location"
        error={state.errors?.location?.[0]}
        value={formData.location || ""}
        onChange={handleInputChange}
      />
      <SelectInput
        label="Department"
        id="department"
        options={
          ["Machining", "Assembly", "Packaging", "Shipping"] as Department[]
        }
        error={state.errors?.department?.[0]}
        onChange={handleSelectChange}
        value={formData.department || ""}
      />
      <FormInput
        label="Model"
        id="model"
        error={state.errors?.model?.[0]}
        value={formData.model || ""}
        onChange={handleInputChange}
      />
      <FormInput
        label="Serial Number"
        id="serialNumber"
        error={state.errors?.serialNumber?.[0]}
        value={formData.serialNumber || ""}
        onChange={handleInputChange}
      />
      {/* Install Date */}
      <div>
        <label htmlFor="installDate">
          Install Date <span className="text-red-500">*</span>
        </label>
        <input
          id="installDate"
          name="installDate"
          type="date"
          value={
            formData.installDate
              ? new Date(formData.installDate).toISOString().split("T")[0]
              : ""
          }
          onChange={handleInputChange}
          required
          className={`w-full px-3 py-2 bg-gray-800 border text-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300`}
        />
        {state.errors?.installDate && (
          <p className="text-red-500 text-sm mt-1">
            {state.errors.installDate[0]}
          </p>
        )}
      </div>
      <SelectInput
        label="Status"
        id="status"
        options={
          ["Down", "Maintenance", "Operational", "Retired"] as EquipmentStatus[]
        }
        onChange={handleSelectChange}
        value={formData.status || ""}
        error={state.errors?.status?.[0]}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default EquipmentForm;
