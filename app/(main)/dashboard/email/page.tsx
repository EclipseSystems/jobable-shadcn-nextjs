"use client";

import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock, File, Forward, Inbox, Mail, MailOpen, Menu, Paperclip, Pencil, Plus, Reply, SearchIcon, Send, Speech, Star, Tag } from "lucide-react";

import EmailData from "./_lib/data.json"
import { NewLabel } from "./_components/new-label";
import { NewEmail } from "./_components/new-email";
import { PageTitle } from "@/components/layout/formatting";

const folders = [
  { icon: Inbox, name: "Inbox", number: 7 },
  { icon: Send, name: "Sent", number: 3 },
  { icon: Pencil, name: "Drafts", number: 3 },
  { icon: Star, name: "Starred", number: 6 },
];

function EmailButton({ title, children }: { title: string; children: React.ReactNode; }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger><Button size="icon" variant="ghost">{children}</Button></TooltipTrigger>
        <TooltipContent><p>{title}</p></TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function Page() {
  const [newLabelOpen, setNewLabelOpen] = useState(false);
  const [showNewEmail, setShowNewEmail] = useState(false);

  return (
    <>
      <Card>
        <CardContent>
          <div className="space-y-4 gap-6 h-[calc(100vh-10rem)]">
            <div className="flex items-center mb-4">
              <PageTitle title={"Email"} />
            </div>
          </div>
        </CardContent>
      </Card>
      <NewLabel isOpen={newLabelOpen} onClose={() => setNewLabelOpen(false)} />
    </>
  );
}
