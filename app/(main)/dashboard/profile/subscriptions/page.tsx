import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Heading } from "@/components/layout/formatting"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"

const subData = [
  { name: "Marketing", table: "Clients", frequency: "Daily", created: "07/01/2026", next: "08/01/2026" },
  { name: "IEA Export", table: "Client leads", frequency: "Weekly", created: "08/01/2026", next: "15/01/2026" },
  { name: "Leadership Export", table: "Organisations", frequency: "Monthly", created: "09/01/2026", next: "09/02/2026" },
  { name: "IEA Contacts", table: "Contacts", frequency: "Fortnightly", created: "10/01/2026", next: "24/01/2026" }
]

export default function Page() {
  return (
    <div className="flex flex-col w-full gap-2">
      <Heading title="Subscriptions" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Table</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Next release</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subData.map((row) => (
            <TableRow>
              {Object.values(row).map((cell) => (
                <TableCell key={cell}>{cell}</TableCell>
              ))}
              <TableCell>
                <div className="flex gap-1">
                  <Button className="ml-auto" variant="outline" size="icon-sm"><Pencil /></Button>
                  <Button variant="destructive" size="icon-sm"><Trash /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}