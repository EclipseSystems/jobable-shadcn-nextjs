import { Button } from "@/components/ui/button";
import {
  ColorPicker,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerHueSlider,
  ColorPickerAlphaSlider,
  ColorPickerFormatSelect,
  ColorPickerInput,
  ColorPickerArea,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "@/components/ui/color-picker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface NewLabelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewLabel({ isOpen, onClose }: NewLabelProps) {
  const [colorValue, setColorValue] = useState("");
  function handleSetColor(colorValue: string) {
    setColorValue(colorValue);
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New label</DialogTitle>
        </DialogHeader>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Label title</FieldLabel>
              <Input type="text" />
            </Field>
            <Field>
              <FieldLabel>Label colour</FieldLabel>

              {/* Color picker */}
              <div className="flex gap-2 items-center">
                <ColorPicker value={colorValue} onValueChange={handleSetColor}>
                  <ColorPickerTrigger asChild>
                    <ColorPickerSwatch className="size-6" />
                  </ColorPickerTrigger>
                  <ColorPickerContent>
                    <ColorPickerArea />
                    <div className="flex items-center gap-2">
                      <ColorPickerEyeDropper />
                      <div className="flex flex-1 flex-col gap-2">
                        <ColorPickerHueSlider />
                        <ColorPickerAlphaSlider />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ColorPickerFormatSelect />
                      <ColorPickerInput />
                    </div>
                  </ColorPickerContent>
                </ColorPicker>
                <p className="text-sm">{colorValue.toString()}</p>
              </div>
            </Field>
          </FieldGroup>
        </FieldSet>
        <DialogFooter>
          <DialogClose>
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
