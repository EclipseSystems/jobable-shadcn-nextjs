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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { states } from "@/lib/options";

interface AddLeadProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddLead({ isOpen, onClose }: AddLeadProps) {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="min-w-1/2">
          <DialogHeader>
            <DialogTitle>Add lead</DialogTitle>
          </DialogHeader>
          {/* Main content */}
          <FieldSet>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <FieldGroup>
                  <Field>
                    <FieldLabel>Name</FieldLabel>
                    <Input />
                  </Field>
                  <Field>
                    <FieldLabel>Email address</FieldLabel>
                    <Input type="email" />
                  </Field>
                  <Field>
                    <FieldLabel>Phone number</FieldLabel>
                    <Input />
                  </Field>
                </FieldGroup>
              </div>
              <div className="col-span-1">
                <FieldGroup>
                  <Field>
                    <FieldLabel>Street address</FieldLabel>
                    <Input />
                  </Field>
                  <Field>
                    <FieldLabel>Suburb</FieldLabel>
                    <Input />
                  </Field>
                  <Field>
                    <FieldLabel>State</FieldLabel>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel>Postcode</FieldLabel>
                    <Input type="text" />
                  </Field>
                </FieldGroup>
              </div>
            </div>
          </FieldSet>
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
