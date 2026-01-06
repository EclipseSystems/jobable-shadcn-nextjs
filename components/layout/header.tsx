"use client";

import { useState } from "react";

import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { Book, BookOpen, CircleAlert, CircleQuestionMark, Gift, ListCheck, Map, Star } from "lucide-react";

import { IconTTButton } from "../custom/icon-tt-button";
import { IssueForm } from "../modals/issue-form";
import { ProfileMenu } from "./profile-menu";
import { ThemeToggle } from "./theme-toggle";
import { Notifications } from "./notifications";
import { RainbowButton } from "../ui/rainbow-button";
import Link from "next/link";

export default function Header() {
  const [showIssueForm, setShowIssueForm] = useState(false);

  return (
    <header className="flex sticky top-0 bg-background border-b h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger variant="ghost" className="max-md:scale-125" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-6"
        />

        <div className="flex items-center gap-2 w-full">
          <Link className="ml-auto" href="/dashboard/aperture-ai">
            <RainbowButton variant="outline" size="sm">
              <Star />Aperture AI
            </RainbowButton>
          </Link>
          <ThemeToggle />
          <IconTTButton url="/dashboard/diary" title="Diary" Icon={BookOpen} />
          <IconTTButton url="/dashboard/tasks" title="Tasks" Icon={ListCheck} />
          <Notifications />

          {/* Help center */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <CircleQuestionMark />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Support</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Book /> Help guide
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Gift /> Update log
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Map />
                Product roadmap
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setShowIssueForm(true)}>
                <CircleAlert /> Report an issue
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <IssueForm
            open={showIssueForm}
            onOpenChange={() => setShowIssueForm(!showIssueForm)}
          />

          {/* Profile menu */}
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
