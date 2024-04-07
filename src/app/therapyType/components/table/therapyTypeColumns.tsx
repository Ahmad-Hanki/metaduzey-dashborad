"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TherapyTypeCell } from "./TherapyTypeCell";

export type TherapyColumnsType = {
  id: string;
  name: string;
};

export const columns: ColumnDef<TherapyColumnsType>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Adi",
  },
  {
    header: 'Action',
    cell: ({row}) => <TherapyTypeCell data = {row.original}/>
  }

];
