"use server";
import { equipmentSchema } from "@/lib/validations";
import { Equipment } from "@/types";
import { revalidatePath } from "next/cache";

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
  const parsedFormData = {
    name: formData.get('name') as string,
    location: formData.get('location') as string,
    department: formData.get('department') as string,
    model: formData.get('model') as string,
    serialNumber: formData.get('serialNumber') as string,
    status: formData.get('status') as string,
    installDate: new Date(formData.get('installDate') as string),
  };
  console.log("Form data:", parsedFormData);

  const result = equipmentSchema.safeParse(parsedFormData);

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
      message: "Form submission failed. Please check the errors.",
      inputs: {
        ...parsedFormData,
        instalLDate: formData.get('installDate')
      },
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

export async function updateEquipment(
  id: string,
  data: Equipment
): Promise<{ success: boolean; message: string }> {
  const result = equipmentSchema.safeParse(data);

  if (!result.success) {
    return { success: false, message: "Validation failed" };
  }

  const index = equipmentData.findIndex((e) => e.id === id);
  if (index === -1) {
    return { success: false, message: "Equipment not found" };
  }

  equipmentData[index] = { ...result.data, id };
  revalidatePath("/");
  return { success: true, message: "Equipment updated successfully" };
}

export async function deleteEquipment(
  id: string
): Promise<{ success: boolean; message: string }> {
  const index = equipmentData.findIndex((e) => e.id === id);
  if (index === -1) {
    return { success: false, message: "Equipment not found" };
  }

  equipmentData.splice(index, 1);
  revalidatePath("/");
  return { success: true, message: "Equipment deleted successfully" };
}
