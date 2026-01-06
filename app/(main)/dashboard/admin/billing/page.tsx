"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { Heading, SubHeading } from "@/components/layout/formatting";
import ProgressBar from "@/components/custom/progress-bar";
import { AlertTriangle, CircleCheck, Download, Info } from "lucide-react";
import { ChangePayment } from "./_components/change-method";
import { invoices, payInfo } from "../_lib/data";
import { queryObjects } from "v8";

export default function Page() {
  const [paymentOpen, setPaymentOpen] = useState(false);

  // Storage used
  const paidStorage = 64;
  const storageUsed = 33;
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, storageUsed, { duration: 2 });
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
          <div className="flex text-4xl font-bold">
            <motion.pre className="font-sans">{rounded}</motion.pre>
            <p className="font-sans">%</p>
          </div>
          <p className="text-sm">used</p>
          <p className="ml-auto text-sm text-muted-foreground">
            {(storageUsed / 100) * paidStorage} of {paidStorage} GB used
          </p>
        </div>
        <ProgressBar
          value={storageUsed}
          barClassName={storageUsed >= 90 ? "bg-destructive" : "bg-primary"}
        />
        <Alert hidden={storageUsed < 90} variant={"destructive"}>
          <AlertTriangle />
          <AlertTitle>
            You have used over 90% of your allocated storage.
          </AlertTitle>
          <AlertDescription>
            Please either purchase additional storage or archive files to free
            up available space.
          </AlertDescription>
        </Alert>

        {/* Licensing */}
        <SubHeading title="Licensing" />

        {/* Payment information */}
        <div className="flex items-center gap-4">
          <SubHeading title="Payment information" />
          <Button
            onClick={() => setPaymentOpen(true)}
            variant="outline"
            size="sm"
          >
            Change payment method
          </Button>

          {/* Demonstration */}
          {/* <HoverCard openDelay={0} closeDelay={0}>
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
          </HoverCard> */}
        </div>

        <div className="grid grid-cols-4 border w-full rounded-lg p-4">
          {payInfo.map((row) => (
            <div className="col-span-1">
              <p className="text-sm font-bold">{row.label}</p>
              <p className="text-sm">{row.value}</p>
            </div>
          ))}
        </div>

        {/* Invoice history */}
        <SubHeading title="Invoice history" />
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {Object.keys(invoices[0]).map((header) => (
                <TableHead className="capitalize">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((row) => (
              <TableRow key={row.invoice}>
                <TableCell>{row.invoice}</TableCell>
                <TableCell><Badge>{row.status}</Badge></TableCell>
                <TableCell>{row.method}</TableCell>
                <TableCell>
                  ${Number.parseFloat(row.amount.toString()).toFixed(2)}
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell className="text-right">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="outline" size="sm"><Download /> Download</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download invoice</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ChangePayment isOpen={paymentOpen} onClose={() => setPaymentOpen(false)} />
    </>
  );
}
