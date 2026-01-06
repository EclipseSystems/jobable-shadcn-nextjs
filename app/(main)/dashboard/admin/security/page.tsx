import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Heading, SubHeading } from "@/components/layout/formatting";

export default function Page() {
  return (
    <div className="space-y-4">
      <Heading title="Security" />
      <SubHeading title="Session timeout" />
      <p className="text-sm text-muted-foreground">Automatically sign out users after:</p>
      <div className="flex gap-2 items-center">
        <Select>
          <SelectTrigger className="w-60">
            <SelectValue placeholder="Select a time..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">30 minutes</SelectItem>
            <SelectItem value="60">1 hour</SelectItem>
            <SelectItem value="1440">1 day</SelectItem>
            <SelectItem value="10080">1 week</SelectItem>
            <SelectItem value="43200">1 month</SelectItem>
            <SelectItem value="0">Never (not recommended)</SelectItem>
          </SelectContent>
        </Select>
        <Button>Save</Button>
      </div>
      <SubHeading title="IP whitelisting" />
      <p className="text-sm text-muted-foreground">Configure this to restrict device access based on the IP address of your corporate network.</p>
    </div>
  )
}