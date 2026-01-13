"use client"

import { useState } from "react";
import Link from "next/link";
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Mail, Phone, Plus, Table } from "lucide-react";

import { AddClient } from "@/components/modals/add-client";
import { clientColumns } from "@/components/data-table/columns";
import { CustomTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/pagination";
import { DataTableProps } from "@/components/data-table/types";
import { DataTableViewOptions } from "@/components/data-table/column-toggle";
import { PageTitle } from "@/components/layout/formatting"
import { RowDensity } from "@/components/data-table/row-density";
import clientData from "../clients/_lib/data.json"
import { BulkSMS } from "@/components/modals/bulk-sms";

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [density, setDensity] = useState<string>("standard")
  const [rowSelection, setRowSelection] = useState({})
  const [smsOpen, setSmsOpen] = useState(false)  
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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={"outline"}>Bulk actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSmsOpen(true)}>
              <Phone />Bulk SMS
            </DropdownMenuItem>
            <DropdownMenuItem><Table />Bulk update</DropdownMenuItem>
            <DropdownMenuItem><Mail />Send email</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CustomTable table={table} density={density} />
      <DataTablePagination table={table} />
      <BulkSMS isOpen={smsOpen} onClose={() => setSmsOpen(false)} />
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
            <PageTitle title={'Clients'} />
            <Link href="/dashboard/clients/details/profile">
              <Button variant="outline" size="icon">
                <Plus />
              </Button>
            </Link>
          </div>
          <DataTable columns={clientColumns} data={clientData} />
        </CardContent>
      </Card>
      <AddClient isOpen={clientOpen} onClose={() => setClientOpen(false)} />
    </>
  )
}