"use client";

import {
  MaintenanceRecord,
  MaintenanceRecordCompletionStatus,
  MaintenanceRecordPriority,
  MaintenanceRecordType,
} from "@/types";
import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  GroupingState,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import React from "react";
import Popover from "../popover";
import Filter from "./filter";
import { dateRangeFilter } from "@/lib/dateRangeFilter";
import { ChevronDown, ChevronRight } from "lucide-react";

const columnHelper = createColumnHelper<MaintenanceRecord>();

const columns = [
  columnHelper.accessor("id", {
    header: () => "ID",
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor("equipmentId", {
    header: "Equipment",
    cell: (info) => info.getValue(),
    enableGrouping: true,
  }),
  columnHelper.accessor("date", {
    header: "Maintenance Date",
    cell: (info) => {
      const date = info.getValue();
      if (!date) return null;

      try {
        if (date instanceof Date) {
          return date.toLocaleDateString();
        } else {
          return null;
        }
      } catch (error) {
        console.error("Invalid date:", error);
        return null;
      }
    },
    enableGrouping: false,
    meta: {
      filterVariant: "date",
    },
    filterFn: "dateRangeFilter",
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: (info) => info.getValue(),
    filterFn: "includesString",
    enableGrouping: false,
    meta: {
      filterVariant: "select",
      selectOptions: [
        "Emergency",
        "Preventive",
        "Repair",
      ] as MaintenanceRecordType[],
    },
  }),
  columnHelper.accessor("technician", {
    header: "Technician",
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor("hoursSpent", {
    header: "Hours Spent",
    cell: (info) => info.getValue().toString(),
    enableGrouping: false,
  }),
  columnHelper.accessor("completionStatus", {
    header: "Status",
    cell: (info) => info.getValue(),
    filterFn: "includesString",
    enableGrouping: false,
    meta: {
      filterVariant: "select",
      selectOptions: [
        "Complete",
        "Incomplete",
        "Pending Parts",
      ] as MaintenanceRecordCompletionStatus[],
    },
  }),
  columnHelper.accessor("priority", {
    header: "Priority",
    cell: (info) => info.getValue(),
    filterFn: "includesString",
    enableGrouping: false,
    meta: {
      filterVariant: "select",
      selectOptions: ["Low", "Medium", "High"] as MaintenanceRecordPriority[],
    },
  }),
  columnHelper.accessor("partsReplaced", {
    header: "Parts Replaced",
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => info.getValue(),
    enableGrouping: false,
  }),
];

interface MaintenanceRecordTableProps {
  data: MaintenanceRecord[];
}

const MaintenanceRecordTable = ({ data }: MaintenanceRecordTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [grouping, setGrouping] = React.useState<GroupingState>([]);

  const table = useReactTable({
    data,
    columns,
    filterFns: { dateRangeFilter: dateRangeFilter },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      sorting,
      globalFilter,
      columnFilters,
      grouping,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onGroupingChange: setGrouping,
    autoResetPageIndex: false, // Fixes getGroupedRowModel error 'Can't perform a React State update on a non-mounted component
  });

  return (
    <div className="space-y-4 w-full">
      <div className="grid grid-cols-5 gap-4">
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search records..."
          className="p-2 rounded-lg bg-gray-700 col-span-2"
        />
      </div>

      <table className="w-full border-collapse bg-gray-800 shadow-md rounded-lg">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-700 text-gray-300">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-3 text-left font-semibold border-b border-gray-600"
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder
                    ? null
                    : !header.isPlaceholder && (
                        <div className="h-20 grid grid-rows-2 justify-start ">
                          <Popover
                            trigger={
                              <div className="h-full w-full hover:bg-gray-600 px-2 cursor-pointer rounded-lg">
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </div>
                            }
                            content={
                              <>
                                <button
                                  onClick={() =>
                                    header.column.toggleSorting(false)
                                  }
                                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-500 w-full text-left"
                                >
                                  Sort Ascending
                                </button>
                                <button
                                  onClick={() =>
                                    header.column.toggleSorting(true)
                                  }
                                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-500 w-full text-left"
                                >
                                  Sort Descending
                                </button>
                                {header.column.getCanGroup() && (
                                  <button
                                    onClick={() =>
                                      header.column.toggleGrouping()
                                    }
                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-500 w-full text-left"
                                  >
                                    {header.column.getIsGrouped()
                                      ? "Ungroup"
                                      : "Group by " +
                                        header.column.columnDef.header}
                                  </button>
                                )}
                              </>
                            }
                          />
                          {header.column.getCanFilter() ? (
                            <Filter column={header.column} />
                          ) : null}
                        </div>
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-700 transition-colors duration-200 border-b border-gray-600 last:border-none"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3 text-gray-300">
                    {cell.getIsGrouped() ? (
                      // If it's a grouped cell, add an expander and row count
                      <>
                        <button
                          className={`${
                            row.getCanExpand()
                              ? "cursor-pointer"
                              : "cursor-normal"
                          }
                          flex gap-2 items-center`}
                          onClick={row.getToggleExpandedHandler()}
                        >
                          {row.getIsExpanded() ? (
                            <ChevronDown />
                          ) : (
                            <ChevronRight />
                          )}{" "}
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}{" "}
                          ({row.subRows.length})
                        </button>
                      </>
                    ) : cell.getIsPlaceholder() ? null : (
                      // Don't repeat values in the table
                      // Otherwise, just render the regular cell
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="h-24 text-center text-gray-500"
              >
                No results.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceRecordTable;
