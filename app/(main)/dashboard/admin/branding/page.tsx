import Image from "next/image";

import { Heading, SubHeading } from "@/components/layout/formatting";
import * as EpicLogo from "@/public/epic_logo.jpg";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="space-y-4">
      <Heading title="Branding" />
      <SubHeading title="Logo" />
      <Image src={EpicLogo} alt={"Brand logo"} width={80} />
      <p className="text-xs text-muted-foreground">JPEG, PNG and SVG images only. Dimensions & file size must be no greater than 500x500px and 2,000 KB.</p>
      <div className="flex gap-2">
        <Button>Update logo</Button>
        <Button variant="destructive">Remove logo</Button>
      </div>
    </div>
  );
}
