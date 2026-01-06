"use client";

import { useState } from "react";

import { Heading, SubHeading } from "@/components/layout/formatting";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function Page() {
  const [size, setSize] = useState([2]);
  return (
    <div className="space-y-4">
      <Heading title="Display" />
      <SubHeading title="Text size" />
      <div>
        <div className="flex gap-4 items-center">
          <Slider value={size} onValueChange={(value) => setSize(value)} className="w-80" defaultValue={[2]} max={4} step={1} />
          <Button size="sm"><Save /> Save</Button>
        </div>
        <span className="text-sm">
          {size[0] === 0 ? "Smaller" : size[0] === 1 ? "Small" : size[0] === 2 ? "Medium" : size[0] === 3 ? "Large" : "Extra large"}
        </span>
      </div>
    </div>
  );
}
