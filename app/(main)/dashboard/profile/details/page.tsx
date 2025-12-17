import { ComboboxMulti } from "@/components/custom/multi-combo";
import { Heading, SubHeading } from "@/components/layout/formatting";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { timezones, weekdays } from "@/lib/options";

const sampleData = [
  {value: 'Mitchell Nugent', label: 'Name'},
  {value: 'mitchell.nugent@epicassist.org', label: 'Email address'},
  {value: 'Nundah', label: 'Location'},
  {value: 'All weekdays', label: 'Working days'},
  {value: '8:30am to 5:00pm', label: 'Working hours'},
  {value: 'Australian Eastern Standard Time (AEST)', label: 'Time zone'},
]

const fields = [
  { label: "Name", field: <Input type="text" /> },
  { label: "Email address", field: <Input type="email" /> },
  { label: "Location", field: <Input type="text" /> },
  {
    label: "Working days",
    field: <ComboboxMulti data={weekdays} placeholder={"Select weekdays"} searchHint={"Search weekdays"} />
  },
  {
    label: "Working hours",
    field: <div className="flex items-center gap-2"><Input type="time" /><p className="text-sm">to</p><Input type="time" /></div>
  },
  {
    label: "Time zone",
    field: (
      <Select>
        <SelectTrigger><SelectValue placeholder="Select a time zone..." /></SelectTrigger>
        <SelectContent>
          {timezones.map((timezone) => (
            <SelectItem value={timezone.value}>{timezone.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  },
];

export default function Page() {
  return (
    <div className="w-full space-y-4">
      <Heading title="User profile" />
      <SubHeading title="Image" />
      <SubHeading title="Details" />
      <Drawer direction="right">
        <DrawerTrigger>
          <Button size="sm">Edit details</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit user details</DrawerTitle>
          </DrawerHeader>

          {/* Main content */}
          <FieldSet className="p-4">
            <FieldGroup>
              {fields.map((field) => (
                <Field>
                  <FieldLabel>{field.label}</FieldLabel>
                  {field.field}
                </Field>
              ))}
            </FieldGroup>
          </FieldSet>

          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="grid grid-cols-3 grid-rows-2 gap-4 p-4 border rounded-lg">
        {sampleData.map((row) => (
          <div className="col-span-1 row-span-1">
            <p className="text-sm font-bold">{row.label}</p>
            <p className="text-sm">{row.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
