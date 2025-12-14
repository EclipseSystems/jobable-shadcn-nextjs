import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CircleCheck, Download } from "lucide-react"

export default function Page() {
  return (
    <>
      <div className="flex-row w-full space-y-4">
        <h1 className="text-xl font-bold">Billing</h1>
        <h2 className="text-md font-medium">Overview</h2>
        <h2 className="text-md font-medium">Storage</h2>
        <Progress value={33} />
        <h2 className="text-md font-medium">Licensing</h2>
        <h2 className="text-md font-medium">Payment information</h2>
        <h2 className="text-md font-medium">Invoice history</h2>

        <Table className="w-full">
          <TableCaption>A list of your recent invoices.</TableCaption>
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
              <TableCell><Badge><CircleCheck/> Paid</Badge></TableCell>
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
  )
}