"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Save } from "lucide-react";

export function Editable({ className, label }: { className: string, label: string }) {
  const [mode, setMode] = useState(false);
  const [title, setTitle] = useState(label);
  const handleSubmit = () => {
    setTitle(title);
    setMode(false);
  };
  return (
    <div className="flex items-center gap-2">
      {mode ? (
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-80"
        />
      ) : (
        <p className={className}>{title}</p>
      )}
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={mode ? handleSubmit : () => setMode(!mode)}
      >
        {mode ? <Save /> : <Pencil />}
      </Button>
    </div>
  );
}
