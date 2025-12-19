"use client"

import { useState } from "react";
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { faker } from "@faker-js/faker";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Plus } from "lucide-react";

import { AddClient } from "@/components/modals/add-client";
import { clientColumns } from "@/components/data-table/columns";
import { CustomTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/pagination";
import { DataTableProps } from "@/components/data-table/types";
import { DataTableViewOptions } from "@/components/data-table/column-toggle";
import { PageTitle } from "@/components/layout/formatting"
import { RowDensity } from "@/components/data-table/row-density";
import { CSVMenu } from "@/components/custom/csv-export";

function generateRows() {
  const rows = [];
  for (let i = 0; i < 10; i++) {
    rows.push({
      id: i + 1,
      name: faker.person.fullName(),
      gender: faker.person.sex(),
      birthDate: faker.date.birthdate().toDateString()
    });
  }
  return rows;
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
        <RowDensity density={density} setDensity={(density: string) => setDensity(density)}/>
        <DataTableViewOptions table={table} />
      </div>
      <CustomTable table={table} density={density} />
      <DataTablePagination table={table} />
    </div>
  )
}

export default function Page() {
  const [clientOpen, setClientOpen] = useState(false)
  return (
    <>
      <Card>
        <CardContent>
          <div className="flex items-center mb-4">
            <PageTitle title={'Clients'}/>
            <Button variant="outline" size="icon"><Plus /></Button>
          </div>
          <DataTable columns={clientColumns} data={generateRows()} />
        </CardContent>
      </Card>
      <AddClient isOpen={clientOpen} onClose={() => setClientOpen(false)}/>
    </>
  )
}