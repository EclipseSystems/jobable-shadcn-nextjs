import React from "react"
import type { FormField } from "./form.types";
import { FormFieldItem } from "./form-item";

interface FormCanvasProps {
  fields: FormField[];
  onAddField: (field: FormField) => void;
  onUpdateField: (id: string, updates: Partial<FormField>) => void;
  onRemoveField: (id: string) => void;
  onReorderFields: (startIndex: number, endIndex: number) => void;
}

export function FormCanvas({ fields, onAddField, onUpdateField, onRemoveField, onReorderFields }: FormCanvasProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const fieldType = e.dataTransfer.getData('fieldType');
    
    if (fieldType) {
      const newField: FormField = {
        id: `field-${Date.now()}-${Math.random()}`,
        type: fieldType as FormField['type'],
        label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
        placeholder: '',
        required: false,
        options: ['select', 'radio'].includes(fieldType) ? ['Option 1', 'Option 2'] : undefined,
      };
      onAddField(newField);
    }
  };

  const handleFieldDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('fieldIndex', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleFieldDragOver = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleFieldDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.stopPropagation();

    const sourceIndex = parseInt(e.dataTransfer.getData('fieldIndex'));
    if (!isNaN(sourceIndex) && sourceIndex !== targetIndex) {
      onReorderFields(sourceIndex, targetIndex);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="rounded-lg border w-125 min-h-125 p-2 space-y-2"
    >
      {fields.map((field, index) => (
        <div
          key={field.id}
          draggable
          onDragStart={(e) => handleFieldDragStart(e, index)}
          onDragOver={(e) => handleFieldDragOver(e, index)}
          onDrop={(e) => handleFieldDrop(e, index)}
        >
          <FormFieldItem
            field={field}
            onUpdate={(updates) => onUpdateField(field.id, updates)}
            onRemove={() => onRemoveField(field.id)}
          />
        </div>
      ))}
    </div>
  )
}