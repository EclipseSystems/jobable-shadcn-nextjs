import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser, LogOut } from "lucide-react";
import Link from "next/link";

export function ProfileMenu({ className, ...props }: { className?: string }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={className} {...props}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="flex w-full items-center justify-between gap-2 px-1 py-1.5">
            <Avatar className="size-9 rounded-lg">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Mitchell Nugent</span>
              <span className="truncate text-xs capitalize">
                Systems Analyst
              </span>
            </div>
          </div>
          <DropdownMenuSeparator />
          <Link href="/dashboard/profile">
            <DropdownMenuItem>
              <CircleUser /> Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
          <DropdownMenuSeparator />
          <Link href="/">
            <DropdownMenuItem>
              <LogOut /> Log out
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
