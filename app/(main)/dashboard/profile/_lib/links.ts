import { navLink } from "@/lib/types";
import { CircleUser, Lock, Mail, Monitor } from "lucide-react";

export const links: navLink[] = [
  { name: "User profile", url: "/dashboard/profile/details", icon: CircleUser },
  { name: "Display", url: "/dashboard/profile/display", icon: Monitor },
  { name: "Security", url: "/dashboard/profile/security", icon: Lock },
  { name: "Subscriptions", url: "/dashboard/profile/subscriptions", icon: Mail }
];