import { CircleSmall, Siren } from "lucide-react";

export const states = [
  { value: "act", name: "Australian Capital Territory" },
  { value: "nsw", name: "New South Wales" },
  { value: "nt", name: "Northern Territory" },
  { value: "qld", name: "Queensland" },
  { value: "sa", name: "South Australia" },
  { value: "tas", name: "Tasmania" },
  { value: "vic", name: "Victoria" },
  { value: "wa", name: "Western Australia" },
];

export const severity = [
  { value: "critical", label: "Critical (1-8 hours)", icon: Siren, color: "text-red-500" },
  { value: "high", label: "High (8-24 hours)", icon: CircleSmall, color: "text-amber-500" },
  { value: "medium", label: "Medium (1-3 days)", icon: CircleSmall, color: "text-yellow-500" },
  { value: "low", label: "Low (3-7 days)", icon: CircleSmall, color: "text-green-500" }
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