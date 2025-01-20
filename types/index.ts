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

export type MaintenanceRecordType = "Preventive" | "Repair" | "Emergency";
export type MaintenanceRecordPriority = "Low" | "Medium" | "High";
export type MaintenanceRecordCompletionStatus =
  | "Complete"
  | "Incomplete"
  | "Pending Parts";

export interface MaintenanceRecord {
  id: string;
  equipmentId: string;
  date: Date;
  type: MaintenanceRecordType;
  technician: string;
  hoursSpent: number;
  description: string;
  partsReplaced?: string[];
  priority: MaintenanceRecordPriority;
  completionStatus: MaintenanceRecordCompletionStatus;
}

export type SelectInputOptions =
  | Department[]
  | EquipmentStatus[]
  | MaintenanceRecordType[]
  | MaintenanceRecordPriority[]
  | MaintenanceRecordCompletionStatus[];
