"use client";

import { useCallback, useState } from "react";
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
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerFormatSelect,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "@/components/ui/color-picker";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
  SortableOverlay,
} from "@/components/ui/sortable";

import { PageTitle } from "@/components/layout/formatting";
import { ChangeChart } from "../_components/change-chart";
import { VerticalAlignmentType } from "recharts/types/component/DefaultLegendContent";
import { GripHorizontal } from "lucide-react";

const chartData = [
  { month: "January", desktop: 186, mobile: 80, tablet: 90 },
  { month: "February", desktop: 305, mobile: 200, tablet: 149 },
  { month: "March", desktop: 237, mobile: 120, tablet: 65 },
  { month: "April", desktop: 73, mobile: 190, tablet: 150 },
  { month: "May", desktop: 209, mobile: 130, tablet: 48 },
  { month: "June", desktop: 214, mobile: 140, tablet: 111 },
];

const presetColors = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#64748b", // gray
];

export default function Page() {
  const [chartOpen, setChartOpen] = useState(false);
  const [legend, setLegend] = useState(false);
  const [legendVAlign, setLegendVAlign] = useState("bottom");
  const [metadata, setMetadata] = useState<Record<string, { label: string; color: string }>>({
    desktop: { label: "Desktop", color: "#3b82f6" },
    mobile: { label: "Mobile", color: "#ef4444" },
    tablet: { label: "Tablet", color: "#ebb207" }
  });
  const [columns, setColumns] = useState(metadata)
  const chartConfig = metadata satisfies ChartConfig;

  const onPresetSelect = useCallback((presetColor: string, key: string) => {
    setColumns({ ...columns, [key]: { ...columns[key], color: presetColor } });
  }, [columns]);

  return (
    <>
      <Card>
        <CardContent>
          <div className="space-y-4">
            <PageTitle title="Report Builder" />
            <div>
              {/* Toolbar */}
              <div className="flex border rounded-t-lg gap-2 p-2">
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>
                        Save report
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>

                  <MenubarMenu>
                    <MenubarTrigger>Customise</MenubarTrigger>
                    <MenubarContent>
                      <MenubarGroup>
                        <MenubarItem onClick={() => setChartOpen(true)}>
                          Change chart
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarSub>
                          <MenubarSubTrigger>Legend</MenubarSubTrigger>
                          <MenubarSubContent>
                            <MenubarGroup>
                              <MenubarItem onClick={() => setLegend(!legend)}>{legend ? "Disable" : "Enable"}</MenubarItem>
                            </MenubarGroup>
                            <MenubarSeparator />
                            <MenubarGroup>
                              <MenubarLabel>Vertical align</MenubarLabel>
                              <MenubarCheckboxItem
                                disabled={!legend}
                                checked={legendVAlign === "top" && legend}
                                onCheckedChange={() => setLegendVAlign("top")}
                              >
                                Top
                              </MenubarCheckboxItem>
                              <MenubarCheckboxItem
                                disabled={!legend}
                                checked={legendVAlign === "bottom" && legend}
                                onCheckedChange={() => setLegendVAlign("bottom")}
                              >
                                Bottom
                              </MenubarCheckboxItem>
                            </MenubarGroup>
                          </MenubarSubContent>
                        </MenubarSub>
                        <MenubarSeparator />
                        <MenubarLabel>Other options</MenubarLabel>
                        <MenubarCheckboxItem>Tooltip</MenubarCheckboxItem>
                      </MenubarGroup>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
              <div className="grid grid-cols-5 border-x border-b rounded-b-lg">

                {/* X-axis dropdown */}
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

                  {/* Y-axis dropdown */}
                  <Label htmlFor="text">Y-axis</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full">
                      <Button
                        className="p-3 font-normal justify-start w-full"
                        variant={"outline"}
                      >
                        Select fields...
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {Object.entries(metadata).map(([key, field]) => (
                        <DropdownMenuCheckboxItem
                          checked={Object.entries(columns).some(([colKey]) => colKey === key)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setColumns({ ...columns, [key]: field });
                            } else {
                              const updatedColumns = { ...columns };
                              delete updatedColumns[key];
                              setColumns(updatedColumns);
                            }
                          }}
                          key={key}
                        >
                          {field.label}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Filter dropdown */}
                  <Label htmlFor="text">Filter</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full">
                      <Button
                        className="p-3 font-normal justify-start w-full"
                        variant={"outline"}
                      >
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
                    {Object.entries(columns).length === 0 && (
                      <div className="flex p-2">
                        <span className="text-sm text-muted-foreground">No fields selected</span>
                      </div>
                    )}
                    <Sortable
                      value={Object.entries(columns).map(([key]) => key)}
                      onValueChange={(newOrder) => {
                        const reorderedColumns: Record<string, { label: string; color: string }> = {};
                        newOrder.forEach((key) => {
                          reorderedColumns[key] = columns[key];
                        });
                        setColumns(reorderedColumns);
                      }}
                    >
                      <SortableContent>
                        {Object.entries(columns).map(([key, field]) =>
                          <SortableItem key={key} value={key} asChild>
                            <div className="flex h-fit border rounded-md p-2 items-center bg-card gap-2">
                              <ColorPicker
                                value={field.color}
                                onValueChange={(e) => setColumns({ ...columns, [key]: { ...columns[key], color: e.toString() } })}
                                defaultFormat="hex"
                              >
                                <ColorPickerTrigger asChild>
                                  <ColorPickerSwatch className="size-5" />
                                </ColorPickerTrigger>
                                <ColorPickerContent>
                                  <ColorPickerArea />
                                  <div className="flex items-center gap-2">
                                    <ColorPickerEyeDropper />
                                    <div className="flex flex-1 flex-col gap-2">
                                      <ColorPickerHueSlider />
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <h4 className="font-medium text-sm">Preset Colors</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {presetColors.map((presetColor) => (
                                        <button
                                          key={presetColor}
                                          type="button"
                                          className="size-6 rounded border-2 border-transparent hover:border-border focus:border-ring focus:outline-none"
                                          style={{ backgroundColor: presetColor }}
                                          onClick={() => onPresetSelect(presetColor, key)}
                                          aria-label={`Select color ${presetColor}`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <ColorPickerFormatSelect />
                                    <ColorPickerInput />
                                  </div>
                                </ColorPickerContent>
                              </ColorPicker>
                              <span className="text-sm">{field.label}</span>
                              <SortableItemHandle className="ml-auto" asChild>
                                <Button variant="ghost" className="size-6"><GripHorizontal/></Button>
                              </SortableItemHandle>
                            </div>
                          </SortableItem>
                        )}
                      </SortableContent>
                      <SortableOverlay />
                    </Sortable>
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
                      <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                      {legend && (
                        <ChartLegend
                          verticalAlign={legendVAlign as VerticalAlignmentType}
                          content={<ChartLegendContent />}
                        />
                      )}
                      {Object.entries(columns).map(([key, field]) => (
                        <Bar
                          key={key}
                          dataKey={key}
                          stackId="a"
                          fill={`var(--color-${field.label.toLowerCase()})`}
                          radius={[0, 0, 0, 0]}
                        />
                      ))}
                    </BarChart>
                  </ChartContainer>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <ChangeChart isOpen={chartOpen} onClose={() => setChartOpen(false)} />
    </>
  );
}
