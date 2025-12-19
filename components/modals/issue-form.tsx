import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { severity } from "@/lib/options"
import { CircleSmall, Siren } from "lucide-react"

export function IssueForm({ open, onOpenChange }:{
  open: boolean
  onOpenChange: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-240">
        <DialogHeader>
          <DialogTitle>Report an issue</DialogTitle>
          <DialogDescription>
            If you encounter any difficulties using this platform, please report them using the form below and our support team will take action as quickly as possible.
          </DialogDescription>
        </DialogHeader>

        {/* Main content */}
        <div className="grid grid-cols-2">
          <div className="col-span-1 space-y-3">
            <Label htmlFor="email">What is the severity of your issue?</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Issue severity" />
              </SelectTrigger>
              <SelectContent>
                {severity.map((item) => (
                  <SelectItem value={item.value}>
                    <item.icon className={item.color}/>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label htmlFor="email">Please select an issue category</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Issue category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Label>Please describe in detail the issue you're experiencing:</Label>
            <Textarea className="resize-none" />
            <Label>How would you prefer to be contacted?</Label>
            <RadioGroup defaultValue="email" className='flex items-center gap-4'>
              {[{name: 'Email', value: 'email'},{name: 'Phone', value: 'phone'}].map((item) => (
                <div key={item.value} className="flex items-center gap-2">
                <RadioGroupItem value={item.value} id={item.value} />
                <Label htmlFor={item.value}>{item.name}</Label>
              </div>
              ))}
            </RadioGroup>
          </div>
          <div className="col-span-1"></div>
        </div>

        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}