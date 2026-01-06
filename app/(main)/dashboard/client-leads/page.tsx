"use client";

import { useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DoorOpen, Mail, Plus, Table, UserRoundCheck } from "lucide-react";

import { leadColumns } from "@/components/data-table/columns";
import leadData from "./_lib/leads.json";

import { CustomTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/pagination";
import { DataTableProps } from "@/components/data-table/types";
import { DataTableViewOptions } from "@/components/data-table/column-toggle";
import { RowDensity } from "@/components/data-table/row-density";

import { AddLead } from "@/components/modals/add-lead";
import { CSVMenu } from "@/components/custom/csv-export";
import { FilterSheet } from "@/components/modals/filter-sheet";
import { PageTitle } from "@/components/layout/formatting";
import { Subscribe } from "@/components/modals/subscribe";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [density, setDensity] = useState<string>("standard");
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      columnVisibility,
      rowSelection,
      sorting,
    },
  });

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <RowDensity density={density} setDensity={(density: string) => setDensity(density)}/>
        <DataTableViewOptions table={table} />
        <Subscribe className="ml-auto" />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={"outline"}>Bulk actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem><UserRoundCheck />Assign leads to</DropdownMenuItem>
            <DropdownMenuItem><Table />Bulk update</DropdownMenuItem>
            <DropdownMenuItem><DoorOpen />Convert to client</DropdownMenuItem>
            <DropdownMenuItem><Mail />Send email</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CSVMenu data={data} fileName={`leads_${Date.now().toString()}`} />
      </div>
      <CustomTable table={table} density={density} />
      <DataTablePagination table={table} />
    </div>
  );
}

export default function Page() {
  const [leadOpen, setLeadOpen] = useState(false);

  return (
    <>
      <Card>
        <CardContent>
          <div className="flex items-center mb-4">
            <PageTitle title={"Customer leads"} />
            <Button
              onClick={() => setLeadOpen(true)}
              className="mr-2 shadow-md"
              variant="outline"
              size="icon"
            >
              <Plus />
            </Button>
            <FilterSheet />
          </div>
          <DataTable columns={leadColumns} data={leadData} />
        </CardContent>
      </Card>
      <AddLead isOpen={leadOpen} onClose={() => setLeadOpen(false)} />
      <Toaster />
    </>
  );
}
