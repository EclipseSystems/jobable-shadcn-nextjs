"use client"

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { FormCanvas } from "@/components/form-builder/form-canvas";
import { FormPalette } from "@/components/form-builder/form-palette";
import { FormField } from "@/components/form-builder/form.types";
import { PageTitle } from "@/components/layout/formatting";
import { FormPreview } from "@/components/form-builder/form-preview";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function Page() {
  const [fields, setFields] = useState<FormField[]>([]);

  const handleAddField = (field: FormField) => {
    setFields([...fields, field]);
  };

  const handleUpdateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, ...updates } : field)));
  };

  const handleRemoveField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleReorderFields = (startIndex: number, endIndex: number) => {
    const newFields = [...fields];
    const [removed] = newFields.splice(startIndex, 1);
    newFields.splice(endIndex, 0, removed);
    setFields(newFields);
  };

  return (
    <>
      <Card>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              <PageTitle title="Forms" />
              <Button variant="destructive" className="ml-auto">Restart</Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline">Load form <ChevronDown/></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                onClick={() => toast.success("Form saved successfully!")}
              >Save form</Button>
            </div>
            <div className="flex space-x-2">
              <FormPalette />
              <FormCanvas
                fields={fields}
                onAddField={handleAddField}
                onUpdateField={handleUpdateField}
                onRemoveField={handleRemoveField}
                onReorderFields={handleReorderFields}
              />
              <FormPreview fields={fields} />
            </div>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </>
  )
}