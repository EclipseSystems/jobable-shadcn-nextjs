import { useState } from "react";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { BarChart } from "recharts";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

export default function Page() {
  const [metadata, setMetadata] = useState<Record<string, { label: string; color: string }>>({
    desktop: { label: "Desktop", color: "#3b82f6" },
    mobile: { label: "Mobile", color: "#ef4444" },
  });
  const chartConfig = metadata satisfies ChartConfig;

  return (
    <>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>

        </BarChart>
      </ChartContainer>
    </>
  )
}