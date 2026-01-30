"use client"

import { useState } from "react";
import Link from "next/link";
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
// Import Supabase
import { createClient } from '@supabase/supabase-js'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Mail, Phone, Plus, Table, Upload } from "lucide-react";

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
import { BulkImport } from "@/components/modals/bulk-import";
import { Drawer } from "vaul";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

// Supabase constant
const supabase = createClient('https://ssotyzpozkqtorkecznm.supabase.co', 'sb_publishable_lpD6iG5tC9Wi3v_VFfBVSg_tR2AFyjT')
const { data, error } = await supabase.from('clients').select()

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [density, setDensity] = useState<string>("standard")
  const [importOpen, setImportOpen] = useState(false)
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
            <Button
              variant={"outline"}
            >Bulk actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              disabled={table.getSelectedRowModel().rows.length == 0}
              onClick={() => setSmsOpen(true)}
            >
              <Phone />Bulk SMS
            </DropdownMenuItem>
            <DropdownMenuItem><Upload /> Bulk import</DropdownMenuItem>
            <DropdownMenuItem disabled={table.getSelectedRowModel().rows.length == 0}><Table />Bulk update</DropdownMenuItem>
            <DropdownMenuItem disabled={table.getSelectedRowModel().rows.length == 0}><Mail />Send email</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CustomTable
        colLength={columns.length}
        table={table}
        density={density}
      />
      <DataTablePagination table={table} />
      <BulkSMS isOpen={smsOpen} onClose={() => setSmsOpen(false)} />
      <BulkImport isOpen={importOpen} onClose={() => setImportOpen(false)} />
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
          <DataTable columns={clientColumns} data={data || []} />
        </CardContent>
      </Card>
      <AddClient isOpen={clientOpen} onClose={() => setClientOpen(false)} />
    </>
  )
}