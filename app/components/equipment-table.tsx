"use client";

import { Department, Equipment, EquipmentStatus } from "@/types";
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

const columnHelper = createColumnHelper<Equipment>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("location", {
    header: "Location",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("department", {
    header: "Department",
    cell: (info) => info.getValue(),
    filterFn: "includesString",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
    filterFn: "includesString",
  }),
  columnHelper.accessor("model", {
    header: "Model",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("serialNumber", {
    header: "Serial Number",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("installDate", {
    header: "Install Date",
    cell: (info) => info.getValue().toLocaleDateString(),
  }),
];

interface EquipmentTableProps {
  data: Equipment[];
}

const EquipmentTable = ({ data }: EquipmentTableProps) => {
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

  const equipmentStatus: EquipmentStatus[] = [
    "Down",
    "Maintenance",
    "Operational",
    "Retired",
  ];

  const statusColors: Record<EquipmentStatus, string> = {
    Down: "bg-red-500/20",
    Maintenance: "bg-yellow-500/20",
    Operational: "bg-green-500/20",
    Retired: "bg-gray-500/20",
  };

  return (
    <div className="space-y-4 w-full">
      <div className="grid grid-cols-4 gap-4">
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search equipment..."
          className="p-2 rounded-lg bg-gray-700 col-span-2"
        />

        <select
          className="p-2 rounded-lg bg-gray-700 col-span-1"
          value={table.getColumn("department")!.getFilterValue() as string}
          onChange={(e) =>
            table.getColumn("department")!.setFilterValue(e.target.value)
          }
        >
          <option value="">All Departments</option>
          {(
            ["Assembly", "Machining", "Packaging", "Shipping"] as Department[]
          ).map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>

        <select
          className="p-2 rounded-lg bg-gray-700 col-span-1"
          value={table.getColumn("status")!.getFilterValue() as string}
          onChange={(e) =>
            table.getColumn("status")!.setFilterValue(e.target.value)
          }
        >
          <option value="">All Status</option>
          {equipmentStatus.map((status) => (
            <option key={status} value={status}>
              {status}
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
            table.getRowModel().rows.map((row) => {
              const status = row.getValue("status") as EquipmentStatus;
              const rowColor = statusColors[status] || " ";

              return (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-700 transition-colors duration-200 border-b border-gray-600 last:border-none ${rowColor}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3 text-gray-300">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              );
            })
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

export default EquipmentTable;
