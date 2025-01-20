"use server";
import { maintenanceRecordSchema } from "@/lib/validations";

export async function submitMaintenanceRecordForm(
  prevState: unknown,
  formData: FormData
) {
  const rawFormData = Object.fromEntries(formData.entries());
  const parsedFormData = {
    ...rawFormData,
    date: new Date(rawFormData.date as string),
  };
  console.log("Form data:", parsedFormData);

  const result = maintenanceRecordSchema.safeParse(parsedFormData);

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
      message: "Form submission failed. Please check the errors.",
    };
  }

  // Save the data to the database

  return {
    message: "Record added successfully!",
  };
}
