// EquipmentDashboard.tsx
"use client";
import { Equipment, MaintenanceRecord } from "@/types";
import EquipmentStatusChart from "./equipment/equipment-chart";
import { MaintenanceBarChart } from "./dashboard/maintenance-record-chart";

export const Dashboard = ({
  equipment,
  maintenanceRecords
}: {
  equipment: Equipment[];
  maintenanceRecords: MaintenanceRecord[]
}) => {
  return (
    <div className="min-h-screen w-full bg-gray-800 text-gray-300 p-6 flex flex-col">
      {/* Dashboard Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400 mt-2">
         Equipment and Maintenance Record Overview
        </p>
      </header>

      {/* Chart Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {/* Pie Chart Card */}
        <div className="bg-gray-600 rounded-lg p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Equipment Status</h2>
          <div className="h-[300px]">
            <EquipmentStatusChart equipment={equipment} />
          </div>
        </div>

        {/* Bar Chart Card */}
        <div className="bg-gray-600 rounded-lg p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Maintenance Hours by Department</h2>
          <MaintenanceBarChart 
            equipment={equipment} 
            maintenanceRecords={maintenanceRecords} 
          />
        </div>

        <div>
          
        </div>
      </div>
    </div>
  );
};
