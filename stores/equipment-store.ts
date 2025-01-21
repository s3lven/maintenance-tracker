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
      equipments: [],
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
