"use client";

import { useId, useState } from "react";

import { CheckIcon, ChevronsUpDownIcon, XIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ComboMultiVal = {
  value: string;
  label: string;
};

interface ComboMultiProps {
  data: Array<ComboMultiVal>;
  placeholder: string;
  searchHint: string;
}

export function ComboboxMulti({ data, placeholder, searchHint }: ComboMultiProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const toggleSelection = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const removeSelection = (value: string) => {
    setSelectedValues((prev) => prev.filter((v) => v !== value));
  };

  // Define maxShownItems before using visibleItems
  const maxShownItems = 2;
  const visibleItems = expanded ? selectedValues : selectedValues.slice(0, maxShownItems);
  const hiddenCount = selectedValues.length - visibleItems.length;
  return (
    <div className="w-full space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-auto min-h-8 w-full justify-between hover:bg-transparent"
          >
            <div className="flex flex-wrap items-center gap-1 pr-2.5">
              {selectedValues.length > 0 ? (
                <>
                  {visibleItems.map((val) => {
                    const foundData = data.find((c) => c.value === val);

                    return foundData ? (
                      <Badge key={val} variant="outline" className="rounded-sm">
                        {foundData.label}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSelection(val);
                          }}
                          asChild
                        >
                          <span><XIcon className="size-3" /></span>
                        </Button>
                      </Badge>
                    ) : null;
                  })}
                  {hiddenCount > 0 || expanded ? (
                    <Badge
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpanded((prev) => !prev);
                      }}
                      className="rounded-sm"
                    >
                      {expanded ? "Show Less" : `+${hiddenCount} more`}
                    </Badge>
                  ) : null}
                </>
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </div>
            <ChevronsUpDownIcon
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popper-anchor-width) p-0">
          <Command>
            <CommandInput placeholder={searchHint} />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {data.map((line) => (
                  <CommandItem key={line.value} value={line.value} onSelect={() => toggleSelection(line.value)}>
                    <span className="truncate">{line.label}</span>
                    {selectedValues.includes(line.value) && (
                      <CheckIcon size={16} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
