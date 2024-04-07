"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TherapyUnvanCell } from "./TherapyUnvanCell";

export type TherapyColumnsUnvan = {
  id: string;
  name: string;
};

export const columns: ColumnDef<TherapyColumnsUnvan>[] = [
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
    cell: ({row}) => <TherapyUnvanCell data = {row.original}/>
  }

];
