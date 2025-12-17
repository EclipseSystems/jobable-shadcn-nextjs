"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Binoculars,
  Calendar,
  ChevronDown,
  Globe,
  Home,
  Plus,
  Settings,
  Tag,
  User,
} from "lucide-react";

import * as EpicLogo from "../../public/epic_logo.jpg";
import { AddAppointment } from "../modals/add-appointment";
import { AddClient } from "../modals/add-client";
import { AddContact } from "../modals/add-contact";
import { AddLead } from "../modals/add-lead";
import { AddOrganisation } from "../modals/add-organisation";
import { DownloadApp } from "../modals/download-app";
import { navLinks } from "../../lib/nav-types";

const footerItems = [
  { title: "Admin portal", url: "/dashboard/admin", icon: Settings },
];

export function AppSidebar() {
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
      <Sidebar className="shadow-2xl" collapsible="icon" variant="sidebar">
        <SidebarHeader>
          {/* Brand logo */}
          <div className="p-2 group-data-[collapsible=icon]:p-0 transition-all duration-300">
            <Image
            src={EpicLogo}
            alt={"Brand logo"}
            width={60}
          />
          </div>
          <SidebarMenu>
            {/* Add item menu */}
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <Plus /> <p>New item</p>
                    <ChevronDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {addItems.map((item) => (
                    <DropdownMenuItem onClick={item.action}>
                      <item.icon />
                      <span>{item.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>

            {/* Dashboard link */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Dashboard">
                <Link href="/dashboard">
                  <Home />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          {Object.entries(navLinks).map(([groupTitle, groupData]) => (
            <SidebarGroup key={groupTitle}>
              <SidebarGroupLabel>{groupData.title}</SidebarGroupLabel>
              <SidebarMenu>
                {groupData.links.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={usePathname() === item.url}
                      tooltip={item.title}
                    >
                      <Link key={item.title} href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          {/* Footer links */}
          <SidebarMenu>
            {footerItems.map((item) => (
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link key={item.title} href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            {/* Download the pp */}
            <DownloadApp />
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Dialogs */}
      <AddAppointment isOpen={apptOpen} onClose={() => setApptOpen(false)} />
      <AddClient isOpen={clientOpen} onClose={() => setClientOpen(false)} />
      <AddContact isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <AddLead isOpen={leadOpen} onClose={() => setLeadOpen(false)} />
      <AddOrganisation isOpen={orgOpen} onClose={() => setOrgOpen(false)} />
    </>
  );
}
