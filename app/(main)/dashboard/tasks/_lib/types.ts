import { ArrowDown, ArrowRight, ArrowUp, Check, Circle, CircleAlert, X } from "lucide-react";

export interface Task {
  id: number;
  column: string;
  title: string;
  priority: string;
  status: string;
  description?: string;
  assignee?: string;
  dueDate: string;
  tags: Array<string>;
}

export const priority = [
  { value: "urgent", label: "Urgent", icon: CircleAlert, color: "text-red-500" },
  { value: "high", label: "High", icon: ArrowUp, color: "text-orange-500" },
  { value: "medium", label: "Medium", icon: ArrowRight, color: "text-yellow-500" },
  { value: "low", label: "Low", icon: ArrowDown, color: "text-green-500" }
];

export const status = [
  { value: "not-started", label: "Not started", icon: X, color: "text-red-500" },
  { value: "in-progress", label: "In progress", icon: Circle, color: "text-yellow-500" },
  { value: "completed", label: "Completed", icon: Check, color: "text-green-500" }
]