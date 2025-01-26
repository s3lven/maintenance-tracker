"use client";

import { Equipment } from "@/types";
import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const statusOrder: Equipment["status"][] = [
  "Operational",
  "Maintenance",
  "Down",
  "Retired",
];

const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#6b7280"];

const EquipmentStatusChart = ({ equipment }: { equipment: Equipment[] }) => {
  // Calculate status counts
  const statusCounts = equipment.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {} as Record<Equipment["status"], number>);

  // Convert to array format for Recharts and maintain order
  const chartData = statusOrder.map((status) => ({
    name: status,
    value: statusCounts[status] || 0,
  }));

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            innerRadius={80}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: "white" }}
            itemStyle={{ color: "black" }}
          />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            formatter={(value) => <span className="text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EquipmentStatusChart;
