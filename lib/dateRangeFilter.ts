import { MaintenanceRecord } from "@/types";
import { Row } from "@tanstack/react-table";

export const isWithinRange = (
  row: Row<MaintenanceRecord>,
  columnId: string,
  value: [Date | null, Date | null]
) => {
  if (!row || !columnId || !value) return true;

  const date = row.getValue(columnId) as Date;
  const [startDate, endDate] = value; // value => two date input values

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

 
  console.log(date.getTime(), start?.getTime(), end?.getTime());

  //If one filter defined and date is null filter it
  if ((start || end) && !date) return false;

  
  if (start && !end) {
    return date.getTime() >= start.getTime();
  } else if (!start && end) {
    return date.getTime() <= end.getTime();
  } else if (start && end) {
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
  }

  return true;
};
