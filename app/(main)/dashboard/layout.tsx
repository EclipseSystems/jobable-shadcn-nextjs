import Image from "next/image";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Image
          alt="Randomized pattern"
          src="/pattern-randomized.svg"
          className="dark:invert"
          fill
          quality={100}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <SidebarInset className="bg-transparent">
          <Header />
          <div className="m-5">{children}</div>
        </SidebarInset>
      </main>
    </SidebarProvider>
  );
}
