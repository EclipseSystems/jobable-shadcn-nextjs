"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
import { AlertTriangle, Home, Settings } from "lucide-react";

import * as EpicLogo from "../../public/epic_logo.jpg";
import { DownloadApp } from "../modals/download-app";
import { navLinks } from "../../lib/nav-routes";
import { NewItem } from "./new-item";

const footerItems = [
  { title: "Admin portal", url: "/dashboard/admin", icon: Settings },
];

export function AppSidebar() {
  return (
    <>
      <Sidebar className="shadow-2xl" collapsible="icon" variant="sidebar">
        <SidebarHeader>
          {/* Brand logo */}
          <div className="p-2 group-data-[collapsible=icon]:p-0 transition-all duration-300">
            <Image src={EpicLogo} alt={"Brand logo"} width={60} />
          </div>
          <SidebarMenu>
            {/* Add item menu */}
            <SidebarMenuItem>
              <NewItem />
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
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Alerts">
                <Link href="/dashboard/alerts">
                  <AlertTriangle />
                  <span>Alerts</span>
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
                    {item.badge && (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    )}
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
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link key={item.title} href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            {/* Download the app */}
            <DownloadApp />
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
