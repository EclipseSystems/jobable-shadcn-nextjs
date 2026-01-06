import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

export function ImportUsers() {
  return (
    <>
      <Drawer direction="right">
        <DrawerTrigger>
          <Button size="sm">Import users</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Import users</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
          </div>
          <DrawerFooter>
            <Button>Import users</Button>
            <DrawerClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}