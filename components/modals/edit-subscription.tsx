import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Pencil } from "lucide-react"
import { frequencies, tables } from "@/lib/options"


export function EditSub() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="icon-sm" variant="outline"><Pencil /></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit subscription</DialogTitle>
        </DialogHeader>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Subscription name</FieldLabel>
              <Input />
            </Field>
            <Field>
              <FieldLabel>Table</FieldLabel>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Please select a table..." />
                </SelectTrigger>
                <SelectContent>
                  {tables.map((option) => (
                    <SelectItem value={option.value}>{option.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Frequency</FieldLabel>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Please select a frequency..." />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((option) => (
                    <SelectItem value={option.value}>{option.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </FieldSet>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}