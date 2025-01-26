import { Equipment, MaintenanceRecord } from "@/types";
import EquipmentStatusChart from "./equipment-chart";
import { MaintenanceBarChart } from "./maintenance-record-chart";
import { MaintenanceLog } from "./maintenance-log";

export const Dashboard = ({
  equipment,
  maintenanceRecords,
}: {
  equipment: Equipment[];
  maintenanceRecords: MaintenanceRecord[];
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        {/* Pie Chart Card */}
        <div className="bg-gray-600 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Equipment Status</h2>
          <EquipmentStatusChart equipment={equipment} />
        </div>

        {/* Bar Chart Card */}
        <div className="bg-gray-600 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Maintenance Hours by Department
          </h2>
          <MaintenanceBarChart
            equipment={equipment}
            maintenanceRecords={maintenanceRecords}
          />
        </div>

        <div className="bg-gray-600 rounded-lg p-6 lg:col-span-2">
          <MaintenanceLog maintenanceRecords={maintenanceRecords} />
        </div>
      </div>
    </div>
  );
};
