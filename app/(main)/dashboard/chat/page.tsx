import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";

import { Ellipsis, Mic, Paperclip, Phone, Send, Smile, Video } from "lucide-react";

export default function Page() {
  return (
    <>
      <div className="flex flex-col h-full w-full space-y-4">
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Nickola Peever</span>
            <span className="text-xs">Online</span>
          </div>
          <div className="flex gap-2 ml-auto">
            <Button variant="ghost" size="icon-sm"><Video /></Button>
            <Button variant="ghost" size="icon-sm"><Phone /></Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" size="icon-sm"><Ellipsis /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>View profile</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="relative flex items-center mt-auto rounded-md">
          <Input className="h-14" placeholder="Enter message..." />
          <div className="absolute end-4 flex gap-1 items-center">
            <Button variant="ghost" size="icon"><Smile /></Button>
            <Button variant="ghost" size="icon"><Paperclip /></Button>
            <Button variant="ghost" size="icon"><Mic /></Button>
            <Button><Send />Send</Button>
          </div>
        </div>
      </div>
    </>
  )
}