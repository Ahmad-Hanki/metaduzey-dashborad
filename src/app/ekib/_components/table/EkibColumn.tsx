"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EkibCell } from "./EkibCell";
import Image from "next/image";

export type EkibColumnProps = {
  id: string;
  name: string;
  imageUrl: string;
  therapyPlace: string[];
  therapyType: string[];
  therapyUnvan: string[];
};

export const columns: ColumnDef<EkibColumnProps>[] = [
  {
    accessorKey: "name",
    header: "Adi",
  },
  {
    accessorKey: "therapyPlace",
    header: "Terapi Yer",
    // Assuming therapyPlace is an array of strings
    cell: ({ row }) => (
      <div className="flex flex-col items-center">
        {row.original.therapyPlace?.map((place, index) => (
          <span key={index}>{place}</span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "therapyType",
    header: "Terapi Tur",
    // Assuming therapyPlace is an array of strings
    cell: ({ row }) => (
      <div className="flex flex-col items-center">
        {row.original.therapyType?.map((place, index) => (
          <span key={index}>{place}</span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "therapyType",
    header: "Univan",
    // Assuming therapyPlace is an array of strings
    cell: ({ row }) => (
      <div className="flex flex-col items-center">
        {row.original.therapyUnvan?.map((place, index) => (
          <span key={index}>{place}</span>
        ))}
      </div>
    ),
  },

  {
    accessorKey: "imageUrl", // Adding imageUrl to the columns definition
    header: "Resim", // Assuming Resim URL means "Image URL" in Turkish
    cell: ({ row }) => (
      <div className="flex flex-col items-center">
        <div className="overflow-hidden aspect-square w-10 relative rounded-full">
          <Image src={row.original.imageUrl} alt="photo" fill />
        </div>
      </div>
    ),
  },

  {
    header: "Action",
    cell: ({ row }) => <EkibCell data={row.original} />,
  },
];
