import { Heading, SubHeading } from "@/components/layout/formatting";
import { Button } from "@/components/ui/button";

export default function Integrations() {
  return (
    <div className="space-y-4">
      <Heading title="API & integrations" />
      <SubHeading title="Keys" />
      <Button>Generate API key</Button>
    </div>
  )
}