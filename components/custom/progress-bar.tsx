import { motion } from "motion/react";

export type ProgressBarProps = {
  value: number; // 0-100
  label?: string;
  className?: string;
  barClassName?: string;
  labelClassName?: string;
};

const minValue = 0;
const maxValue = 100;

export default function ProgressBar({ value, label, className, barClassName, labelClassName }: ProgressBarProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className={`mb-1 font-medium text-sm ${labelClassName}`}>
          {label}
        </div>
      )}
      <div className="relative h-3 w-full overflow-hidden rounded border bg-background">
        <motion.div
          animate={{
            width: `${Math.max(minValue, Math.min(maxValue, value))}%`,
            transition: {
              default: {
                type: "spring",
                damping: 10,
                mass: 0.75,
                stiffness: 100,
              },
            },
          }}
          className={`h-full rounded bg-background ${barClassName}`}
          initial={{ width: minValue }}
        />
      </div>
    </div>
  );
}
