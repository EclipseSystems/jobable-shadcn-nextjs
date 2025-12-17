"use client";

import { faker } from "@faker-js/faker";
import { useState } from "react";

import { PageTitle } from "@/components/layout/formatting";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

import {
  ChevronDownIcon,
  Ellipsis,
  Inbox,
  Mail,
  Pencil,
  SaveIcon,
  Search,
  Send,
  Star,
  Tag,
} from "lucide-react";
import { NewLabel } from "./_components/new-label";

const folders = [
  { icon: Inbox, name: "Inbox", number: 7 },
  { icon: Send, name: "Sent", number: 3 },
  { icon: Pencil, name: "Drafts", number: 3 },
  { icon: Star, name: "Starred", number: 6 },
];

function generateRows() {
  const emails = [];
  for (let i = 0; i < 10; i++) {
    let star = faker.number.int({ min: 0, max: 1 });
    const name = [faker.person.firstName(), faker.person.lastName()];
    emails.push(
      <TableRow>
        <TableCell>
          <Button variant="ghost" size="icon-sm">
            <Star
              className={star == 1 ? "fill-yellow-500 text-yellow-500" : ""}
            />
          </Button>
        </TableCell>
        <TableCell>
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarFallback>
                {name[0][0]}
                {name[1][0]}
              </AvatarFallback>
            </Avatar>
            {name[0].concat(" ", name[1])}
          </div>
        </TableCell>
        <TableCell className="grid grid-1">
          <p className="font-bold">{faker.lorem.sentence(5)}</p>
          <p>{faker.lorem.sentence(8)}</p>
        </TableCell>
        <TableCell>{faker.date.future().toDateString()}</TableCell>
        <TableCell>
          <Button variant="outline" size="icon-sm">
            <Ellipsis />
          </Button>
        </TableCell>
      </TableRow>
    );
  }
  return emails;
}

export default function Page() {
  const [newLabelOpen, setNewLabelOpen] = useState(false);
  const [showNewEmail, setShowNewEmail] = useState(false);

  return (
    <>
      <Card>
        <CardContent>
          <div className="flex items-center mb-4">
            <PageTitle title={"Email"} />
          </div>
          <div className={"grid grid-cols-4 gap-4"}>
            {/* Folders */}
            <div className="col-span-1 space-y-4">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild className="flex w-full">
                  <Button className="w-full">Compose</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onSelect={() => setShowNewEmail(true)}>
                    <Mail /> New email
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setNewLabelOpen(true)}>
                    <Tag /> New label
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* New email drawer */}
              <Drawer open={showNewEmail} onOpenChange={setShowNewEmail}>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>New email</DrawerTitle>
                  </DrawerHeader>

                  {/* Main content */}
                  <div className="grid grid-cols-4 px-6 gap-4">
                    <div className="col-span-1 space-y-3">
                      <Label>To:</Label>
                      <Input type="email" />
                      {/* ADD ADDRESS BOOK */}
                      <Label>CC:</Label>
                      <Input type="text" />
                      <Label>BCC:</Label>
                      <Input type="text" />
                      <Label>Subject:</Label>
                      <Input type="text" />
                      {/* ADD SUGGESTIONS */}
                      {/* ADD ATTACHMENTS */}
                    </div>
                    <div className="col-span-3">
                      <Textarea />
                    </div>
                  </div>

                  <DrawerFooter className="flex flex-row justify-center">
                    <ButtonGroup>
                      <Button>Send</Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="pl-2!">
                            <ChevronDownIcon />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="[--radius:1rem]"
                        >
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <Send />
                              Send
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <SaveIcon />
                              Save as draft
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </ButtonGroup>
                    <DrawerClose>
                      <Button variant={"outline"}>Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

              <nav className="space-y-1.5">
                {folders.map((folder) => (
                  <Button className="w-full cursor-pointer" variant="ghost">
                    <div className="flex mr-auto gap-3 items-center">
                      <folder.icon />
                      <span>{folder.name}</span>
                    </div>
                    <Badge>{folder.number}</Badge>
                  </Button>
                ))}
              </nav>
              <p className="text-sm font-bold">Labels</p>
            </div>

            {/* Email list */}
            <div className="col-span-3">
              <div className="relative mb-4">
                <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                  <Search className="size-4" />
                </div>
                <Input type="text" placeholder="Search" className="peer pl-9" />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Sender</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date/time</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{generateRows()}</TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
      <NewLabel isOpen={newLabelOpen} onClose={() => setNewLabelOpen(false)} />
    </>
  );
}
