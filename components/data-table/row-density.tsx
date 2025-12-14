import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Rows2Icon, Rows3Icon, Rows4Icon } from "lucide-react"

export function RowDensity({ density, setDensity }:{
  density: string
  setDensity: (density: string) => void
}) {
  return (
    <Select value={density} onValueChange={setDensity}>
      <SelectTrigger aria-label='Density select'>
        <SelectValue placeholder='Density' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Density</SelectLabel>
          <SelectItem value='compact'>
            <div className='flex items-center gap-2'>
              <Rows4Icon className='size-4' />
              Compact
            </div>
          </SelectItem>
          <SelectItem value='standard' className='flex items-center gap-2'>
            <div className='flex items-center gap-2'>
              <Rows3Icon className='size-4' /> Standard
            </div>
          </SelectItem>
          <SelectItem value='flexible' className='flex items-center gap-2'>
            <div className='flex items-center gap-2'>
              <Rows2Icon className='size-4' />
              Flexible
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}