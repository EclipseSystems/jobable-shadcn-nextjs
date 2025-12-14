import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { QrCode } from "lucide-react"
import Image from "next/image"
import { QRCode, QRCodeCanvas } from "../ui/qr-code"

export function DownloadApp() {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Download the app">
              <QrCode />
              <span>Download the app</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download the app</DialogTitle>
            <div className="space-y-4">
              <DialogDescription>
                Take JobAble wherever you go. Scan the QR code below to download the JobAble app to your mobile device.
              </DialogDescription>
              <div className="flex justify-center gap-2">
                <Image
                  src={"/Download_on_the_App_Store_Badge.svg"}
                  alt={"Download on the App Store"}
                  height={150}
                  width={150}
                />
                <Image
                  src={"/Google_Play_Store_badge_EN.svg"}
                  alt={"Get it on Google Play"}
                  height={150}
                  width={150}
                />
                <QRCode value={"https://www.epicassist.org"}>
                  <QRCodeCanvas />
                </QRCode>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}