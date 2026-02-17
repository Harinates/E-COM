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

export type User = {
    id: string;
    avatar:string;
    fullName:string;
    email:string;
    status:"active" | "inactive";
}

export const columns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({table}) => 
            <Checkbox  
                onCheckedChange={(Value) => table.toggleAllPageRowsSelected(!!Value)}
                checked = {
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
            />,
        cell :({row}) => 
            <Checkbox 
                onCheckedChange={(Value) => row.toggleSelected(!!Value)}
                checked = {row.getIsSelected()}
            />
    },
  {
    accessorKey: "fullName",
    header: "User",
  },

   {
    accessorKey: "avatar",
    header: "Avatar",
    cell:({row}) =>{
      const user = row.original;
      return(
        <div className="w-9 h-9 relative">
          <Image
            src={user.avatar}
            alt={user.fullName}
            fill
            className="rounded-full object-cover" 
          />
        </div>
      )
    }
  },
  
  {
    accessorKey: "email",
    header: ({column}) => {
        return (
            <Button
                variant = "ghost"
                onClick = {() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    }
  },
  


  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
 
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
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/users/${user.id}`}>View customer</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell:({row})=>{
        const status = row.getValue("status")

        return(
            <div 
              className={cn(
                `p-1 rounded-md w-max text-xs`, 
                status === "active" && "bg-green-500/40",
                status === "inactive" && "bg-red-500/40"
              )}
            >
              {status as string} 
            </div>
        )
    }
  },

]