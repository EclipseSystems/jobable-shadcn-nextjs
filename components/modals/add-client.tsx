import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

interface AddClientProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddClient({ isOpen, onClose }: AddClientProps) {
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