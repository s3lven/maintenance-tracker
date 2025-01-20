import EquipmentForm from "./components/equipment-form";
import MaintenanceRecordForm from "./components/maintenance-record-form";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <EquipmentForm />
      <MaintenanceRecordForm />
    </div>
  );
}
