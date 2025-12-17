"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PageTitle } from "@/components/layout/formatting"
import { Plus } from "lucide-react"

import { faker } from "@faker-js/faker";
import { AddAppointment } from "@/components/modals/add-appointment"
import { useState } from "react"
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table"
import { RowDensity } from "@/components/data-table/row-density"
import { DataTableViewOptions } from "@/components/data-table/column-toggle"
import { CustomTable } from "@/components/data-table/data-table"
import { DataTablePagination } from "@/components/data-table/pagination"
import { apptColumns } from "@/components/data-table/columns"

const methods = ['phone', 'face']
const results = ['ATT', 'DNA']

function generateRows() {
  const rows = [];
  for (let i = 0; i < 10; i++) {
    rows.push({
      id: i + 1,
      name: faker.person.fullName(),
      caseManager: faker.person.fullName(),
      apptDate: faker.date.soon().toDateString(),
      startTime: faker.date.soon().toLocaleTimeString("en-au"),
      endTime: faker.date.soon().toLocaleTimeString("en-au"),
      method: methods[faker.number.int({ max: 1 })],
      result: results[faker.number.int({ max: 1 })],
    });
  }
  return rows;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
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
  const [apptOpen, setApptOpen] = useState(false)
  return (
    <>
      <Card>
        <CardContent>
          <div className="flex items-center mb-4">
            <PageTitle title={'Appointments'}/>
            <Button
              onClick={() => setApptOpen(true)}
              variant="outline"
              size="icon"
            >
              <Plus />
            </Button>
          </div>
          <DataTable columns={apptColumns} data={generateRows()} />
        </CardContent>
      </Card>
      <AddAppointment isOpen={apptOpen} onClose={() => setApptOpen(false)}/>
    </>
  )
}