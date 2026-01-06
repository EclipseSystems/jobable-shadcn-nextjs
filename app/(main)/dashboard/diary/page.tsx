import { faker } from "@faker-js/faker";

import { PageTitle } from "@/components/layout/formatting";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import RichTextEditor from "@/components/editor/rich-text-editor";
import { ScrollArea } from "@/components/ui/scroll-area";

function generateRows() {
  const rows = [];
  for (let i = 0; i < 20; i++) {
    rows.push(
      <TableRow key={i}>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell><p className="w-100 overflow-hidden text-ellipsis">{faker.lorem.sentence({ min: 10, max: 30 })}</p></TableCell>
        <TableCell><p>{faker.date.soon().toDateString()}</p></TableCell>
      </TableRow>
    );
  }
  return rows;
}

export default function Page() {
  return (
    <>
      <Card>
        <CardContent>
          <div className="space-y-4 gap-6 h-[calc(100vh-10rem)]">
            <PageTitle title="Diary" />
            <Button size="sm">Add entry</Button>
            <div className="w-full grid grid-cols-2">
              <div className="col-span-1 h-[calc(100vh-16rem)] border-r pr-4">
                <ScrollArea className="h-full">
                  <Table>
                    <TableBody>
                      {generateRows()}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
              <div className="col-span-1 pl-4 h-full">
                <RichTextEditor />
                <div className="flex w-full gap-2">
                  <Button className="ml-auto" variant="outline" size="sm">Save as draft</Button>
                  <Button size="sm">Save</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
