"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { DoorOpen, Ellipsis, Phone, User } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

export type Appointments = {
  id: number;
  name: string;
  caseManager: string;
  apptDate: string;
  startTime: string;
  endTime: string;
  method: string;
  result: string;
};

export const apptColumns: ColumnDef<Appointments>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "caseManager", header: "Case manager" },
  { accessorKey: "apptDate", header: "Appointment date" },
  { accessorKey: "startTime", header: "Start time" },
  { accessorKey: "endTime", header: "End time" },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => {
      return (
        <>
          <div className="flex items-center gap-2">
            {row.getValue("method") === "phone" ? (
              <Phone size={14} />
            ) : (
              <User size={14} />
            )}{" "}
            {row.getValue("method") === "phone" ? "Phone" : "Face-to-face"}
          </div>
        </>
      );
    },
  },
  { accessorKey: "result", header: "Result" },
];

export type Clients = {
  id: number;
  name: string;
  gender: string;
  birthDate: string;
}

export const clientColumns: ColumnDef<Clients>[] = [
  { accessorKey: 'id', header: 'ID'},
  { accessorKey: 'name', header: 'Name'},
  { accessorKey: 'gender', header: 'Gender'},
  { accessorKey: 'birthDate', header: 'Date of birth'}
]

export type Leads = {
  id: number;
  name: string;
  status: string;
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  email: string;
  phone: string;
};

export const leadColumns: ColumnDef<Leads>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
        <Badge
          variant={
            row.getValue("status") === "To convert" ? "destructive" : "default"
          }
        >
          {row.getValue("status")}
        </Badge>
      );
    },
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
            <Button variant="outline" className={"my-0.5 size-6"}>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <DoorOpen /> Convert to lead
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export type Organisations = {
  id: number;
  companyName: string;
  tradingAs: string;
  city: string;
  sector: string;
  noOfEmp: number
  mainContact: string;
}

export const orgColumns: ColumnDef<Organisations>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "companyName", header: "Company name" },
  { accessorKey: "tradingAs", header: "Trading as" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "sector", header: "Sector" },
  { accessorKey: "noOfEmp", header: "Employees" },
  { accessorKey: "mainContact", header: "Main contact" },
]