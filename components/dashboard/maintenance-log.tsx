"use client";
import { MaintenanceRecord } from "@/types";

interface MaintenanceLogProps {
  maintenanceRecords: MaintenanceRecord[];
}

export const MaintenanceLog = ({ maintenanceRecords }: MaintenanceLogProps) => {
  // Sort records by date and take the most recent 5
  const recentRecords = maintenanceRecords
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="bg-gray-600 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Maintenance</h2>
      <div className="space-y-4">
        {recentRecords.length > 0 ? (
          recentRecords.map((record) => (
            <div key={record.id} className="p-4 bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-300">
                  {record.equipmentId}
                </h3>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    record.completionStatus === "Complete"
                      ? "bg-green-500/20 text-green-400"
                      : record.completionStatus === "Incomplete"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {record.completionStatus}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {new Date(record.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Technician: {record.technician}
              </p>
            </div>
          ))
        ) : (
          <div className="p-4 bg-gray-700 rounded-lg text-gray-400 text-center">
            No recent maintenance records found.
          </div>
        )}
      </div>
    </div>
  );
};
