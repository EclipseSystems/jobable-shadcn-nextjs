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
    editedRows: { [key: string]: boolean };
    setEditedRows: (value: { [key: string]: boolean } | ((old: { [key: string]: boolean }) => { [key: string]: boolean })) => void;
    revertData: (rowIndex: number, revert: boolean) => void;
    updateData: (rowIndex: number, columnId: string, value: string | number) => void
  }
}
// ((old: []) => ({...old, [row.id]: !old[row.id]})

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [density, setDensity] = useState<string>("standard")
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([])
  // Edit meta
  const [thisData, setThisData] = useState(() => [orgData])
  const [originalData, setOriginalData] = useState(() => [orgData])
  const [editedRows, setEditedRows] = useState<{ [key: string]: boolean }>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setThisData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        }
        setOriginalData((old) =>
          old.map((row, index) => (index === rowIndex ? thisData[rowIndex] : row))
        );
      },
      updateData: (rowIndex: number, columnId: string, value: string | number) => {
        setThisData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
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
      <CustomTable colLength={columns.length} table={table} density={density} />
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
