import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import type { FormField } from "./form.types";

interface FormPreviewProps {
  fields: FormField[];
}

export function FormPreview({ fields }: FormPreviewProps) {
  const renderField = (field: FormField) => {
    switch (field.type) {
      case "input":
      case "email":
      case "number":
      case "date":
        return (
          <div key={field.id} className="flex flex-col gap-2 mb-4">
            <Label>
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
            />
          </div>
        );

      case "textarea":
        return (
          <div key={field.id} className="flex flex-col gap-2 mb-4">
            <Label>
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              placeholder={field.placeholder}
              required={field.required}
              rows={4}
            />
          </div>
        );

      case "select":
        return (
          <div key={field.id} className="flex flex-col gap-2 mb-4">
            <Label>
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Select required={field.required}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "radio":
        return (
          <div key={field.id} className="mb-4">
            <Label>
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <div className="space-y-2 mt-2">
              <RadioGroup>
                {field.options?.map((option, index) => (
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value={option} id={index.toString()} />
                    <Label htmlFor={index.toString()}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case "checkbox":
        return (
          <div key={field.id} className="mb-4">
            <div className="items-center flex gap-2">
              <Checkbox required={field.required} />
              <Label>{field.label}</Label>
              {field.required && <span className="text-red-500">*</span>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-125 bg-white rounded-lg border border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Form preview</h2>
      {fields.length === 0 ? (
        <div className="flex flex-col size-full justify-center text-center">
          <p className="mb-2 text-3xl text-gray-300">📝</p>
          <p className="text-sm text-gray-500">Add fields to see the preview</p>
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-1">
          {fields.map((field) => renderField(field))}
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}
