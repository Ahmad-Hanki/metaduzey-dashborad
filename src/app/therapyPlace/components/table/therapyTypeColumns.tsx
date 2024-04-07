"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TherapyPlaceCell } from "./TherapyTypeCell";

export type TherapyColumnsPlace = {
  id: string;
  name: string;
};

export const columns: ColumnDef<TherapyColumnsPlace>[] = [
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
    cell: ({row}) => <TherapyPlaceCell data = {row.original}/>
  }

];
