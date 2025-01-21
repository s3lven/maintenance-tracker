"use server";
import { equipmentSchema } from "@/lib/validations";
import { Equipment } from "@/types";
import { revalidatePath } from "next/cache";

// This would be replaced with your actual database logic
const equipmentData: Equipment[] = [
  {
    id: "1",
    name: "Test Equipment",
    department: "Machining",
    installDate: new Date("2023-01-01"),
    location: "Test Location",
    model: "TEST-123",
    serialNumber: "ABC123",
    status: "Operational",
  },
];

export async function getEquipment(): Promise<Equipment[]> {
  return equipmentData;
}

export async function addEquipment(prevState: unknown, formData: FormData) {
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
      message: "Form submission failed. Please check the errors.",
    };
  }

  const newEquipment: Equipment = {
    ...result.data,
    id: String(equipmentData.length + 1),
  };

  // Save the data to the database
  equipmentData.push(newEquipment);

  revalidatePath("/");
  return {
    success: true,
    message: "Equipment added successfully!",
  };
}
