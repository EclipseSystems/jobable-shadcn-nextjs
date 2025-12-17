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

interface AddOrgProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddOrganisation({ isOpen, onClose }: AddOrgProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new organisation</DialogTitle>
        </DialogHeader>

        {/* Main content */}
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Company name</FieldLabel>
              <Input type="text" />
            </Field>
            <Field>
              <FieldLabel>Trading as</FieldLabel>
              <Input type="text" />
            </Field>
            <Field>
              <FieldLabel>City</FieldLabel>
              <Input type="text" />
            </Field>
            <Field>
              <FieldLabel>Sector</FieldLabel>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select an industry..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Accommodation and Food Services">
                    Accommodation and Food Services
                  </SelectItem>
                  <SelectItem value="Administrative and Support Services">
                    Administrative and Support Services
                  </SelectItem>
                  <SelectItem value="Agriculture, Forestry and Fishing">
                    Agriculture, Forestry and Fishing
                  </SelectItem>
                  <SelectItem value="Arts and Recreation Services">
                    Arts and Recreation Services
                  </SelectItem>
                  <SelectItem value="Construction">Construction</SelectItem>
                  <SelectItem value="Education and Trainin">
                    Education and Training
                  </SelectItem>
                  <SelectItem value="Electricity, Gas, Water and Waste Services">
                    Electricity, Gas, Water and Waste Services
                  </SelectItem>
                  <SelectItem value="Financial and Insurance Services">
                    Financial and Insurance Services
                  </SelectItem>
                  <SelectItem value="Health Care and Social Assistance">
                    Health Care and Social Assistance
                  </SelectItem>
                  <SelectItem value="Information Media and Telecommunications">
                    Information Media and Telecommunications
                  </SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Mining">Mining</SelectItem>
                  <SelectItem value="Other Services">Other Services</SelectItem>
                  <SelectItem value="Professional, Scientific and Technical Services">
                    Professional, Scientific and Technical Services
                  </SelectItem>
                  <SelectItem value="Public Administration and Safety">
                    Public Administration and Safety
                  </SelectItem>
                  <SelectItem value="Rental, Hiring and Real Estate Services">
                    Rental, Hiring and Real Estate Services
                  </SelectItem>
                  <SelectItem value="Retail Trade">Retail Trade</SelectItem>
                  <SelectItem value="Transport, Postal and Warehousing">
                    Transport, Postal and Warehousing
                  </SelectItem>
                  <SelectItem value="Wholesale Trade">
                    Wholesale Trade
                  </SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Business size</FieldLabel>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a business size..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">
                    Small (less than 20 employees)
                  </SelectItem>
                  <SelectItem value="medium">
                    Medium (20-199 employees)
                  </SelectItem>
                  <SelectItem value="large">
                    Large (more than 200 employees)
                  </SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Main contact</FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>

        <DialogFooter>
          <DialogClose>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
