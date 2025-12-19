import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "../ui/sidebar";
import {
  Binoculars,
  Calendar,
  ChevronDown,
  Globe,
  Plus,
  Tag,
  User,
} from "lucide-react";

import { AddAppointment } from "../modals/add-appointment";
import { AddClient } from "../modals/add-client";
import { AddContact } from "../modals/add-contact";
import { AddLead } from "../modals/add-lead";
import { AddOrganisation } from "../modals/add-organisation";

export function NewItem() {
  const [apptOpen, setApptOpen] = useState(false);
  const [clientOpen, setClientOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [orgOpen, setOrgOpen] = useState(false);

  const addItems = [
    {
      icon: Calendar,
      name: "New appointment",
      action: () => setApptOpen(true),
    },
    { icon: User, name: "New client", action: () => setClientOpen(true) },
    { icon: Tag, name: "New contact", action: () => setContactOpen(true) },
    { icon: Binoculars, name: "New lead", action: () => setLeadOpen(true) },
    { icon: Globe, name: "New organisation", action: () => setOrgOpen(true) },
  ];
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton>
            <Plus /> <p>New item</p>
            <ChevronDown className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {addItems.map((item) => (
            <DropdownMenuItem key={item.name} onClick={item.action}>
              <item.icon />
              <span>{item.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialogs */}
      <AddAppointment isOpen={apptOpen} onClose={() => setApptOpen(false)} />
      <AddClient isOpen={clientOpen} onClose={() => setClientOpen(false)} />
      <AddContact isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <AddLead isOpen={leadOpen} onClose={() => setLeadOpen(false)} />
      <AddOrganisation isOpen={orgOpen} onClose={() => setOrgOpen(false)} />
    </>
  );
}
