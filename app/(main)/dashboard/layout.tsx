import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import Header from "@/components/layout/header"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarInset>
          <Header />
          <div className="h-full p-4 md:p-6">
            {children}
          </div>
        </SidebarInset>
      </main>
    </SidebarProvider>
  )
}