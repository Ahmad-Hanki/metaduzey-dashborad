"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EkibCell } from "./EkibCell";

export type EkibColumnProps = {
  id: string;
  name: string;
  therapyPlace: string[];
};

export const columns: ColumnDef<EkibColumnProps>[] = [
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
    header: "Therapy Places",
    // Assuming therapyPlace is an array of strings
    cell: ({ row }) => <span>{row.original.therapyPlace?.join(", ")}</span>,
  },

  {
    header: "Action",
    cell: ({ row }) => <EkibCell data={row.original} />,
  },
];
