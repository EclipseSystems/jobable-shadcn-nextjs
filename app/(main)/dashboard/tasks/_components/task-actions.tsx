import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Pencil, X } from "lucide-react";

export function TaskActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-auto">
        <Button className="size-7" variant="outline">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Pencil /> Edit task
        </DropdownMenuItem>

        <DropdownMenuItem variant="destructive">
          <X /> Delete task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
