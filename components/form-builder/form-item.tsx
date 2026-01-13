import { Trash2, GripVertical, Plus, X } from 'lucide-react';
import type { FormField } from './form.types';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';

interface FormFieldItemProps {
  field: FormField;
  onUpdate: (updates: Partial<FormField>) => void;
  onRemove: () => void;
}

export function FormFieldItem({ field, onUpdate, onRemove }: FormFieldItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleAddOption = () => {
    const newOption = `Option ${(field.options?.length || 0) + 1}`;
    onUpdate({ options: [...(field.options || []), newOption] });
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = field.options?.filter((_, i) => i !== index);
    onUpdate({ options: newOptions });
  };

  const handleUpdateOption = (index: number, value: string) => {
    const newOptions = [...(field.options || [])];
    newOptions[index] = value;
    onUpdate({ options: newOptions });
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors group">
      <div className="flex items-start gap-3">
        <div className="cursor-move text-gray-400 hover:text-gray-600 mt-1">
          <GripVertical size={20} />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <Input
                type="text"
                value={field.label}
                onChange={(e) => onUpdate({ label: e.target.value })}
                placeholder="Enter a field label"
              />
              <div className="flex items-center gap-4">
                {/* Field box */}
                <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                  {field.type}
                </span>

                {/* Checkbox */}
                <div className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={field.required || false}
                    onCheckedChange={(checked) => onUpdate({ required: checked as boolean })}
                  />
                  <Label className="text-sm text-gray-600">Required</Label>
                </div>

                {/* Edit button */}
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? 'Done' : 'Edit details'}
                </Button>
              </div>
            </div>
            <Button size="icon" variant="destructive" onClick={onRemove} title="Remove field">
              <Trash2 size={18} />
            </Button>
          </div>

          {isEditing && (
            <div className="space-y-3 mt-3 pt-3 border-t border-gray-200">
              <Input
                type="text"
                value={field.placeholder || ''}
                onChange={(e) => onUpdate({ placeholder: e.target.value })}
                placeholder="Placeholder text"
              />

              {(field.type === 'select' || field.type === 'radio') && (
                <div className="space-y-2">
                  <Label className="text-sm text-gray-700">Options:</Label>
                  {field.options?.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        type="text"
                        value={option}
                        onChange={(e) => handleUpdateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveOption(index)}
                        className="text-red-500 hover:text-red-700 p-2"
                        title="Remove option"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" onClick={handleAddOption} className="text-blue-600 hover:text-blue-700">
                    <Plus size={16} />
                    Add Option
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
