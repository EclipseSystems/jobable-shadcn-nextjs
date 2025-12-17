"use client"

import { useState } from "react";
import { faker } from "@faker-js/faker";
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";

import { Card, CardContent } from "@/components/ui/card";

import { CustomTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/pagination";
import { DataTableProps } from "@/components/data-table/types";
import { DataTableViewOptions } from "@/components/data-table/column-toggle";
import { orgColumns } from "@/components/data-table/columns";
import { PageTitle } from "@/components/layout/formatting"
import { RowDensity } from "@/components/data-table/row-density";

function generateRows() {
  const rows = [];
  for (let i = 0; i < 10; i++) {
    rows.push({
      id: i + 1,
      companyName: faker.company.name(),
      tradingAs: faker.company.name(),
      city: faker.location.city(),
      sector: faker.commerce.department(),
      noOfEmp: faker.number.int({ min: 5, max: 5000 }),
      mainContact: faker.person.fullName()
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
  return (
    <>
      <Card>
        <CardContent>
          <div className="flex items-center mb-4">
            <PageTitle title="Organisations" />
          </div>
          <DataTable columns={orgColumns} data={generateRows()} />
        </CardContent>
      </Card>
    </>
  );
}
