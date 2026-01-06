"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChartArea, List } from "lucide-react";

import { PageTitle } from "@/components/layout/formatting";
import { MiniColorPicker } from "@/components/custom/min-color-picker";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function Page() {
  return (
    <>
      <Card>
        <CardContent>
          <div className="space-y-4">
            <PageTitle title="Report Builder" />
            <div>

              {/* Toolbar */}
              <div className="flex border rounded-t-lg gap-2 p-2">
                <Button size="sm">Save report</Button>
                <Button variant="outline" size="sm">
                  <ChartArea /> Change chart
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="outline" size="icon-sm">
                        <List />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Legend</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="grid grid-cols-5 border-x border-b rounded-b-lg">

                {/* Settings */}
                <div className="col-span-1 space-y-4 border-r p-3">
                  <Label htmlFor="text">X-axis</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <Label htmlFor="text">Y-axis</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full">
                      <Button className="p-3 font-normal justify-start w-full" variant={"outline"}>
                        Select fields...
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="grid border rounded-md h-fit p-1 bg-accent space-y-1">
                    <div className="flex h-fit border rounded-md p-2 items-center bg-card gap-2">
                      <MiniColorPicker />
                      <span className="text-sm">Field 1</span>
                    </div>
                    <div className="flex h-fit border rounded-md p-2 items-center bg-card gap-2">
                      <MiniColorPicker />
                      <span className="text-sm">Field 2</span>
                    </div>
                    <div className="flex h-fit border rounded-md p-2 items-center bg-card gap-2">
                      <MiniColorPicker />
                      <span className="text-sm">Field 3</span>
                    </div>
                  </div>
                </div>

                {/* Report page */}
                <div className="col-span-4 p-3">
                  <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <ChartTooltip content={<ChartTooltipContent hideLabel />}/>
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" radius={[0, 0, 4, 4]}/>
                      <Bar dataKey="mobile" stackId="a" fill="var(--color-mobile)" radius={[4, 4, 0, 0]}/>
                    </BarChart>
                  </ChartContainer>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
