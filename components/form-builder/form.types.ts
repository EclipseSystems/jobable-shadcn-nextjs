export type FieldType =
  | "checkbox"
  | "date"
  | "email"
  | "input"
  | "number"
  | "radio"
  | "select"
  | "textarea";

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  defaultValue?: string;
}
