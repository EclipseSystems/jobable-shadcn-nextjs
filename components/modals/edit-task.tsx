import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { priority, status } from "@/app/(main)/dashboard/tasks/_lib/types";

interface EditTaskProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditTask({ isOpen, onClose }: EditTaskProps) {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="min-w-2/3">
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <FieldSet>
              <div className="col-span-1">
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
                </FieldGroup>
              </div>
              <div className="col-span-1">
                <FieldGroup>
                  <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea />
                  </Field>
                </FieldGroup>
              </div>
            </FieldSet>
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
