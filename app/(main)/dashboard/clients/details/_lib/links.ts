import { navLink } from "@/lib/types";
import { Clock, DollarSign, File, IdCard, NotebookText, Receipt } from "lucide-react";

export const links: navLink[] = [
  { name: "Personal details", url: "/dashboard/clients/details/profile", icon: IdCard },
  { name: "Appointments", url: "/dashboard/clients/details/appointments", icon: Clock },
  { name: "Documents", url: "/dashboard/clients/details/documents", icon: File },
  { name: "Notes", url: "/dashboard/clients/details/notes", icon: NotebookText },
  { name: "Claims", url: "/dashboard/clients/details/claims", icon: Receipt },
  { name: "Expenses", url: "/dashboard/clients/details/expenses", icon: DollarSign }
]