"use client";

import React, { useActionState, useState } from "react";
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      action={formAction}
      className="bg-gray-600 p-6 rounded-lg shadow-md max-w-md space-y-4"
    >
      <h2 className="text-2xl">Maintenance Record Form</h2>
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
        onChange={handleInputChange}
        value={formData.type || ""}
        dataTestId={"maintenance-record-type"}
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
      <div className="mb-4">
        <label
          htmlFor="partsReplaced"
          className="block text-gray-300 text-sm font-medium mb-2"
        >
          Parts Replaced (Optional)
        </label>
        <textarea
          id="partsReplaced"
          name="partsReplaced"
          placeholder="Enter parts replaced, separated by commas"
          value={formData.partsReplaced || ""}
          onChange={handleInputChange}
          className={`min-h-[60px] w-full border-input px-3 py-2 shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-gray-800 border text-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
            state.errors?.partsReplaced
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-700 focus:border-blue-500"
          }`}
        />
        {state.errors?.partsReplaced && (
          <p className="text-red-500 text-sm mt-1">
            {state.errors.partsReplaced[0]}
          </p>
        )}
      </div>
      <SelectInput
        label="Priority"
        id="priority"
        options={["High", "Medium", "Low"] as MaintenanceRecordPriority[]}
        onChange={handleInputChange}
        value={formData.priority || ""}
        error={state.errors?.priority?.[0]}
        dataTestId={"maintenance-record-priority"}
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
        onChange={handleInputChange}
        value={formData.completionStatus || ""}
        error={state.errors?.completionStatus?.[0]}
        dataTestId={"maintenance-record-completion-status"}
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
