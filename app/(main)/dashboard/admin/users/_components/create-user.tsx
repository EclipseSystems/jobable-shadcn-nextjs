import { createClient } from "@supabase/supabase-js";
import { Controller, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const supabase = createClient('https://ssotyzpozkqtorkecznm.supabase.co', 'sb_publishable_lpD6iG5tC9Wi3v_VFfBVSg_tR2AFyjT')

export function CreateUser() {
  async function createUser() {
    const { data, error } = await supabase.auth.admin.createUser({
      email: '',
      password: '',
      user_metadata: {
        first_name: '',
        last_name: ''
      }
    })
  }

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
            <form id="create-user-form">
              <FieldSet>
                <FieldGroup>
                  <Field id="first_name"><FieldLabel htmlFor="first_name">First name</FieldLabel><Input type="text" /></Field>
                  <Field id="last_name"><FieldLabel htmlFor="last_name">Last name</FieldLabel><Input type="text" /></Field>
                  <Field id="email"><FieldLabel htmlFor="email">Email address</FieldLabel><Input type="email" /></Field>
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
            </form>
          </div>
          <DrawerFooter>
            <Button type="submit">Create user</Button>
            <DrawerClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}