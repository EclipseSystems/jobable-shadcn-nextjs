import { RadioBadgeGroup } from "../custom/radio-badge-group";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function Subscribe({ className }: { className: string }) {
  return (
    <>
      <Dialog>
        <DialogTrigger className={className}>
          <Button>Subscribe</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create subscription</DialogTitle>
          </DialogHeader>
          <FieldSet>
            <FieldGroup>
              <Field id="title">
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input type="text" />
              </Field>
              <Field id="frequency">
                <FieldLabel htmlFor="frequency">Frequency</FieldLabel>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="fortnightly">Fortnightly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </FieldSet>
          <RadioBadgeGroup
            options={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']}
          />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select frequency..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="fortnightly">Fortnightly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter>
            <DialogClose>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button type="submit">Subscribe</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
