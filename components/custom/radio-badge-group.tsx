import { useState } from "react";

import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";

interface RadioBadgeProps {
  options: Array<string>;
}

export function RadioBadgeGroup({ options }: RadioBadgeProps) {
  const [selected, setSelected] = useState<string[]>(options);
  return (
    <>
      <div className="block items-center space-x-1 space-y-1">
        {options.map((option: string) => (
          <Badge
            key={option}
            variant="secondary"
            className="relative gap-2 rounded-sm px-3 py-1.5"
          >
            <Checkbox
              id={option}
              checked={selected.includes(option)}
              onCheckedChange={(checked) =>
                setSelected(
                  checked
                    ? [...selected, option]
                    : selected.filter((item) => item !== option)
                )
              }
              className="data-[state=unchecked]:hidden"
            />
            <label
              htmlFor={option}
              className="cursor-pointer select-none after:absolute after:inset-0"
            >
              {option}
            </label>
          </Badge>
        ))}
      </div>
    </>
  );
}
