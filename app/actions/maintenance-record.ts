"use server";
import { maintenanceRecordSchema } from "@/lib/validations";
import { MaintenanceRecord } from "@/types";
import { revalidatePath } from "next/cache";

const maintenanceRecords: MaintenanceRecord[] = [
  {
    id: "1",
    equipmentId: "Test Equipment",
    date: new Date(),
    type: "Preventive",
    technician: "John Doe",
    hoursSpent: 2,
    description: "Routine check-up and maintenance",
    partsReplaced: ["Filter", "Belt"],
    priority: "Medium",
    completionStatus: "Complete",
  },
  {
    id: "2",
    equipmentId: "Test Equipment 2",
    date: new Date(),
    type: "Emergency",
    technician: "Jane Doe",
    hoursSpent: 3,
    description: "Replaced faulty component",
    partsReplaced: ["Component X"],
    priority: "High",
    completionStatus: "Incomplete",
  },
  {
    id: "3",
    equipmentId: "Test Equipment 3",
    date: new Date(),
    type: "Repair",
    technician: "Alice Smith",
    hoursSpent: 1,
    description: "Fixed a minor issue",
    partsReplaced: ["Screw"],
    priority: "Low",
    completionStatus: "Pending Parts",
  },
];

console.log(maintenanceRecords);

export async function getMaintenanceRecords(): Promise<MaintenanceRecord[]> {
  return maintenanceRecords;
}

export async function submitMaintenanceRecordForm(
  prevState: unknown,
  formData: FormData
) {
  const rawFormData = {
    equipmentId: formData.get("equipmentId") as string,
    date: formData.get("date") as string,
    type: formData.get("type") as string,
    technician: formData.get("technician") as string,
    hoursSpent: formData.get("hoursSpent") as string,
    description: formData.get("description") as string,
    partsReplaced: formData.get("partsReplaced") as string,
    priority: formData.get("priority") as string,
    completionStatus: formData.get("completionStatus") as string,
  };
  const parsedFormData = {
    ...rawFormData,
    date: new Date(rawFormData.date as string),
    partsReplaced: (rawFormData.partsReplaced as string)
      .split(",")
      .map((part) => part.trim()),
    hoursSpent: Number(rawFormData.hoursSpent),
  };
  console.log("Form data:", parsedFormData);

  const result = maintenanceRecordSchema.safeParse(parsedFormData);

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
      message: "Form submission failed. Please check the errors.",
      inputs: rawFormData,
    };
  }

  const newRecord: MaintenanceRecord = {
    ...result.data,
    id: String(maintenanceRecords.length + 1),
  };

  // Save the data to the database
  maintenanceRecords.push(newRecord);
  revalidatePath("/");

  return {
    success: true,
    message: "Record added successfully!",
  };
}
