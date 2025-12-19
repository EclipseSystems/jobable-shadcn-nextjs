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
import { CircleCheck, CircleX, DoorOpen, Ellipsis, LoaderCircle, Phone, User } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { TaskActions } from "@/app/(main)/dashboard/tasks/_components/task-actions";
import { table } from "console";

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
};

export const clientColumns: ColumnDef<Clients>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "gender", header: "Gender" },
  { accessorKey: "birthDate", header: "Date of birth" },
];

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
  noOfEmp: number;
  mainContact: string;
};

export const orgColumns: ColumnDef<Organisations>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "companyName", header: "Company name" },
  { accessorKey: "tradingAs", header: "Trading as" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "sector", header: "Sector" },
  { accessorKey: "noOfEmp", header: "Employees" },
  { accessorKey: "mainContact", header: "Main contact" },
];

export type Tasks = {
  id: number;
  title: string;
  column: string;
  priority: string;
  status: string;
  dueDate: string;
  tags: Array<string>;
};

export const taskColumns: ColumnDef<Tasks>[] = [
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
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          {row.getValue("title")}
          <TaskActions />
        </div>
      );
    },
  },
  { accessorKey: "column", header: "Column" },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      return (
        <Badge
          variant={
            row.getValue("priority") === "high"
              ? "destructive"
              : row.getValue("priority") === "medium"
                ? "default"
                : "secondary"
          }
        >
          <p className="capitalize">{row.getValue("priority")}</p>
        </Badge>
      );
    },
  },
  {
    accessorKey: "status", header: "Status",
    cell: ({ row }) => {
      return (
        <Badge
          variant={row.getValue("status") === "Not started" ? "destructive" : row.getValue("status") === "Done" ? "outline" : "secondary"}
        >
          {row.getValue("status") === "Not started" ? <CircleX /> : row.getValue("status") === "Done" ? <CircleCheck /> : <LoaderCircle />}
          {row.getValue("status")}
        </Badge>
      );
    },
  },
  { accessorKey: "dueDate", header: "Due date" },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const array = row.getValue("tags".toString())
      return (
        <div className="flex gap-1">
          {String(array).split(',').map((tag) => (
            <Badge>{tag}</Badge>
          ))}
        </div>
      );
    }
  },
];
