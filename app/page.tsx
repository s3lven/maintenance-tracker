import { getEquipment } from "./actions/equipment";
import { getMaintenanceRecords } from "./actions/maintenance-record";
import EquipmentForm from "../components/equipment/equipment-form";
import EquipmentTable from "../components/equipment/equipment-table";
import MaintenanceRecordForm from "../components/maintenance-record/maintenance-record-form";
import MaintenanceRecordTable from "../components/maintenance-record/maintenance-record-table";
import { Dashboard } from "@/components/dashboard";

export default async function Home() {
  const initialEquipment = await getEquipment();
  const initialRecords = await getMaintenanceRecords();

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen gap-4">
      <EquipmentTable data={initialEquipment} />
      <MaintenanceRecordTable data={initialRecords} />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <EquipmentForm />
        <MaintenanceRecordForm equipments={initialEquipment} />
      </div>
      <Dashboard
        equipment={initialEquipment}
        maintenanceRecords={initialRecords}
      />
    </div>
  );
}
