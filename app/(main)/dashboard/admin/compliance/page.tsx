"use client"

import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { Heading, SubHeading } from "@/components/layout/formatting";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Save } from "lucide-react";

export default function Page() {
  const [downOpen, setDownOpen] = useState(false)

  return (
    <div className="w-full space-y-4">
      <Heading title="Compliance" />
      <SubHeading title="Data retention" />
      <p className="text-sm text-muted-foreground">
        Please select your required data retention period. This will depend on
        your current obligations under national information security
        legislation.
      </p>
      <div className="flex gap-2">
        <Select>
          <SelectTrigger className="w-70">
            <SelectValue placeholder="Select a data retention period..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">30 days</SelectItem>
            <SelectItem value="60">60 days</SelectItem>
            <SelectItem value="90">90 days</SelectItem>
            <SelectItem value="120">120 days</SelectItem>
            <SelectItem value="180">180 days</SelectItem>
          </SelectContent>
        </Select>
        <Button><Save />Save</Button>
      </div>
      <SubHeading title="Audit logs" />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-left font-medium">
              Table exports
            </TableCell>
            <TableCell className="text-right">
              <Dialog>
                <DialogTrigger>
                  <Button size="sm">Download</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Please select a date range</DialogTitle>
                  </DialogHeader>
                  <FieldSet>
                    <Field id="range">
                      <FieldLabel htmlFor="range">Date range</FieldLabel>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a date period..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hour">Last hour</SelectItem>
                          <SelectItem value="today">Last day</SelectItem>
                          <SelectItem value="yesterday">
                            Last two days
                          </SelectItem>
                          <SelectItem value="week">Last week</SelectItem>
                          <SelectItem value="fortnight">
                            Last fortnight
                          </SelectItem>
                          <SelectItem value="month">Last month</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </FieldSet>
                  <DialogFooter>
                    <DialogClose>
                      <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <Button
                      type="submit"
                    >
                      Submit
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
