"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  AlertTriangle,
  ChevronRight,
  Ellipsis,
  Home,
  Settings,
  Star,
} from "lucide-react";

import * as EpicLogo from "../../public/epic_logo.jpg";
import { DownloadApp } from "../modals/download-app";
import { navLinks } from "../../lib/nav-routes";
import { NewItem } from "./new-item";

const headerItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Alerts", url: "/dashboard/alerts", icon: AlertTriangle },
];
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
            {headerItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          {Object.entries(navLinks).map(([groupTitle, groupData]) => (
            <SidebarGroup key={groupTitle}>
              <SidebarGroupLabel>{groupData.title}</SidebarGroupLabel>
              <SidebarMenu>
                {groupData.links.map((item) =>
                  item.items ? (
                    <Collapsible key={item.title} className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            <item.icon />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={usePathname() === subItem.url}
                                >
                                  <Link key={subItem.title} href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        aria-disabled={item.disabled}
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
                      {item.action && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <SidebarMenuAction>
                              <Ellipsis />
                            </SidebarMenuAction>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="right" align="start">
                            <DropdownMenuLabel>Recent</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <span>Benjamin Hermiston</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <span>Terrell Mitchell</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <span>Reginald Padberg</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <span>Nancy Swaniawski</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <span>Rachael Collier</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </SidebarMenuItem>
                  )
                )}
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
