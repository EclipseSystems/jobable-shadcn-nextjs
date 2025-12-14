"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Binoculars, Calendar, ChartColumn, ChevronDown, Globe, Home, LucideIcon, Mail, MessageCircle, Plus, QrCode, Settings, Tag, User, Users } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { usePathname } from "next/navigation"
import { DownloadApp } from "../modals/download-app"

interface RecordItem {
  title: string
  url: string
  icon: LucideIcon;
}

const recordItems: RecordItem[] = [
  { title: 'Clients', url: "/dashboard/clients", icon: Users },
  { title: 'Appointments', url: "/dashboard/appointments", icon: Calendar },
  { title: 'Leads', url: "/dashboard/leads", icon: Binoculars },
  { title: 'Organisations', url: "/dashboard/organisations", icon: Globe },
  { title: 'Contacts', url: "/dashboard/contacts", icon: Tag },
]

const appItems = [
  { title: 'Chat', url: "/dashboard/chat", icon: MessageCircle },
  { title: 'Email', url: "/dashboard/email", icon: Mail },
  { title: 'Reports', url: "/dashboard/reports", icon: ChartColumn }
]

const footerItems = [
  { title: 'Admin portal', url: "/dashboard/admin", icon: Settings }
]

export function AppSidebar() {
  return (
    <Sidebar className="shadow-2xl" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Plus /> New item
                  <ChevronDown className="ml-auto"/>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem><Calendar /> <span>New appointment</span></DropdownMenuItem>
                <DropdownMenuItem><Tag /> <span>New contact</span></DropdownMenuItem>
                <DropdownMenuItem><User /> <span>New client</span></DropdownMenuItem>
                <DropdownMenuItem><Binoculars /> <span>New lead</span></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
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
        <SidebarGroup>
          <SidebarGroupLabel>Record management</SidebarGroupLabel>
          <SidebarMenu>
            {recordItems.map((item) => (
              <SidebarMenuItem>
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
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Apps</SidebarGroupLabel>
          <SidebarMenu>
            {appItems.map((item) => (
              <SidebarMenuItem>
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
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
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
          <DownloadApp />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}