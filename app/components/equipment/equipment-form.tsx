"use client";

import { useActionState } from "react";
import { addEquipment } from "../../actions/equipment";

import { Department, EquipmentStatus } from "@/types";

import FormInput from "../form-inputs/form-input";
import SelectInput from "../form-inputs/select-input";
import DateInput from "../form-inputs/date-input";

const EquipmentForm = () => {
  const initialState = {
    message: "",
    success: false,
  };

  const [state, formAction, isLoading] = useActionState(
    addEquipment,
    initialState
  );

  return (
    <form
      action={formAction}
      className="bg-gray-600 p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl">Equipment Form</h2>
      <FormInput
        label="Name"
        id="name"
        error={state.errors?.name?.[0]}
        defaultValue={state.inputs?.name}
      />
      <FormInput
        label="Location"
        id="location"
        error={state.errors?.location?.[0]}
        defaultValue={state.inputs?.location}
      />
      <SelectInput
        label="Department"
        id="department"
        options={
          ["Machining", "Assembly", "Packaging", "Shipping"] as Department[]
        }
        error={state.errors?.department?.[0]}
        defaultValue={state.inputs?.department || ""}
      />
      <FormInput
        label="Model"
        id="model"
        error={state.errors?.model?.[0]}
        defaultValue={state.inputs?.model}
      />
      <FormInput
        label="Serial Number"
        id="serialNumber"
        error={state.errors?.serialNumber?.[0]}
        defaultValue={state.inputs?.serialNumber}
      />
      <DateInput
        id="installDate"
        label="Install Date"
        error={state.errors?.installDate?.[0]}
        required
        defaultValue={state.inputs?.installDate?.toString()}
      />
      <SelectInput
        label="Status"
        id="status"
        options={
          ["Down", "Maintenance", "Operational", "Retired"] as EquipmentStatus[]
        }
        error={state.errors?.status?.[0]}
        dataTestId={"equipment-status"}
        defaultValue={state.inputs?.status || ""}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
      {state.message && (
        <p
          className={`text-center font-semibold ${
            state.errors ? "text-red-500" : "text-green-500"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
};

export default EquipmentForm;
