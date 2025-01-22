"use server";
import { maintenanceRecordSchema } from "@/lib/validations";

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

  // Save the data to the database

  return {
    success: true,
    message: "Record added successfully!",
  };
}
