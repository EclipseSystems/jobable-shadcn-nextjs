"use client";

import { useCallback, useState } from "react";
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerFormatSelect,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "@/components/ui/color-picker";

const presetColors = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#64748b", // gray
];

export function MiniColorPicker() {
  const [color, setColor] = useState("#3b82f6");
  const onPresetSelect = useCallback((presetColor: string) => {
    setColor(presetColor);
  }, []);
  return (
    <ColorPicker
      value={color}
      onValueChange={setColor}
      defaultFormat="hex"
      defaultValue="#3b82f6"
    >
      <ColorPickerTrigger asChild>
        <ColorPickerSwatch className="size-5"/>
      </ColorPickerTrigger>
      <ColorPickerContent>
        <ColorPickerArea />
        <div className="flex items-center gap-2">
          <ColorPickerEyeDropper />
          <div className="flex flex-1 flex-col gap-2">
            <ColorPickerHueSlider />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-medium text-sm">Preset Colors</h4>
          <div className="flex flex-wrap gap-2">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                type="button"
                className="size-6 rounded border-2 border-transparent hover:border-border focus:border-ring focus:outline-none"
                style={{ backgroundColor: presetColor }}
                onClick={() => onPresetSelect(presetColor)}
                aria-label={`Select color ${presetColor}`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ColorPickerFormatSelect />
          <ColorPickerInput />
        </div>
      </ColorPickerContent>
    </ColorPicker>
  );
}
