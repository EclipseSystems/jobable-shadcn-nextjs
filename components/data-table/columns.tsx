"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ColumnDef } from "@tanstack/react-table"
import { DoorOpen, Ellipsis } from "lucide-react"
import { Checkbox } from "../ui/checkbox"

export type Leads = {
  id: number
  name: string
  status: string
  street: string
  suburb: string
  state: string
  postcode: string
  email: string
  phone: string
}

export const leadColumns: ColumnDef<Leads>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  {
    accessorKey: "status",
    header: "Lead status",
    cell: ({ row }) => {
      return (
        <Badge variant={row.getValue('status') === "To convert" ? 'destructive' : 'default'}>
          {row.getValue('status')}
        </Badge>
      )
    }
  },
  { accessorKey: "street", header: "Street address" },
  { accessorKey: "suburb", header: "Suburb" },
  { accessorKey: "state", header: "State" },
  { accessorKey: "postcode", header: "Postcode" },
  { accessorKey: "email", header: "Email adddress" },
  { accessorKey: "phone", header: "Phone number" },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className={'my-0.5 size-6'}><Ellipsis /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem><DoorOpen /> Convert to lead</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]