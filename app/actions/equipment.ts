"use server";
import { equipmentSchema } from "@/lib/validations";

export async function submitEquipmentForm(
  prevState: unknown,
  formData: FormData
) {
  const rawFormData = Object.fromEntries(formData.entries());
  const parsedFormData = {
    ...rawFormData,
    installDate: new Date(rawFormData.installDate as string),
  };
  console.log("Form data:", parsedFormData);

  const result = equipmentSchema.safeParse(parsedFormData);

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
      message: "Form submission failed. Please check the errors below.",
    };
  }

  // Save the data to your database

  return {
    message: "Equipment added successfully!",
  };
}
