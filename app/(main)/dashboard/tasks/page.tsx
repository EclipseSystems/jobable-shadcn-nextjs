"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PageTitle } from "@/components/layout/formatting";
import { Kanban, KanbanBoard, KanbanOverlay } from "@/components/ui/kanban";

import taskData from "@/app/(main)/dashboard/tasks/_lib/data.json";
import { TaskColumn } from "./_components/kanban-column";
import { TaskCard } from "./_components/kanban-task";
import { Task } from "./_lib/types";
import { Columns3, Ellipsis, Filter, Paperclip, Pencil, X } from "lucide-react";
import { EditTask } from "@/components/modals/edit-task";

const tabs = [
  { id: "board", value: "Board" },
  { id: "list", value: "List" },
];

export default function Page() {
  const [columns, setColumns] = useState<Record<string, Task[]>>(taskData);
  const [editOpen, setEditOpen] = useState(false)

  return (
    <>
      <Card>
        <CardContent className="space-y-4">
          <PageTitle title="Tasks" />

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
              <div className="flex gap-2">
                <Button variant="outline"><Columns3 />Columns</Button>
                <Button variant="outline"><Filter />Filter</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead><Checkbox /></TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Column</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Due date</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Tasks</TableHead>
                    <TableHead><Paperclip size={14} /></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(columns).flatMap(([columnValue, tasks]) =>
                    tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell><Checkbox /></TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {task.title}
                            <DropdownMenu>
                              <DropdownMenuTrigger className="ml-auto">
                                <Button className="size-7" variant="outline"><Ellipsis /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>

                                <DropdownMenuItem onClick={() => setEditOpen(true)}>
                                  <Pencil /> Edit task
                                </DropdownMenuItem>

                                <DropdownMenuItem variant="destructive"><X /> Delete task</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            
                          </div>
                        </TableCell>
                        <TableCell><Badge>{columnValue}</Badge></TableCell>
                        <TableCell className="capitalize">
                          <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"}>
                            {task.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{task.dueDate}</TableCell>
                        <TableCell><Badge>Tag</Badge></TableCell>
                        <TableCell>3/5</TableCell>
                        <TableCell><Paperclip size={14} /></TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <EditTask isOpen={editOpen} onClose={() => setEditOpen(false)} />
    </>
  );
}