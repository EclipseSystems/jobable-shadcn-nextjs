import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { KanbanItem, KanbanItemHandle } from "@/components/ui/kanban";
import {
  CheckCircle,
  File,
  GripVertical,
  Paperclip,
  Pencil,
} from "lucide-react";

import { EditTask } from "@/components/modals/edit-task";
import { Task } from "../_lib/types";

interface TaskCardProps
  extends Omit<React.ComponentProps<typeof KanbanItem>, "value"> {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [done, setDone] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  function handleSetDone(done: boolean) {
    setDone(done);
  }

  return (
    <>
      <KanbanItem key={task.id} value={task.id} asChild>
        <div className="rounded-md border bg-card p-4 shadow-xs space-y-3">
          <div className={"flex items-center gap-2"}>
            <Checkbox
              checked={done}
              onCheckedChange={handleSetDone}
              className="rounded-full size-5"
            />
            <p
              className={`text-md ${
                done == true ? "line-through" : ""
              } font-semibold`}
            >
              {task.title}
            </p>
            <KanbanItemHandle className="ml-auto" asChild>
              <Button variant="ghost" size="icon-sm">
                <GripVertical className="h-4 w-4" />
              </Button>
            </KanbanItemHandle>
            <Button
              onClick={() => setEditOpen(true)}
              variant="outline"
              size="icon-sm"
            >
              <Pencil />
            </Button>
          </div>
          <p className="text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae
            congue dui.
          </p>
          <div className={"flex gap-2"}>
            <Badge variant={"destructive"}>Tag 1</Badge>
            <Badge variant={"secondary"}>Tag 2</Badge>
            <Badge variant={"outline"}>+1 more</Badge>
          </div>
          <div className={"flex gap-3 text-sm items-center"}>
            <Badge
              variant={
                task.priority === "high"
                  ? "destructive"
                  : task.priority === "medium"
                  ? "default"
                  : "secondary"
              }
              className="capitalize"
            >
              {task.priority}
            </Badge>
            <div className={"flex gap-1 items-center"}>
              <CheckCircle size={14} /> 3/5
            </div>
            <div className={"flex gap-1 items-center"}>
              <Paperclip size={14} /> 1
            </div>
            <div className={"flex gap-1 items-center"}>
              <File size={14} /> 3
            </div>
            <p className={"ml-auto text-xs text-muted-foreground"}>
              1 Apr 2024
            </p>
          </div>
        </div>
      </KanbanItem>
      <EditTask isOpen={editOpen} onClose={() => setEditOpen(false)} />
    </>
  );
}
