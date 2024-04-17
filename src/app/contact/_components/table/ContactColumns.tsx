"use client";

import { ColumnDef } from "@tanstack/react-table";
import ToggleSwitch from "./ToggleSwitch";
import { cn } from "@/lib/utils";

export type ContactColumnProps = {
  id: string;
  name: string;
  email: string;
  phone: string;
  title:string
  message:string
  helped: boolean;
};

export const columns: ColumnDef<ContactColumnProps>[] = [
  {
    accessorKey: "name",
    header: "hasta Adi",
    cell: ({row}) => <div className={cn(row.original.helped? 'p-1':'p-1 border border-red-600/25')}>{row.original.name}</div>
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Telefon",
  },
  {
    accessorKey: "title",
    header: "Konu",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "helped",
    header: "Hizmet verildi",
    cell: ({ row }) => <ToggleSwitch id={row.original.id} checked = {row.original.helped}/>,
  },
];
