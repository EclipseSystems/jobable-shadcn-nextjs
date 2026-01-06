import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Heading } from "@/components/layout/formatting";
import { Filter, Pencil, X } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-4 w-full">
      <Heading title="Documents" />
      <div className="flex gap-2 items-center">
        <Button variant={"outline"}><Filter /> Filter by</Button>
        <Button variant={"outline"}>Bulk actions</Button>
        <Button className="ml-auto">Upload file</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead><Checkbox /></TableHead>
            <TableHead></TableHead>
            <TableHead>File name</TableHead>
            <TableHead>File size</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Uploaded by</TableHead>
            <TableHead>Uploaded on</TableHead>
            <TableHead>Last modified by</TableHead>
            <TableHead>Last modified on</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell><Checkbox /></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <div className="flex gap-2 items-center">
                <Button variant="outline" size="icon-sm"><Pencil /></Button>
                <Button variant="destructive" size="icon-sm"><X /></Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
