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

export type Payment = {
    id: string;
    amount:number;
    fullName:string;
    email:string;
    status:"pending" | "processing" | "success" | "failed";
    userId : string;
}

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
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
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/users/${payment.userId}`}>View customer</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
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
                status === "pending" && "bg-yellow-500/40",
                status === "success" && "bg-green-500/40",
                status === "failed" && "bg-red-500/40"
              )}
            >
              {status as string} 
            </div>
        )
    }
  },

]