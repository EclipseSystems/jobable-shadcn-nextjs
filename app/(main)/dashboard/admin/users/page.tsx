import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Heading } from "@/components/layout/formatting";
import { tabs, users } from "./_lib/data";
import { UserActions } from "./_components/user-actions";

export default function Page() {
  return (
    <div className="w-full space-y-4">
      <Heading title="User management" />

      {/* Tabs */}
      <div className="w-full">
        <Tabs defaultValue={tabs[0].value} className="gap-4">
          <TabsList className="bg-background rounded-none border-b p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none"
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Users tab */}
          <TabsContent className="space-y-2" key={tabs[0].value} value={tabs[0].value}>
            <Button size="sm">Create user</Button>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>User name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.name}>
                    <TableCell className="flex items-center gap-3">
                      <Avatar>
                        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                        <AvatarFallback>
                          {user.name.split(" ", 2)[0][0]}
                          {user.name.split(" ", 2)[1][0]}
                        </AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "Inactive" ? "outline" : "default"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell><UserActions /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent className="space-y-2" key={tabs[1].value} value={tabs[1].value}>
            <Button size="sm">Create group</Button>
          </TabsContent>

          <TabsContent className="space-y-2" key={tabs[2].value} value={tabs[2].value}>
            <Button size="sm">Create role</Button>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
