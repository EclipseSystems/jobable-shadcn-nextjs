import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Ellipsis, Lock, Star, Trash } from "lucide-react";

export function ReportOptions({ className }: { className: string }) {
  const [favourite, setFavourite] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={className}>
          <Button variant="outline" size="icon">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Report options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setFavourite(!favourite)}>
            {favourite ? (
              <>
                <Star className="text-yellow-400" />
                <span>Remove from favourites</span>
              </>
            ) : (
              <>
                <Star />
                <span>Add to favourites</span>
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Lock /> Open permissions
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Download />
            Download to PDF
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Trash /> Delete report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
