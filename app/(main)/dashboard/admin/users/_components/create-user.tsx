import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CreateUser() {
  return (
    <>
      <Drawer direction="right">
        <DrawerTrigger>
          <Button size="sm">Create user</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create new user</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <FieldSet>
              <FieldGroup>
                <Field id="name"><FieldLabel htmlFor="name">Name</FieldLabel><Input type="text"/></Field>
                <Field id="email"><FieldLabel htmlFor="email">Email address</FieldLabel><Input type="email"/></Field>
                <Field id="role"><FieldLabel htmlFor="role">Role</FieldLabel>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Global Administrator</SelectItem>
                    <SelectItem value="billing">Billing Administrator</SelectItem>
                  </SelectContent>
                </Select></Field>
              </FieldGroup>
            </FieldSet>
          </div>
          <DrawerFooter>
            <Button>Create user</Button>
            <DrawerClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}