import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { CheckItem, priority, status } from "../_lib/types";
import { ComboboxMulti } from "@/components/custom/multi-combo";

interface EditTaskProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditTask({ isOpen, onClose }: EditTaskProps) {
  const [checklist, setChecklist] = useState<CheckItem[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim() === "") {
      return;
    }
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

  function handleCheckTask(itemId: number) {
    const updatedChecklist = checklist.map((item) => {
      if (item.id === itemId) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setChecklist(updatedChecklist);
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
                  <div className="grid grid-cols-2 w-full gap-4">
                    <div className="col-span-1">
                      {/* Priority */}
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
                    </div>
                    <div className="col-span-1">
                      {/* Status */}
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
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-4">
                    <div className="col-span-1">
                      <Field>
                        <FieldLabel>Due date</FieldLabel>
                        <Input type="date" />
                      </Field>
                    </div>
                    <div className="col-span-1">
                      <Field>
                        <FieldLabel>Tags</FieldLabel>
                        <ComboboxMulti
                          data={[
                            { label: "Tag 1", value: "tag-1" },
                            { label: "Tag 2", value: "tag-2" },
                          ]}
                          placeholder={"Select tags..."}
                          searchHint={"Search tags..."}
                        />
                      </Field>
                    </div>
                  </div>

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
                    onCheckedChange={() => handleCheckTask(item.id)}
                  />
                  <span
                    className={`text-sm ${
                      item.done == true ? "line-through" : ""
                    }`}
                  >
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
