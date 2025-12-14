import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PageTitle } from "@/components/layout/formatting"
import { Plus } from "lucide-react"

import { faker } from "@faker-js/faker";

const methods = ['Phone', 'Face-to-face']
const results = ['ATT', 'DNA']

function generateRows() {
  const rows = [];
  for (let i = 0; i < 10; i++) {
    rows.push(
      <TableRow key={i}>
        <TableCell>{faker.person.fullName()}</TableCell>
        <TableCell>{faker.person.fullName()}</TableCell>
        <TableCell>{faker.date.soon().toDateString()}</TableCell>
        <TableCell>{faker.number.int({ min: 1, max: 12 })}:00</TableCell>
        <TableCell>{faker.number.int({ min: 1, max: 12 })}:00</TableCell>
        <TableCell>{methods[faker.number.int({ max: 1 })]}</TableCell>
        <TableCell>{results[faker.number.int({ max: 1 })]}</TableCell>
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
          <div className="flex items-center mb-4 gap-4">
            <PageTitle title={'Appointments'}/>
            <Button variant="outline" size="icon"><Plus /></Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Case manager</TableHead>
                <TableHead>Appointment date</TableHead>
                <TableHead>Start date</TableHead>
                <TableHead>End date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {generateRows()}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}