import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  AreaChart,
  BarChart,
  Check,
  LineChart,
  PieChart,
} from "lucide-react";
import { useId } from "react";

interface ChangeChartProps {
  isOpen: boolean;
  onClose: () => void;
}

const chartChoices = [
  { icon: BarChart, title: "Bar chart" },
  { icon: LineChart, title: "Line chart" },
  { icon: PieChart, title: "Pie chart" },
  { icon: AreaChart, title: "Area chart" },
];

export function ChangeChart({ isOpen, onClose }: ChangeChartProps) {
  const id = useId();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Change chart type</DialogTitle>
        </DialogHeader>
        <RadioGroup
          className="w-full justify-items-center sm:grid-cols-2"
          defaultValue="1"
        >
          {chartChoices.map((option) => (
            <div
              className="border-input
            has-data-[state=checked]:border-primary/50
            has-data-[state=checked]:bg-accent
            relative flex w-full flex-col items-center gap-3 rounded-md border p-4 shadow-xs outline-none"
            >
              <RadioGroupItem
                value={option.title}
                id={`${id}-1`}
                className="order-1 size-5 after:absolute after:inset-0 [&_svg]:size-3"
                aria-describedby={`${id}-1-description`}
                aria-label="plan-radio-basic"
              />
              <div className="grid grow justify-items-center gap-2">
                <option.icon />
                <Label htmlFor={`${id}-1`} className="justify-center">
                  {option.title}
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Select <Check />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
