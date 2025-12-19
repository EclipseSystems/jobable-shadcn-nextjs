import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, User } from "lucide-react";
import { Combobox } from "../custom/combobox";

interface AddApptProps {
  isOpen: boolean;
  onClose: () => void;
}

const clientData = [
  { value: "1", label: "Anna Ward" },
  { value: "2", label: "Kristie Hamill-Langosh" },
  { value: "3", label: "Gerardo Padberg" },
  { value: "4", label: "Bob Anderson" },
  { value: "5", label: "Lorena Reinger" },
  { value: "6", label: "Kim Keebler" },
  { value: "7", label: "Javier Emmerich" },
  { value: "8", label: "Charlie Wehner" },
  { value: "9", label: "Tracey Ziemann" },
  { value: "10", label: "Ruby Hand" },
];

export function AddAppointment({ isOpen, onClose }: AddApptProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new appointment</DialogTitle>
        </DialogHeader>

        {/* Main content */}
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Client name</FieldLabel>
              <Combobox
                data={clientData}
                placeholder={"Select a client..."}
                searchHint={"Search clients..."}
              />
            </Field>
            <Field>
              <FieldLabel>Appointment date</FieldLabel>
              <Input type="date" />
            </Field>
            <Field>
              <FieldLabel>Start time</FieldLabel>
              <Input type="time" />
            </Field>
            <Field>
              <FieldLabel>End time</FieldLabel>
              <Input type="time" />
            </Field>
            <Field>
              <FieldLabel>Appointment method</FieldLabel>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">
                    <Phone />
                    Phone
                  </SelectItem>
                  <SelectItem value="face">
                    <User />
                    Face-to-face
                  </SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </FieldSet>

        <DialogFooter>
          <DialogClose>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
