"use client"

import { AtSign, Calculator, Calendar, CheckSquare, ChevronDown, Circle, FileText, Type } from "lucide-react"
import type { FieldType } from "./form.types.ts"

interface FieldOption {
  type: FieldType;
  label: string;
  icon: React.ReactNode;
}

const fieldOptions: FieldOption[] = [
  { type: 'checkbox', label: 'Checkbox', icon: <CheckSquare size={16}/> },
  { type: 'date', label: 'Date picker', icon: <Calendar size={16}/> },
  { type: 'select', label: 'Dropdown', icon: <ChevronDown size={16}/> },
  { type: 'email', label: 'Email input', icon: <AtSign size={16}/> },
  { type: 'number', label: 'Number input', icon: <Calculator size={16}/> },
  { type: 'radio', label: 'Radio group', icon: <Circle size={16}/> },
  { type: 'textarea', label: 'Text area', icon: <FileText size={16}/> },
  { type: 'input', label: 'Text input', icon: <Type size={16}/> }
]

export function FormPalette() {
  const handleDragStart = (e: React.DragEvent, type: FieldType) => {
    e.dataTransfer.setData('fieldType', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="space-y-2">
      {fieldOptions.map((field) => (
        <div
          key={field.type}
          draggable
          onDragStart={(e) => handleDragStart(e, field.type)}
          className="w-50 rounded-lg flex border p-2 gap-2 items-center"
        >
          {field.icon}
          <p className="text-sm">{field.label}</p>
        </div>
      ))}
    </div>
  )
}