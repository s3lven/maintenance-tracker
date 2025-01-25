import { Column } from "@tanstack/react-table";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Filter = ({ column }: { column: Column<any, unknown> }) => {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  const SelectFilter = () => {
    // Get options from column options
    const options = column.columnDef.meta?.selectOptions ?? [];
    return (
      <select
        className="p-2 text-sm rounded-lg bg-gray-800"
        onChange={(e) => column.setFilterValue(e.target.value)}
        value={columnFilterValue?.toString()}
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  const DateFilter = () => {
    return (
      <div className="flex gap-2">
        <input
          type="date"
          value={(columnFilterValue as [string, string])?.[0] ?? ""}
          onChange={(e) =>
            column.setFilterValue((old: [string, string]) => [
              e.target.value,
              old?.[1],
            ])
          }
          className="w-28 shadow rounded-lg text-sm text-gray-300 bg-gray-800"
        />
        <input
          type="date"
          value={(columnFilterValue as [string, string])?.[1] ?? ""}
          onChange={(e) => {
            return column.setFilterValue((old: [string, string]) => [
              old?.[0],
              e.target.value,
            ]);
          }}
          className="w-28 shadow rounded-lg text-sm text-gray-300 bg-gray-800"
        />
      </div>
    );
  };

  return filterVariant === "select" ? (
    <SelectFilter />
  ) : filterVariant === "date" ? (
    <DateFilter />
  ) : (
    <></>
  );
};

export default Filter;
