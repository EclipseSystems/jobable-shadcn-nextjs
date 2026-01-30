import { useId } from "react";
import { Column, FilterFn } from "@tanstack/react-table";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "../ui/input";

export function TextFilter({ column }: { column: Column<any, unknown> }) {
  const id = useId()
  const columnFilterValue = column.getFilterValue()

  return (
    <Input
      id={`${id}-input`}
      value={(columnFilterValue ?? '') as string}
      onChange={e => column.setFilterValue(e.target.value)}
      placeholder="Please input a keyword..."
      type="text"
    />
  )
}

export function SelectFilter({ column }: { column: Column<any, unknown> }) {
  const uniqueValues = Array.from(column.getFacetedUniqueValues().keys()) as string[]

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full" asChild>
          <Button variant="outline" size="sm">Select one or more options...</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-h-60 overflow-y-auto">
          {uniqueValues.map((value) => (
            <DropdownMenuCheckboxItem
              key={value}
              checked={Array.from(column.getFilterValue() as string[] ?? []).includes(value)}
              onCheckedChange={(checked) => {
                const existingFilter = column.getFilterValue() as string[] | undefined
                if (checked) {
                  const newFilter = existingFilter ? [...existingFilter, value] : [value]
                  column.setFilterValue(newFilter)
                } else {
                  const newFilter = existingFilter?.filter((v) => v !== value)
                  column.setFilterValue(newFilter?.length ? newFilter : undefined)
                }
              }}
            >
              {value}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}