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
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import React from "react";

const columnHelper = createColumnHelper<MaintenanceRecord>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("equipmentId", {
    header: "Equipment Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("date", {
    header: "Maintenance Date",
    cell: (info) => info.getValue().toLocaleDateString(),
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: (info) => info.getValue(),
    filterFn: "includesString",
  }),
  columnHelper.accessor("technician", {
    header: "Technician",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("hoursSpent", {
    header: "Hours Spent",
    cell: (info) => info.getValue().toString(),
  }),
  columnHelper.accessor("completionStatus", {
    header: "Completion Status",
    cell: (info) => info.getValue(),
    filterFn: "includesString",
  }),
  columnHelper.accessor("priority", {
    header: "Priority",
    cell: (info) => info.getValue(),
    filterFn: "includesString",
  }),
  columnHelper.accessor("partsReplaced", {
    header: "Parts Replaced",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => info.getValue(),
    // Might need to adjust the size of this column
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

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <div className="space-y-4 w-full">
      <div className="grid grid-cols-5 gap-4">
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search equipment..."
          className="p-2 rounded-lg bg-gray-700 col-span-2"
        />

        <select
          className="p-2 rounded-lg bg-gray-700 col-span-1"
          value={table.getColumn("type")!.getFilterValue() as string}
          onChange={(e) =>
            table.getColumn("type")!.setFilterValue(e.target.value)
          }
        >
          <option value="">All Types</option>
          {(
            ["Emergency", "Preventive", "Repair"] as MaintenanceRecordType[]
          ).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          className="p-2 rounded-lg bg-gray-700 col-span-1"
          value={table.getColumn("priority")!.getFilterValue() as string}
          onChange={(e) =>
            table.getColumn("priority")!.setFilterValue(e.target.value)
          }
        >
          <option value="">All Status</option>
          {(["Low", "Medium", "High"] as MaintenanceRecordPriority[]).map(
            (item) => (
              <option key={item} value={item}>
                {item}
              </option>
            )
          )}
        </select>

        <select
          className="p-2 rounded-lg bg-gray-700 col-span-1"
          value={
            table.getColumn("completionStatus")!.getFilterValue() as string
          }
          onChange={(e) =>
            table.getColumn("completionStatus")!.setFilterValue(e.target.value)
          }
        >
          <option value="">All Status</option>
          {(
            [
              "Complete",
              "Incomplete",
              "Pending Parts",
            ] as MaintenanceRecordCompletionStatus[]
          ).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full border-collapse bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-700 text-gray-300">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-3 text-left font-semibold border-b border-gray-600"
                >
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === "asc"
                            ? "Sort ascending"
                            : header.column.getNextSortingOrder() === "desc"
                            ? "Sort descending"
                            : "Clear sort"
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-700 transition-colors duration-200 border-b border-gray-600 last:border-none"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3 text-gray-300">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
