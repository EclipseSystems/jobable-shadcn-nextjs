"use client";

import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Image, Paperclip } from "lucide-react";

import { AuroraText } from "@/components/ui/aurora-text";

const MODELS = [
  { value: "gpt-5", name: "GPT-5", description: "Most advanced model", max: true },
  { value: "gpt-4o", name: "GPT-4o", description: "Fast and capable" },
  { value: "gpt-4", name: "GPT-4", description: "Reliable and accurate" },
  { value: "claude-3.5", name: "Claude 3.5 Sonnet", description: "Great for coding tasks" },
];

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleModelChange = (value: string) => {
    const model = MODELS.find((m) => m.value === value);
    if (model) {
      setSelectedModel(model);
    }
  };

  const renderMaxBadge = () => (
    <div className="flex h-3.5 items-center gap-1.5 rounded border border-border px-1 py-0">
      <span
        className="text-[9px] font-bold uppercase"
        style={{
          background:
            "linear-gradient(to right, rgb(129, 161, 193), rgb(125, 124, 155))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        MAX
      </span>
    </div>
  );

  return (
    <>
      <Card>
        <CardContent>
          <div className="mx-auto text-center justify-center flex w-full flex-col h-[calc(100vh-10rem)] gap-4">
            {/* Headings */}
            <div className="font-bold text-5xl">
              <AuroraText>Aperture AI.</AuroraText>
            </div>
            <h2 className="text-muted-foreground">
              Halve your effort. Widen your world. Aperture AI takes the tedium
              out of managing your customer relationships.
            </h2>

            {/* Prompt container */}
            <div className="flex flex-col gap-4 w-1/2 self-center">
              <div className="flex min-h-30 flex-col rounded-2xl cursor-text bg-card border border-border shadow-lg">
                {/* Text area */}
                <div className="flex-1 relative overflow-y-auto max-h-64.5">
                  <Textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything!"
                    className="w-full border-0 p-3 transition-[padding] duration-200 ease-in-out min-h-[48.4px] outline-none text-[16px] text-foreground resize-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent! whitespace-pre-wrap wrap-break-word"
                  />
                </div>

                {/* Bottom toolbar */}
                <div className="flex min-h-10 items-center gap-2 p-2 pb-1">

                  {/* Cloud icon */}
                  <div className="flex items-center gap-1">
                    {/* Speech-to-text */}
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-muted-foreground hover:text-foreground transition-all duration-100 rounded-full"
                      title="Speech-to-text"
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>

                    {/* Image upload */}
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-muted-foreground hover:text-foreground transition-all duration-100 rounded-full"
                      title="Attach images"
                    >
                      <Image className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Model selector */}
                  <div className="relative flex items-center">
                    <Select
                      value={selectedModel.value}
                      onValueChange={handleModelChange}
                    >
                      <SelectTrigger className="w-fit border-none bg-transparent! p-0 text-sm text-muted-foreground hover:text-foreground focus:ring-0 shadow-none">
                        <SelectValue>
                          {selectedModel.max ? (
                            <div className="flex items-center gap-1">
                              <span>{selectedModel.name}</span>
                              {renderMaxBadge()}
                            </div>
                          ) : (
                            <span>{selectedModel.name}</span>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {MODELS.map((model) => (
                          <SelectItem key={model.value} value={model.value}>
                            {model.max ? (
                              <div className="flex items-center gap-1">
                                <span>{model.name}</span>
                                {renderMaxBadge()}
                              </div>
                            ) : (
                              <span>{model.name}</span>
                            )}
                            <span className="text-muted-foreground block text-xs">
                              {model.description}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="ml-auto flex items-center gap-2">


                    {/* Enter button */}
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className={cn(
                        "size-7 rounded-full transition-all duration-100 cursor-pointer bg-primary",
                        inputValue && "bg-primary hover:bg-primary/90!"
                      )}
                      disabled={!inputValue}
                    >
                      <ArrowUp className="text-primary-foreground" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
