"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CategoryCell } from "./CategoryCell";

export type CategoryColumns = {
  id: string;
  name: string;
};

export const columns: ColumnDef<CategoryColumns>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Category",
  },
  {
    header: 'Action',
    cell: ({row}) => <CategoryCell data = {row.original}/>
  }

];
