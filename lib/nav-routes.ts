import {
  Binoculars,
  Calendar,
  ChartColumn,
  Form,
  Globe,
  LucideIcon,
  Mail,
  MessageCircle,
  Tag,
  Users,
} from "lucide-react";

interface RecordItem {
  title: string;
  url: string;
  icon: LucideIcon;
  badge?: string;
}

interface RecordGroup {
  title: string;
  links: RecordItem[]
}

export const navLinks: RecordGroup[] = [
  {
    title: "Record management",
    links: [
      { title: "Clients", url: "/dashboard/clients", icon: Users },
      { title: "Appointments", url: "/dashboard/appointments", icon: Calendar },
      { title: "Leads", url: "/dashboard/leads", icon: Binoculars },
      { title: "Organisations", url: "/dashboard/organisations", icon: Globe },
      { title: "Contacts", url: "/dashboard/contacts", icon: Tag },
    ],
  },
  {
    title: "Apps",
    links: [
      { title: "Chat", url: "/dashboard/chat", icon: MessageCircle, badge: '12' },
      { title: "Email", url: "/dashboard/email", icon: Mail, badge: '5' },
      { title: "Forms", url: "/dashboard/forms", icon: Form },
      { title: "Reports", url: "/dashboard/reports", icon: ChartColumn },
    ],
  },
];