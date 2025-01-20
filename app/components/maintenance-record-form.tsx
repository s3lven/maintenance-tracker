"use client";

import { useActionState, useState } from "react";
import { submitMaintenanceRecordForm } from "../actions/maintenance-record";

import {
  MaintenanceRecord,
  MaintenanceRecordCompletionStatus,
  MaintenanceRecordPriority,
  MaintenanceRecordType,
} from "@/types";

import FormInput from "./form-input";
import SelectInput from "./select-input";
import DateInput from "./date-input";

const MaintenanceRecordForm = () => {
  const initialState = {
    errors: {
      equipmentId: undefined,
      date: undefined,
      type: undefined,
      technician: undefined,
      hoursSpent: undefined,
      description: undefined,
      installDate: undefined,
      partsReplaced: undefined,
      priority: undefined,
      completionStatus: undefined,
    },
    message: "",
  };
  const [state, formAction, isLoading] = useActionState(
    submitMaintenanceRecordForm,
    initialState
  );
  const [formData, setFormData] = useState<Partial<MaintenanceRecord>>({});

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
        label="Equipment"
        id="equipmentId"
        error={state.errors?.equipmentId?.[0]}
        value={formData.equipmentId || ""}
        onChange={handleInputChange}
      />
      <DateInput
        id="date"
        label="Date"
        onChange={handleInputChange}
        value={
          formData.date
            ? new Date(formData.date).toISOString().split("T")[0]
            : ""
        }
        error={state.errors?.date?.[0]}
        required
      />
      <SelectInput
        label="Type"
        id="type"
        options={
          ["Emergency", "Preventive", "Repair"] as MaintenanceRecordType[]
        }
        error={state.errors?.type?.[0]}
        onChange={handleSelectChange}
        value={formData.type || ""}
      />
      <FormInput
        label="Technician"
        id="technician"
        error={state.errors?.technician?.[0]}
        value={formData.technician || ""}
        onChange={handleInputChange}
      />
      <FormInput
        label="Hours Spent"
        id="hoursSpent"
        type="number"
        error={state.errors?.hoursSpent?.[0]}
        value={formData.hoursSpent || ""}
        onChange={handleInputChange}
      />
      <FormInput
        label="Description"
        id="description"
        error={state.errors?.description?.[0]}
        value={formData.description || ""}
        onChange={handleInputChange}
      />
      {/* TODO: FIGURE OUT PARTS REPLACED */}
      <SelectInput
        label="Priority"
        id="priority"
        options={["High", "Medium", "Low"] as MaintenanceRecordPriority[]}
        onChange={handleSelectChange}
        value={formData.priority || ""}
        error={state.errors?.priority?.[0]}
      />
      <SelectInput
        label="Completion Status"
        id="completionStatus"
        options={
          [
            "Complete",
            "Incomplete",
            "Pending Parts",
          ] as MaintenanceRecordCompletionStatus[]
        }
        onChange={handleSelectChange}
        value={formData.completionStatus || ""}
        error={state.errors?.completionStatus?.[0]}
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

export default MaintenanceRecordForm;
