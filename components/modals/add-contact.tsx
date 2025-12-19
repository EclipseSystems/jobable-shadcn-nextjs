import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

interface AddContactProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddContact({ isOpen, onClose }: AddContactProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}