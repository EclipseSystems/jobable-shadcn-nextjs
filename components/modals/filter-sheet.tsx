import { Table, ColumnMeta } from "@tanstack/react-table"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Filter } from "lucide-react"
import { SelectFilter, TextFilter } from "../custom/table-filter"

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    type?: "text" | "select" | undefined
  }
}

interface FilterSheetProps<TData> {
  table: Table<TData>
}

export function FilterSheet<TData>({
  table
}: FilterSheetProps<TData>) {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Button className="shadow-md" variant="outline" size="icon"><Filter /></Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter columns</SheetTitle>
          </SheetHeader>

          {/* Main content */}
          <div className="p-4">
            <Accordion
              type='single'
              collapsible
              className='w-full rounded-md border'
            >
              {table.getAllColumns().map((column) => {
                if (!column.getCanFilter()) {
                  return null
                }
                return (
                  <AccordionItem value={column.id} key={column.id}>
                    <AccordionTrigger className='px-5'>{column.columnDef.header?.toString()}</AccordionTrigger>
                    <AccordionContent className='text-muted-foreground px-5 pt-1 space-y-2'>
                      {column.columnDef.meta?.type === "text" ? (
                        <TextFilter column={column} />
                      ) : (
                        <SelectFilter column={column} />
                      )}
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>

        </SheetContent>
      </Sheet>
    </>
  )
}