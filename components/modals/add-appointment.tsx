"use client";

import { useState } from "react";
import { formatDateRange } from "little-date";

import { Button } from "@/components/ui/button";
import { Combobox } from "../custom/combobox";
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

const events = [
  {
    title: "Team Sync Meeting",
    from: "2025-06-12T09:00:00",
    to: "2025-06-12T10:00:00",
  },
  {
    title: "Design Review",
    from: "2025-06-12T11:30:00",
    to: "2025-06-12T12:30:00",
  },
  {
    title: "Client Presentation",
    from: "2025-06-12T14:00:00",
    to: "2025-06-12T15:00:00",
  },
];

export function AddAppointment({ isOpen, onClose }: AddApptProps) {
  const [thisDate, setThisDate] = useState<Date | undefined>(new Date());

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-1/2">
        <DialogHeader>
          <DialogTitle>Create new appointment</DialogTitle>
        </DialogHeader>

        {/* Main content */}
        <div className="grid grid-cols-3 w-full">
          <div className="col-span-2">
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
                  <Input
                    value={thisDate?.toISOString().split("T")[0]}
                    onChange={(e) => setThisDate(new Date(e.target.value))}
                    type="date"
                  />
                </Field>
                <div className="grid grid-cols-2 w-full gap-2">
                  <Field>
                    <FieldLabel>Start time</FieldLabel>
                    <Input type="time" />
                  </Field>
                  <Field>
                    <FieldLabel>End time</FieldLabel>
                    <Input type="time" />
                  </Field>
                </div>

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
          </div>

          {/* Appointment helper */}
          <div className="col-span-1">
            <div className="flex flex-col items-start gap-3 px-4">
              <div className="flex w-full items-center justify-between px-1">
                <div className="text-sm font-medium">
                  {thisDate?.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div className="flex w-full flex-col gap-2">
                {events.map((event) => (
                  <div
                    key={event.title}
                    className="bg-muted after:bg-primary/70 relative rounded-md p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full"
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-muted-foreground text-xs">
                      {formatDateRange(
                        new Date(event.from),
                        new Date(event.to)
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

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
