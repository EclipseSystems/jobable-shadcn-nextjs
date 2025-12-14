import { Button } from "@/components/ui/button";
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

import { faker } from "@faker-js/faker";
import { Plus } from "lucide-react";
import Link from "next/link";

function generateRows() {
  const rows = [];
  for (let i = 0; i < 10; i++) {
    rows.push(
      <TableRow key={i}>
        <TableCell>{i + 1}</TableCell>
        <TableCell>{faker.person.fullName()}</TableCell>
        <TableCell>{faker.person.sex()}</TableCell>
        <TableCell>{faker.date.birthdate().toDateString()}</TableCell>
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
            <PageTitle title={'Clients'}/>
            <Link href="">
            <Button variant="outline" size="icon"><Plus /></Button>
            </Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Date of birth</TableHead>
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