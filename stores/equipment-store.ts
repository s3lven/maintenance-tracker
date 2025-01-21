import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Equipment } from "../types";

interface EquipmentState {
  equipments: Equipment[];
  addEquipment: (equipment: Equipment) => void;
  removeEquipment: (id: string) => void;
}

const useEquipmentStore = create<EquipmentState>()(
  devtools(
    immer((set) => ({
      equipments: [
        {
            id: "1",
            name: "Test Equipment",
            department: "Machining",
            installDate: new Date("2023-01-01"),
            location: "Test Location",
            model: "TEST-123",
            serialNumber: "ABC123",
            status: "Operational"
        }
      ],
      addEquipment: (equipment) =>
        set((state) => {
          state.equipments.push(equipment);
        }),
      removeEquipment: (id) =>
        set((state) => {
          state.equipments = state.equipments.filter((eq) => eq.id !== id);
        }),
    }))
  )
);

export default useEquipmentStore;
