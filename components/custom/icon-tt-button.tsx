import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link"
import { LucideIcon } from "lucide-react"

export function IconTTButton({url, title, Icon} : {
  url: string
  title: string
  Icon: LucideIcon
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={url}>
            <Button
              variant="ghost"
              size="icon"
            >
              <Icon />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}