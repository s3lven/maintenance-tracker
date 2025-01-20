export type Department = "Machining" | "Assembly" | "Packaging" | "Shipping";
export type EquipmentStatus =
  | "Operational"
  | "Down"
  | "Maintenance"
  | "Retired";

export interface Equipment {
  id: string;
  name: string;
  location: string;
  department: Department;
  model: string;
  serialNumber: string;
  installDate: Date;
  status: EquipmentStatus;
}

export interface MaintenanceRecord {
  id: string;
  equipmentId: string;
  date: Date;
  type: "Preventive" | "Repair" | "Emergency";
  technician: string;
  hoursSpent: number;
  description: string;
  partsReplaced?: string[];
  priority: "Low" | "Medium" | "High";
  completionStatus: "Complete" | "Incomplete" | "Pending Parts";
}
