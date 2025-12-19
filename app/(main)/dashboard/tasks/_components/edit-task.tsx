import { Button } from "../../../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../../../../components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../../../../../components/ui/textarea";
import { Input } from "../../../../../components/ui/input";
import { priority, status } from "@/app/(main)/dashboard/tasks/_lib/types";
import { useState } from "react";
import { Checkbox } from "../../../../../components/ui/checkbox";
import { Plus, X } from "lucide-react";

interface EditTaskProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Item {
  name: string;
  id: number;
  done: boolean;
}

export function EditTask({ isOpen, onClose }: EditTaskProps) {
  const [checklist, setChecklist] = useState<Item[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim() === "") {return;}
    addNewItem(input);
    setInput("");
  };

  function addNewItem(newItem: string) {
    setChecklist((prevItems) => [
      ...prevItems,
      { name: newItem, id: Date.now(), done: false },
    ]);
  }

  function handleDelete(idToDelete: number) {
    setChecklist((prevItems) =>
      prevItems.filter((item) => item.id !== idToDelete)
    );
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="min-w-2/3">
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3">
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Task name</FieldLabel>
                    <Input type="text" />
                  </Field>
                  <Field>
                    <FieldLabel>Priority</FieldLabel>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {priority.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            <item.icon className={item.color} />
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel>Status</FieldLabel>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        {status.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            <item.icon className={item.color} />
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel>Due date</FieldLabel>
                    <Input type="date" />
                  </Field>
                  <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea />
                  </Field>
                </FieldGroup>
              </FieldSet>
            </div>

            <div className="col-span-2 space-y-4">
              <p className="text-md leading-none font-semibold">Checklist</p>
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e: any) => setInput(e.target.value)}
                />
                <Button
                  onClick={handleSubmit}
                  className={"cursor-pointer"}
                  variant="outline"
                  size="icon"
                >
                  <Plus />
                </Button>
              </div>
              {checklist.map((item) => (
                <div key={item.id} className="flex gap-2 items-center">
                  <Checkbox
                    key={item.id}
                    checked={item.done}
                  />
                  <span className={`text-sm ${item.done == true ? "line-through" : ""}`}>
                    {item.name}
                  </span>
                  <X
                    onClick={() => handleDelete(item.id)}
                    className="cursor-pointer ml-auto text-destructive"
                    size={16}
                  />
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <DialogClose>
              <Button onClick={onClose} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
