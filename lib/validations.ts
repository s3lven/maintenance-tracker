import { z } from "zod";

// Equipment Form Validation Schema
export const equipmentSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  location: z.string().min(1, "Location is required"),
  department: z.enum(["Machining", "Assembly", "Packaging", "Shipping"], {
    required_error: "Department is required",
    invalid_type_error: "Department must be one of the specified values",
  }),
  model: z.string().min(1, "Model is required"),
  serialNumber: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, "Serial Number must be alphanumeric"),
  installDate: z
    .date({ required_error: "Date is required" })
    .refine((date) => date < new Date(), "Install Date must be in the past"),
  status: z.enum(["Operational", "Down", "Maintenance", "Retired"], {
    required_error: "Department is required",
    invalid_type_error: "Department must be one of the specified values",
  }),
});

export type EquipmentFormData = z.infer<typeof equipmentSchema>;

// Maintenance Record Form Validation Schema
export const maintenanceRecordSchema = z.object({
  equipmentId: z.string().min(1, "Equipment selection is required"),
  date: z
    .date({ required_error: "Date is required" })
    .refine((date) => date <= new Date(), "Date cannot be in the future"),
  type: z.enum(["Preventive", "Repair", "Emergency"], {
    required_error: "Type is required",
    invalid_type_error: "Type must be one of the specified values",
  }),
  technician: z
    .string()
    .min(2, "Technician name must be at least 2 characters"),
  hoursSpent: z
    .number()
    .positive("Hours spent must be a positive number")
    .max(24, "Cannot exceed 24 hours"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  partsReplaced: z.array(z.string()).optional(),
  priority: z.enum(["Low", "Medium", "High"], {
    required_error: "Priority is required",
    invalid_type_error: "Priority must be one of the specified values",
  }),
  completionStatus: z.enum(["Complete", "Incomplete", "Pending Parts"], {
    required_error: "Completion Status is required",
    invalid_type_error: "Completion Status must be one of the specified values",
  }),
});

export type MaintenanceRecordFormData = z.infer<typeof maintenanceRecordSchema>;
