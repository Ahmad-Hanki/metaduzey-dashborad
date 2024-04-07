"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EkibimizCell } from "./EkibimizCell";

export type EkibibmizColumnsType = {
  id: string;
  name: string;
  therapyPlace:string;
};

export const columns: ColumnDef<EkibibmizColumnsType>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Adi",
  },
  {
    accessorKey: "therapyPlace",
    header: "Yer",
  },
  {
    header: 'Action',
    cell: ({row}) => <EkibimizCell data = {row.original}/>
  }

];
