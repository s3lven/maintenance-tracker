"use client";
import { Equipment, MaintenanceRecord } from "@/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

interface MaintenanceBarChartProps {
  equipment: Equipment[];
  maintenanceRecords: MaintenanceRecord[];
}

export function MaintenanceBarChart({
  equipment,
  maintenanceRecords,
}: MaintenanceBarChartProps) {
  // Create a map of equipment names to departments
  const equipmentDepartmentMap = equipment.reduce((acc, curr) => {
    acc[curr.name] = curr.department;
    return acc;
  }, {} as Record<string, string>);

  // Calculate hours per department
  const departmentHours = maintenanceRecords.reduce((acc, record) => {
    const department = equipmentDepartmentMap[record.equipmentId];
    // Skip invalid records
    if (!department) return acc;

    acc[department] = (acc[department] || 0) + record.hoursSpent;
    return acc;
  }, {} as Record<string, number>);

  // Convert to array and sort by hours
  const chartData = Object.entries(departmentHours)
    .map(([department, hours]) => ({ department, hours }))
    .sort((a, b) => b.hours - a.hours);

  console.log("Chart Data:", chartData);

  return (
    <div className="h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <XAxis
            dataKey="department"
            stroke="#d1d5db" // gray-300
            tick={{ fill: "#d1d5db" }}
          >
            <Label
              value="Department"
              offset={0}
              position="bottom"
              color="#d1d5db"
            />
          </XAxis>
          <YAxis
            stroke="#d1d5db"
            tick={{ fill: "#d1d5db" }}
            label={{
              value: "Maintenance Hours",
              angle: -90,
              position: "left",
              color: "#d1d5db"
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              borderColor: "#4b5563",
              borderRadius: "8px",
            }}
            itemStyle={{ color: "#d1d5db" }}
          />

          <Bar
            dataKey="hours"
            name="Maintenance Hours"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
