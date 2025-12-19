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

function generateRows() {
  const rows = [];
  for (let i = 0; i < 20; i++) {
    rows.push(
      <TableRow key={i}>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell><p className="w-100 overflow-hidden text-ellipsis">{faker.lorem.sentence({min:10,max:30})}</p></TableCell>
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
          <div className="space-y-4 gap-6">
            <PageTitle title="Diary" />
            <Button size="sm">Add entry</Button>
            <div className="w-full grid grid-cols-2">
              <div className="col-span-1 border-r pr-4">
                <Table>
                  <TableBody>
                    {generateRows()}
                  </TableBody>
                </Table>
              </div>
              <div className="col-span-1 pl-4">
                <RichTextEditor />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
