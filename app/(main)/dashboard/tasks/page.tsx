"use client";

import { useState } from "react";
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PageTitle } from "@/components/layout/formatting";
import { Kanban, KanbanBoard, KanbanOverlay } from "@/components/ui/kanban";

import { TaskColumn } from "./_components/kanban-column";
import { TaskCard } from "./_components/kanban-task";
import { Task } from "./_lib/types";
import { EditTask } from "@/app/(main)/dashboard/tasks/_components/edit-task";

import { CustomTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/pagination";
import { DataTableProps } from "@/components/data-table/types";
import { DataTableViewOptions } from "@/components/data-table/column-toggle";
import { taskColumns } from "@/components/data-table/columns";
import taskData from "@/app/(main)/dashboard/tasks/_lib/data.json";

const tabs = [
  { id: "board", value: "Board" },
  { id: "list", value: "List" },
];

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
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
        <DataTableViewOptions table={table} />
      </div>
      <CustomTable table={table} />
      <DataTablePagination table={table} />
    </div>
  )
}

export default function Page() {
  const [columns, setColumns] = useState<Record<string, Task[]>>(taskData);
  const [editOpen, setEditOpen] = useState(false)

  return (
    <>
      <Card>
        <CardContent className="space-y-4">
          <div className="flex gap-2 items-center">
            <PageTitle title="Tasks" />
            <Button className="ml-auto">Create task</Button>
            <Button variant="outline">Create column</Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="board">
            {/* Tab selection */}
            <TabsList className="w-full">
              {tabs.map(tab => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  <p>{tab.value}</p>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab content */}
            <TabsContent value="board">
              {/* Kanban provider */}
              <Kanban value={columns} onValueChange={setColumns} getItemValue={(item) => item.id}>
                <KanbanBoard className="grid auto-rows-fr grid-cols-3">
                  {Object.entries(columns).map(([columnValue, tasks]) => (
                    <TaskColumn key={columnValue} value={columnValue} tasks={tasks} />
                  ))}
                </KanbanBoard>
                <KanbanOverlay>
                  {({ value, variant }) => {
                    if (variant === "column") {
                      const tasks = columns[value] ?? [];
                      return <TaskColumn value={value} tasks={tasks} />;
                    }
                    const task = Object.values(columns)
                      .flat()
                      .find((task) => task.id === value);

                    if (!task) return null;
                    return <TaskCard task={task} />;
                  }}
                </KanbanOverlay>
              </Kanban>
            </TabsContent>

            {/* List content */}
            <TabsContent className="space-y-2" value="list">
              <DataTable columns={taskColumns} data={
                Object.entries(columns).flatMap(([_, tasks]) => tasks)
              }/>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <EditTask isOpen={editOpen} onClose={() => setEditOpen(false)} />
    </>
  );
}