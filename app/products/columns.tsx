"use client"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Value } from "@radix-ui/react-select";
import {ColumnDef} from "@tanstack/react-table"
import { table } from "console";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Cell } from "recharts";

export type Product = {
    id: string | number;
    price:number;
    name:string;
    shortDescription:string;
    description:string;
    sizes:string[];
    colors:string[];
    images:Record<string,string>
}

export const columns: ColumnDef<Product>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
        }
      />
    ),

    cell :({row}) => (
      <Checkbox 
        onCheckedChange={(Value) => row.toggleSelected(!!Value)}
        checked = {row.getIsSelected()}
      />
    ),
  },
  
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "shortDescription",
    header: "Description",
  },
  
  {
    accessorKey: "images",
    header: "Images",
    cell:({row}) =>{
        const product = row.original;
        return(
          <div className="w-9 h-9 relative">
            <Image
              src={product.images[product.colors[0]]}
              alt={product.name}
              fill
              className="rounded-full object-cover" 
            />
          </div>
        )
      }
  },

  

  {
    accessorKey: "price",
    header: ({column}) => {
      return (
        <Button
          variant = "ghost"
          onClick = {() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        )
    }
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id.toString())}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/products/${product.id}`}>View customer</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]