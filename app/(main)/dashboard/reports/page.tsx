"use client";

import { faker } from "@faker-js/faker";
import Link from "next/link";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Editable } from "@/components/custom/editable";
import { PageTitle } from "@/components/layout/formatting";
import { ReportOptions } from "./_components/report-options";
import { ScrollArea } from "@/components/ui/scroll-area";

const chartConfig = {
  commencements: { label: "Commencements", color: "var(--chart-1)" },
  exits: { label: "Exits", color: "var(--chart-2)" },
} satisfies ChartConfig;

function fakeData() {
  const rows = [];
  for (let i = 1; i < 32; i++) {
    rows.push({
      day: i,
      commencements: faker.number.int({ min: 80, max: 200 }),
      exits: faker.number.int({ min: 10, max: 50 }),
    });
  }
  return rows;
}

export default function Page() {
  return (
    <>
      <Card>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <PageTitle title="Reports" />
              <Link href="/dashboard/reports/editor">
                <Button>Create report</Button>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Editable className="text-lg font-medium" label="Example Report"/>
              <ReportOptions className="ml-auto" />
            </div>
            <Tabs defaultValue="table">
              <TabsList className="w-full">
                <TabsTrigger value="report">Report</TabsTrigger>
                <TabsTrigger value="table">Table</TabsTrigger>
              </TabsList>
              <TabsContent value="report">
                <div className="grid grid-cols-1 h-full w-full border rounded-md">
                  <ChartContainer config={chartConfig} className="w-full">
                    <LineChart data={fakeData()} margin={{ right: 40, top: 40, bottom: 20 }}>
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} />
                      <YAxis orientation="left" axisLine={false} tickLine={false} tickCount={6} />
                      <ChartTooltip content={<ChartTooltipContent hideLabel />}/>
                      <ChartLegend content={<ChartLegendContent />} />
                      <Line dataKey="commencements" stroke="var(--color-commencements)" />
                      <Line dataKey="exits" stroke="var(--color-exits)" />
                    </LineChart>
                  </ChartContainer>
                </div>
              </TabsContent>
              <TabsContent value="table">
                <ScrollArea className="h-150">
                  <Table>
                    <TableHeader>
                      <TableRow>
                      {Object.keys(fakeData()[0]).map((header) => (
                        <TableHead key={header.indexOf.toString()}>
                          {header.charAt(0).toUpperCase() + header.slice(1)}
                        </TableHead>
                      ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fakeData().map((row) => (
                        <TableRow>
                          {Object.values(row).map((cell) => (
                            <TableCell>{cell}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
