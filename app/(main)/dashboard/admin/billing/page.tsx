"use client";

import * as React from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";

import { Heading, SubHeading } from "@/components/layout/formatting";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleCheck, Download, Info } from "lucide-react";

export default function Page() {
  const storageUsed = 33;
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  React.useEffect(() => {
    const controls = animate(count, storageUsed, { duration: 3 });
    return () => controls.stop();
  }, []);

  return (
    <>
      <div className="flex-row w-full space-y-4">
        <Heading title="Billing" />

        {/* Overview */}
        <SubHeading title="Overview" />

        {/* Storage */}
        <div className="flex items-center gap-4">
          <SubHeading title="Storage" />
          <Button variant="outline" size="sm">
            Buy more storage
          </Button>
        </div>

        <div className="flex items-baseline gap-1.5">
          <p className="flex text-4xl font-bold">
            <motion.pre className="font-sans">{rounded}</motion.pre>%
          </p>
          <p className="text-sm">used</p>
          <p className="ml-auto text-sm text-muted-foreground">
            21.12 of 64.00 GB used
          </p>
        </div>
        <Progress value={storageUsed} />

        {/* Licensing */}
        <SubHeading title="Licensing" />

        {/* Payment information */}
        <div className="flex items-center gap-4">
          <SubHeading title="Payment information" />
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger>
              <Button disabled variant="outline" size="sm">
                Change payment method <Info />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="text-sm">
                You do not have permission to use this feature. Please contact
                your administrator.
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>

        <div className="grid grid-cols-4 border w-full rounded-lg p-4">
          <div className="col-span-1">
            <p className="text-sm font-bold">Method</p>
            <p className="text-sm">Credit card</p>
          </div>
          <div className="col-span-1">
            <p className="text-sm font-bold">Cardholder name</p>
            <p className="text-sm">Isaac Nicol</p>
          </div>
          <div className="col-span-1">
            <p className="text-sm font-bold">Card number</p>
            <p className="text-sm">----&nbsp;----&nbsp;----&nbsp;--69</p>
          </div>
          <div className="col-span-1">
            <p className="text-sm font-bold">Expiry date</p>
            <p className="text-sm">01/2028</p>
          </div>
        </div>

        {/* Invoice history */}
        <SubHeading title="Invoice history" />
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>A137-14651</TableCell>
              <TableCell>
                <Badge>
                  <CircleCheck /> Paid
                </Badge>
              </TableCell>
              <TableCell>Credit card</TableCell>
              <TableCell>$199.00</TableCell>
              <TableCell>01/12/2025</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="outline" size="icon-sm">
                        <Download />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download invoice</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
