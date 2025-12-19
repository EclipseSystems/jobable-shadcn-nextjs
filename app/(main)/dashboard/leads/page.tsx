"use client"

import { useState } from "react";
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

import { leadColumns } from "@/components/data-table/columns";
import leadData from "./data/leads.json"

import { CustomTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/pagination";
import { DataTableProps } from "@/components/data-table/types";
import { DataTableViewOptions } from "@/components/data-table/column-toggle";
import { RowDensity } from "@/components/data-table/row-density";

import { AddLead } from "@/components/modals/add-lead";
import { CSVMenu } from "@/components/custom/csv-export";
import { FilterSheet } from "@/components/modals/filter-sheet"
import { PageTitle } from "@/components/layout/formatting"

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [density, setDensity] = useState<string>("standard")
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([])
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
      sorting
    }
  })

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <RowDensity density={density} setDensity={(density: string) => setDensity(density)}/>
        <DataTableViewOptions table={table} />
        <CSVMenu data={data} fileName={`leads_${Date.now().toString()}`} className={"ml-auto"} />
      </div>
      <CustomTable table={table} density={density} />
      <DataTablePagination table={table} />
    </div>
  )
}

export default function Page() {
  const [leadOpen, setLeadOpen] = useState(false)

  return (
    <>
      <Card>
        <CardContent>
          <div className="flex items-center mb-4">
            <PageTitle title={'Leads'}/>
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
      <AddLead isOpen={leadOpen} onClose={() => setLeadOpen(false)}/>
    </>
  );
}
