import {
  BadgeCheck,
  Blocks,
  DollarSign,
  Eye,
  Lock,
  Mail,
  Users,
} from "lucide-react";
import { navLink } from "@/lib/types";

export const links: navLink[] = [
  { name: "Branding", url: "/dashboard/admin/branding", icon: Eye },
  { name: "User management", url: "/dashboard/admin/users", icon: Users },
  { name: "Billing", url: "/dashboard/admin/billing", icon: DollarSign },
  { name: "Notifications", url: "/dashboard/admin/notifications", icon: Mail },
  {
    name: "API & integrations",
    url: "/dashboard/admin/integrations",
    icon: Blocks,
  },
  { name: "Security", url: "/dashboard/admin/security", icon: Lock },
  { name: "Compliance", url: "/dashboard/admin/compliance", icon: BadgeCheck },
];
