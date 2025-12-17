import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input"
import { KanbanColumn, KanbanColumnHandle } from "@/components/ui/kanban";
import { GripVertical, Pencil } from "lucide-react";

import { Task } from "../_lib/types";
import { TaskCard } from "./kanban-task";

interface TaskColumnProps
  extends Omit<React.ComponentProps<typeof KanbanColumn>, "children"> {
  tasks: Task[];
}

export function TaskColumn({ value, tasks, ...props }: TaskColumnProps) {
  return (
    <KanbanColumn value={value} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{value}</span>
          <Badge variant="secondary" className="pointer-events-none rounded-sm">
            {tasks.length}
          </Badge>
        </div>
        <KanbanColumnHandle className="ml-auto" asChild>
          <Button variant="ghost" size="icon">
            <GripVertical className="h-4 w-4" />
          </Button>
        </KanbanColumnHandle>
        <Dialog>
          <DialogTrigger>
            <Button variant="outline" size="icon-sm">
              <Pencil />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit column title</DialogTitle>
            </DialogHeader>
            <FieldSet>
              <Field>
                <FieldLabel>Column title</FieldLabel>
                <Input />
              </Field>
            </FieldSet>
            <DialogFooter>
              <DialogClose>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-2 p-0.5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} asHandle />
        ))}
      </div>
    </KanbanColumn>
  );
}
