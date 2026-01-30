import { CircleSmall, Siren } from "lucide-react";

export const frequencies = [
  { value: "hourly", name: "Hourly" },
  { value: "daily", name: "Daily" },
  { value: "weekly", name: "Weekly" },
  { value: "fortnightly", name: "Fortnightly" },
  { value: "monthly", name: "Monthly" }
]

export const genders = [
  { value: "male", name: "Male" },
  { value: "female", name: "Female" },
  { value: "intersex", name: "Intersex" },
  { value: "no-pref", name: "Prefer not to say" },
]

export const states = [
  { value: "Australian Capital Territory", name: "Australian Capital Territory" },
  { value: "New South Wales", name: "New South Wales" },
  { value: "Northern Territory", name: "Northern Territory" },
  { value: "Queensland", name: "Queensland" },
  { value: "South Australia", name: "South Australia" },
  { value: "Tasmania", name: "Tasmania" },
  { value: "Victoria", name: "Victoria" },
  { value: "Western Australia", name: "Western Australia" },
];

export const severity = [
  { value: "critical", label: "Critical (1-8 hours)", icon: Siren, color: "text-red-500" },
  { value: "high", label: "High (8-24 hours)", icon: CircleSmall, color: "text-amber-500" },
  { value: "medium", label: "Medium (1-3 days)", icon: CircleSmall, color: "text-yellow-500" },
  { value: "low", label: "Low (3-7 days)", icon: CircleSmall, color: "text-green-500" }
]

export const tables = [
  { value: "clients", name: "Clients" },
  { value: "appointments", name: "Appointments" },
  { value: "client-leads", name: "Client leads" },
  { value: "org-leads", name: "Organisation leads" },
  { value: "organisations", name: "Organisations" },
  { value: "contacts", name: "Contacts" },
]

export const timezones = [
  { value: "AWST", name: "Australian Western Standard Time (UTC +08:00)"},
  { value: "ACST", name: "Australian Central Standard Time (UTC +09:30)"},
  { value: "AEST", name: "Australian Eastern Standard Time (UTC +10:00)"}
]

export const weekdays = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
];