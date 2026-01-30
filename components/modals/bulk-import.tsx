import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button";

interface BulkImportProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BulkImport({ isOpen, onClose }: BulkImportProps) {
  return (
    <Sheet
      open={isOpen}
      onOpenChange={onClose}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button>Submit</Button>
          <SheetClose>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
