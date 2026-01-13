"use client"

import { useState } from "react";
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";

import { Card, CardContent } from "@/components/ui/card";

import orgData from "./_lib/data.json"
import { CustomTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/pagination";
import { DataTableProps } from "@/components/data-table/types";
import { DataTableViewOptions } from "@/components/data-table/column-toggle";
import { orgColumns } from "@/components/data-table/columns";
import { PageTitle } from "@/components/layout/formatting"
import { RowDensity } from "@/components/data-table/row-density";

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    editRows: boolean
    setEditRows: (editRows: boolean) => void;
    updateData: (rowIndex: number, columnId: string, value: string | number) => void
  }
}

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
        <RowDensity density={density} setDensity={(density: string) => setDensity(density)} />
        <DataTableViewOptions table={table} />
      </div>
      <CustomTable table={table} density={density} />
      <DataTablePagination table={table} />
    </div>
  )
}

export default function Page() {
  return (
    <>
      <Card>
        <CardContent>
          <div className="flex items-center mb-4">
            <PageTitle title="Organisations" />
          </div>
          <DataTable columns={orgColumns} data={orgData} />
        </CardContent>
      </Card>
    </>
  );
}
