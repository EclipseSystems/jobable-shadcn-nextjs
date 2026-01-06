"use client"

import { useState } from "react"
import { ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  CalendarBody,
  CalendarDate,
  CalendarDatePagination,
  CalendarDatePicker,
  CalendarHeader,
  CalendarItem,
  CalendarMonthPicker,
  CalendarProvider,
  CalendarYearPicker,
} from "@/components/custom/page-calendar"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"

import { AddAppointment } from "@/components/modals/add-appointment"
import { apptColumns } from "@/components/data-table/columns"
import { CustomTable } from "@/components/data-table/data-table"
import { DataTablePagination } from "@/components/data-table/pagination"
import { DataTableViewOptions } from "@/components/data-table/column-toggle"
import { PageTitle } from "@/components/layout/formatting"
import { RowDensity } from "@/components/data-table/row-density"
import ApptData from "./_lib/data.json"

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
          <Tabs defaultValue="table" className="w-full">
            <TabsList>
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <DataTable columns={apptColumns} data={ApptData} />
            </TabsContent>
            <TabsContent value="calendar">
              <CalendarProvider locale={'en-au'}>
                <CalendarDate className="pb-2">
                  <CalendarDatePicker>
                    <CalendarMonthPicker />
                    <CalendarYearPicker start={2025} end={2026}/>
                  </CalendarDatePicker>
                  <CalendarDatePagination />
                </CalendarDate>
                <CalendarHeader />
                <CalendarBody features={[]}>
                  {({ feature }) => (
                    <CalendarItem feature={feature} key={feature.id} />
                  )}
                </CalendarBody>
              </CalendarProvider>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <AddAppointment isOpen={apptOpen} onClose={() => setApptOpen(false)}/>
    </>
  )
}