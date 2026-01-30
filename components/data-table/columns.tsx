"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  ArrowRight,
  Camera,
  CircleCheck,
  CircleX,
  DoorOpen,
  Ellipsis,
  LoaderCircle,
  Mail,
  MessageCircle,
  Phone,
  User,
  UserRoundCheck,
  Video,
} from "lucide-react";

import { TaskActions } from "@/app/(main)/dashboard/tasks/_components/task-actions";
import { EditableCell } from "./editable-cell";
import { EditCellActions } from "./edit-cell-actions";

export type Appointments = {
  id: number;
  name: string;
  manager: string;
  date: string;
  startTime: string;
  endTime: string;
  method: string;
  result: string;
};

export const apptColumns: ColumnDef<Appointments>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "manager", header: "Case manager" },
  { accessorKey: "date", header: "Appointment date" },
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
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  email_address: string;
  mobile_phone: string;
  home_phone: string;
  primary_contact: string;
};

export const clientColumns: ColumnDef<Clients>[] = [
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
  { accessorKey: "first_name", header: "First name" },
  { accessorKey: "last_name", header: "Last name" },
  { accessorKey: "gender", header: "Gender" },
  { accessorKey: "date_of_birth", header: "Date of birth" },
  { accessorKey: "email_address", header: "Email address" },
  { accessorKey: "mobile_phone", header: "Mobile number" },
  { accessorKey: "home_phone", header: "Home phone" },
  { accessorKey: "primary_contact", header: "Primary contact" },
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
            <DropdownMenuLabel>Messaging</DropdownMenuLabel>
            <DropdownMenuItem>
              <MessageCircle /> Start chat
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Phone />
              Start call
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Video /> Start video call
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
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
  { accessorKey: "name", header: "Name", meta: { type: 'text' }},
  {
    accessorKey: "status",
    header: "Lead status",
    cell: ({ row }) => {
      return (
        <Badge variant={row.getValue("status") === "To convert" ? "outline" : "default"}>
          {row.getValue("status")}
        </Badge>
      );
    },
    meta: { type: 'select' }
  },
  { accessorKey: "street", header: "Street address", meta: { type: 'text' }},
  { accessorKey: "suburb", header: "Suburb", meta: { type: 'text' }},
  { accessorKey: "state", header: "State", meta: { type: 'select' }},
  { accessorKey: "postcode", header: "Postcode", meta: { type: 'text' }},
  { accessorKey: "email", header: "Email adddress", meta: { type: 'text' }},
  { accessorKey: "phone", header: "Phone number", meta: { type: 'text' }},
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
              <UserRoundCheck /> Assign lead to
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                toast.success("Lead successfully converted to client!")
              }
            >
              <DoorOpen /> Convert to client
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail /> Send email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// - - ORGANISATIONS - -

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
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: "id", header: "ID" },
  { accessorKey: "companyName", header: "Company name", cell: EditableCell },
  { accessorKey: "tradingAs", header: "Trading as", cell: EditableCell },
  { accessorKey: "city", header: "City", cell: EditableCell },
  { accessorKey: "sector", header: "Sector", cell: EditableCell },
  { accessorKey: "noOfEmp", header: "Employees", cell: EditableCell },
  { accessorKey: "mainContact", header: "Main contact", cell: EditableCell },
  { id: "actions", cell: EditCellActions }
]

// - - TASKS - -

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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge
          variant={
            row.getValue("status") === "Not started"
              ? "destructive"
              : row.getValue("status") === "Done"
                ? "outline"
                : "secondary"
          }
        >
          {row.getValue("status") === "Not started" ? (
            <CircleX />
          ) : row.getValue("status") === "Done" ? (
            <CircleCheck />
          ) : (
            <LoaderCircle />
          )}
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
      const array = row.getValue("tags".toString());
      return (
        <div className="flex gap-1">
          {String(array)
            .split(",")
            .map((tag) => (
              <Badge>{tag}</Badge>
            ))}
        </div>
      );
    },
  },
];
