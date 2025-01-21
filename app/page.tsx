import { getEquipment } from "./actions/equipment";
import EquipmentForm from "./components/equipment-form";
import EquipmentTable from "./components/equipment-table";
import MaintenanceRecordForm from "./components/maintenance-record-form";

export default async function Home() {
  const initialEquipment = await getEquipment()

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen gap-4">
      <EquipmentTable data={initialEquipment}/>
      <div className="w-full grid grid-cols-2 gap-4">
        <EquipmentForm />
        <MaintenanceRecordForm equipments={initialEquipment}/>
      </div>
    </div>
  ); 
}
