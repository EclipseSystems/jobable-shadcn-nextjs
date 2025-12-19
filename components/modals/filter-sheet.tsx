import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Filter } from "lucide-react"
import { Label } from "../ui/label";

function AccItem({ key, value, name, children }: {
  key: number
  value: string
  name: string
  children?: any
}) {
  return (
    <AccordionItem key={key} value={value}>
      <AccordionTrigger className='px-5'>{name}</AccordionTrigger>
      <AccordionContent className='text-muted-foreground px-5 pt-1 space-y-2'>{children}</AccordionContent>
    </AccordionItem>
  )
}

function FilterSelect() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an option..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="starts-with">Starts with</SelectItem>
        <SelectItem value="ends-with">Ends with</SelectItem>
        <SelectItem value="contains">Contains</SelectItem>
      </SelectContent>
    </Select>
  )
}

export function FilterSheet() {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Button className="shadow-md" variant="outline" size="icon"><Filter /></Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter columns</SheetTitle>
          </SheetHeader>
          <div className="p-4">
            <Accordion type='single' collapsible className='w-full rounded-md border' defaultValue='name'>
              <AccItem key={1} value={"name"} name={"Name"}>
                <Input type="text" placeholder="Please input a keyword"/>
                <FilterSelect />
              </AccItem>
              <AccItem key={2} value={"status"} name={"Lead status"}>
                  <div className="flex items-center gap-3"><Checkbox /><Label>To convert</Label></div>
                  <div className="flex items-center gap-3"><Checkbox /><Label>Converted</Label></div>
              </AccItem>
              <AccItem key={3} value={"street"} name={"Street address"}>
                <Input type="text" placeholder="Please input a keyword"/>
                <FilterSelect />
              </AccItem>
              <AccItem key={4} value={"suburb"} name={"Suburb"}></AccItem>
              <AccItem key={5} value={"state"} name={"State"}>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a state..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="act">Australian Capital Territory</SelectItem>
                    <SelectItem value="nsw">New South Wales</SelectItem>
                    <SelectItem value="nt">Northern Territory</SelectItem>
                    <SelectItem value="qld">Queensland</SelectItem>
                    <SelectItem value="sa">South Australia</SelectItem>
                    <SelectItem value="tas">Tasmania</SelectItem>
                    <SelectItem value="vic">Victoria</SelectItem>
                    <SelectItem value="wa">Western Australia</SelectItem>                                        
                  </SelectContent>
                </Select>
              </AccItem>
              <AccItem key={6} value={"postcode"} name={"Postcode"}></AccItem>
              <AccItem key={7} value={"email"} name={"Email address"}>
                <Input type="text" placeholder="Please input a keyword"/>
                <FilterSelect />
              </AccItem>
              <AccItem key={8} value={"phone"} name={"Phone"}>
                <Input type="text" placeholder="Please input a keyword"/>
                <FilterSelect />
              </AccItem>
            </Accordion>
          </div>
          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}