import {
  Binoculars,
  Calendar,
  ChartColumn,
  CreditCard,
  Form,
  Globe,
  LucideIcon,
  Mail,
  MessageCircle,
  Receipt,
  Store,
  Tag,
  Users
} from "lucide-react";

interface RecordSubItem {
  title: string;
  url: string;
  action?: boolean;
}

interface RecordItem {
  title: string;
  url: string;
  icon: LucideIcon;
  action?: boolean;
  badge?: string;
  disabled?: boolean;
  items?: RecordSubItem[] | undefined;
}

interface RecordGroup {
  title: string;
  links: RecordItem[];
}

export const navLinks: RecordGroup[] = [
  {
    title: "Record management",
    links: [
      {
        title: "Clients",
        url: "/dashboard/clients",
        icon: Users,
        action: true,
      },
      {
        title: "Appointments",
        url: "/dashboard/appointments",
        icon: Calendar,
        action: true,
      },
      {
        title: "Leads",
        url: "#",
        icon: Binoculars,
        items: [
          { title: "Customers", url: "/dashboard/client-leads", action: true },
          {
            title: "Organisations",
            url: "/dashboard/org-leads",
            action: true,
          },
        ],
      },
      {
        title: "Organisations",
        url: "/dashboard/organisations",
        icon: Globe,
        action: true,
      },
      {
        title: "Contacts",
        url: "/dashboard/contacts",
        icon: Tag,
        action: true,
      },
    ],
  },
  {
    title: "Finance",
    links: [
      { title: "Claims", url: "/dashboard/claims", icon: Receipt, disabled: true, badge: "Coming soon" },
      { title: "Expenses", url: "/dashboard/expenses", icon: CreditCard, disabled: true, badge: "Coming soon" },
    ],
  },
  {
    title: "Apps",
    links: [
      {
        title: "Chat",
        url: "/dashboard/chat",
        icon: MessageCircle,
        badge: "12",
      },
      { title: "Email", url: "/dashboard/email", icon: Mail, badge: "5" },
      { title: "Forms", url: "/dashboard/forms", icon: Form },
      { title: "Reports", url: "/dashboard/reports", icon: ChartColumn },
      { title: "Marketing", url: "/dashboard/marketing", icon: Store },
    ],
  },
];
