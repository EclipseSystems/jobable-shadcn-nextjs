import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { userMenu } from "../_lib/data";

export function UserActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size="icon-sm" variant="outline">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>User actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userMenu.map((item) => (
          <div key={item.label}>
            <DropdownMenuItem variant={item.variant}>
              <item.icon />
              {item.label}
            </DropdownMenuItem>
            {item.separator && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
