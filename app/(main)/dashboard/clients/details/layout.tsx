"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PageTitle } from "@/components/layout/formatting";
import { links } from "./_lib/links";
import { Clock, DollarSign, Notebook, Plus } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Card>
        <CardContent>
          <div className="flex">
            <PageTitle title="Client details" />
            <DropdownMenu>
              <DropdownMenuTrigger className="ml-auto">
                <Button size="sm">New <Plus /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem><Clock /> New appointment</DropdownMenuItem>
                <DropdownMenuItem><DollarSign /> New expense</DropdownMenuItem>
                <DropdownMenuItem><Notebook /> New note</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Separator className="my-4 lg:my-6" />
          <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
            <aside className="top-0 lg:sticky lg:w-1/5">
              {/* Sidebar nav */}
              <ScrollArea
                type="always"
                className="bg-card hidden w-full min-w-40 px-1 py-2 md:block"
              >
                <nav className="flex space-x-2 py-1 lg:flex-col lg:space-y-1 lg:space-x-0">
                  {links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.url}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        usePathname() === link.url
                          ? "bg-muted hover:bg-accent"
                          : "hover:bg-accent hover:underline",
                        "justify-start"
                      )}
                    >
                      <span className="me-2">
                        <link.icon />
                      </span>
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </ScrollArea>
            </aside>
            <div className="flex w-full overflow-y-hidden p-1">{children}</div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
