import { Lock, LucideIcon, Pencil, StopCircle, Trash } from "lucide-react";

interface menuItem {
  label: string
  variant: "default" | "destructive" | undefined
  icon: LucideIcon
  separator: Boolean
}

export const tabs = [
  { name: "Users", value: "users", content: "TBA" },
  { name: "Groups", value: "groups", content: "TBA" },
  { name: "Roles", value: "roles", content: "TBA" },
];

export const userMenu: menuItem[] = [
  { label: 'Edit details', variant: "default", icon: Pencil, separator: false },
  { label: 'End session', variant: "default", icon: StopCircle, separator: true },
  { label: 'Lock account', variant: "default", icon: Lock, separator: false },
  { label: 'Delete account', variant: "destructive", icon: Trash, separator: false },
]

export const users = [
  { name: "Isaac Nicol", role: "Billing Administrator", status: "Active" },
  { name: "Saugat Subedi", role: "Administrator", status: "Inactive" },
]