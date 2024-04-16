"use client";

import { ColumnDef } from "@tanstack/react-table";
import ToggleSwitch from "./ToggleSwitch";
import { cn } from "@/lib/utils";

export type AppointmentColumnProps = {
  id: string;
  name: string;
  email: string;
  tel: string;
  destek: string;
  service: string;
  contact: string;
  place: string;
  checked: boolean;
  therapyName: string;
};

export const columns: ColumnDef<AppointmentColumnProps>[] = [
  {
    accessorKey: "name",
    header: "Adi",
    cell: ({row}) => <div className={cn(row.original.checked? 'p-1':'p-1 border border-red-600/25')}>{row.original.name}</div>
  },
  {
    accessorKey: "therapyName",
    header: "Therapy name",
  },
  {
    accessorKey: "email",
    header: "E-posta",
  },
  {
    accessorKey: "tel",
    header: "Telefon",
  },
  {
    accessorKey: "destek",
    header: "Telep",
  },
  {
    accessorKey: "contact",
    header: "iletisim",
  },
  {
    accessorKey: "place",
    header: "Yer",
  },
  {
    accessorKey: "checked",
    header: "Hizmet verildi",
    cell: ({ row }) => <ToggleSwitch appointmentId={row.original.id} checked = {row.original.checked}/>,
  },
];
