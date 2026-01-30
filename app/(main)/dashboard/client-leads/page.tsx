"use client";

import { useState } from "react";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
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
import { DoorOpen, Mail, Plus, Table, Upload, UserRoundCheck } from "lucide-react";

import { leadColumns } from "@/components/data-table/columns";
import leadData from "./_lib/data.json";

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

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] =  useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [density, setDensity] = useState<string>("standard");
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
      sorting,
    },
  });

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {/* Left section */}
        <RowDensity density={density} setDensity={(density: string) => setDensity(density)}/>
        <DataTableViewOptions table={table} />
        <FilterSheet table={table}/>

        {/* Right section */}
        <Subscribe className="ml-auto" />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              disabled={table.getSelectedRowModel().rows.length == 0}
              variant={"outline"}
            >Bulk actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem><UserRoundCheck />Assign leads to</DropdownMenuItem>
            <DropdownMenuItem><Upload />Bulk import</DropdownMenuItem>
            <DropdownMenuItem><Table />Bulk update</DropdownMenuItem>
            <DropdownMenuItem><DoorOpen />Convert to client</DropdownMenuItem>
            <DropdownMenuItem><Mail />Send email</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CSVMenu data={data} fileName={`leads_${Date.now().toString()}`} />
      </div>
      <CustomTable colLength={columns.length} table={table} density={density} />
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
            
          </div>
          <DataTable columns={leadColumns} data={leadData} />
        </CardContent>
      </Card>
      <AddLead isOpen={leadOpen} onClose={() => setLeadOpen(false)} />
      <Toaster />
    </>
  );
}
