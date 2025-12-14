"use client"

import { useState } from "react"

import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ChevronDownIcon, Columns3Icon, RefreshCcwIcon, SearchIcon } from "lucide-react"


export function DataTableViewOptions<TData>({
  table,
}: {
  table: Table<TData>
}) {
  const [searchQuery, setSearchQuery] = useState<string>('')
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='justify-between'>
          <span className='flex items-center gap-2'>
            <Columns3Icon />
            Columns
          </span>{' '}
          <ChevronDownIcon className='ml-3' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <div className='relative'>
          <Input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='pl-8'
            placeholder='Search'
            onKeyDown={e => e.stopPropagation()}
          />
          <SearchIcon className='absolute inset-y-0 left-2 my-auto size-4' />
        </div>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(column => column.getCanHide())
          .map(column => {
            if (searchQuery && !column.id.toLowerCase().includes(searchQuery.toLowerCase())) {
              return null
            }

            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={value => column.toggleVisibility(!!value)}
                onSelect={e => e.preventDefault()}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            table.resetColumnVisibility()
            setSearchQuery('')
          }}
        >
          <RefreshCcwIcon /> Reset
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
