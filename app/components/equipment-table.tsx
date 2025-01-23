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
import { bulkUpdateStatus } from "../actions/equipment";

const columnHelper = createColumnHelper<Equipment>();

const columns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  }),
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
  const [rowSelection, setRowSelection] = React.useState<
    Record<string, boolean>
  >({});

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: (row) => row.id,
    state: {
      sorting,
      globalFilter,
      columnFilters,
      rowSelection,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
  });

  const [editStatus, setEditStatus] = React.useState(
    (table.getColumn("status")?.getFilterValue() as EquipmentStatus) ||
      "Operational"
  );

  const equipmentStatus: EquipmentStatus[] = [
    "Down",
    "Maintenance",
    "Operational",
    "Retired",
  ];

  const statusColors: Record<EquipmentStatus, string> = {
    Down: "bg-red-500/20 hover:bg-red-500/30",
    Maintenance: "bg-yellow-500/20 hover:bg-yellow-500/30",
    Operational: "bg-green-500/20 hover:bg-green-500/30",
    Retired: "bg-gray-500/20 hover:bg-gray-500/30",
  };

  const handleBulkEdit = async () => {
    // Get selected row IDs
    const selectedRowIds = Object.keys(rowSelection).filter(
      (id) => rowSelection[id]
    );

    const result = await bulkUpdateStatus(selectedRowIds, editStatus);

    if (result.success) {
      setRowSelection({});
    } else {
      console.error(result.message);
    }
  };

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

        {Object.keys(rowSelection).length !== 0 && (
          <div className="col-span-1 grid grid-cols-2 gap-2">
            <select
              className="p-2 rounded-lg bg-gray-700"
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value as EquipmentStatus)}
            >
              <option value="">All Status</option>
              {equipmentStatus.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button
              onClick={handleBulkEdit}
              className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
              Confirm Bulk Edit
            </button>
          </div>
        )}
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
