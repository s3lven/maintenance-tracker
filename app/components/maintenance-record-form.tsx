"use client";

import React, { useActionState } from "react";
import { submitMaintenanceRecordForm } from "../actions/maintenance-record";

import {
  Equipment,
  MaintenanceRecordCompletionStatus,
  MaintenanceRecordPriority,
  MaintenanceRecordType,
} from "@/types";

import FormInput from "./form-input";
import SelectInput from "./select-input";
import DateInput from "./date-input";

const MaintenanceRecordForm = ({ equipments }: { equipments: Equipment[] }) => {
  const initialState = {
    message: "",
    success: false,
  };
  const [state, formAction, isLoading] = useActionState(
    submitMaintenanceRecordForm,
    initialState
  );

  return (
    <form
      action={formAction}
      className="bg-gray-600 p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl">Maintenance Record Form</h2>
      <SelectInput
        id="equipmentId"
        label="Equipment"
        error={state.errors?.equipmentId?.[0]}
        defaultValue={state.inputs?.equipmentId || ""}
        options={equipments as Equipment[]}
      />
      <DateInput
        id="date"
        label="Maintenance Date"
        error={state.errors?.date?.[0]}
        required
        defaultValue={state.inputs?.date}
      />
      <SelectInput
        label="Type"
        id="type"
        options={
          ["Emergency", "Preventive", "Repair"] as MaintenanceRecordType[]
        }
        error={state.errors?.type?.[0]}
        dataTestId={"maintenance-record-type"}
        defaultValue={state.inputs?.type || ""}
      />
      <FormInput
        label="Technician"
        id="technician"
        error={state.errors?.technician?.[0]}
        defaultValue={state.inputs?.technician}
      />
      <FormInput
        label="Hours Spent"
        id="hoursSpent"
        type="number"
        error={state.errors?.hoursSpent?.[0]}
        defaultValue={state.inputs?.hoursSpent}
      />
      <FormInput
        label="Description"
        id="description"
        error={state.errors?.description?.[0]}
        defaultValue={state.inputs?.description}
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
          className={`min-h-[60px] w-full border-input px-3 py-2 shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-gray-800 border text-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
            state.errors?.partsReplaced
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-700 focus:border-blue-500"
          }`}
          defaultValue={state.inputs?.partsReplaced}
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
        error={state.errors?.priority?.[0]}
        dataTestId={"maintenance-record-priority"}
        defaultValue={state.inputs?.priority || ""}
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
        error={state.errors?.completionStatus?.[0]}
        dataTestId={"maintenance-record-completion-status"}
        defaultValue={state.inputs?.completionStatus || ""}
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

export default MaintenanceRecordForm;
