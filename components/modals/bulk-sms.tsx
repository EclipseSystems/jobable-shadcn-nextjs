import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { Field, FieldGroup, FieldSet } from "../ui/field";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

import { Send } from "lucide-react";

interface BulkSMSProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BulkSMS({ isOpen, onClose }: BulkSMSProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bulk SMS</DialogTitle>
        </DialogHeader>
        {/* Main content */}
        <FieldSet>
          <FieldGroup>
            <Field>
              <Label>Message</Label>
              <Textarea />
            </Field>
          </FieldGroup>
        </FieldSet>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Send <Send /></Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
