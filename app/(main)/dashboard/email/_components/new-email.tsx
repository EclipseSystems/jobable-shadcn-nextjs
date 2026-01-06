import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Info, Upload, X } from "lucide-react";
import { RadioBadgeGroup } from "@/components/custom/radio-badge-group";

const options = ["CC", "BCC"];

interface NewEmailProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewEmail({ isOpen, onClose }: NewEmailProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [selected, setSelected] = useState<string[]>(["CC", "BCC"]);
  const onFileReject = useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${
        file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
      }" has been rejected`,
    });
  }, []);
  return (
    <>
      <Drawer
        handleOnly={true}
        direction="right"
        open={isOpen}
        onOpenChange={onClose}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Compose new email</DrawerTitle>
          </DrawerHeader>

          {/* Main content */}
          <ScrollArea className="h-185">
            <div className="p-4 space-y-4 h-content">
              <div className="flex items-center gap-2">
                <RadioBadgeGroup options={options} />
              </div>
              <FieldSet>
                <FieldGroup>
                  <Field id="to">
                    <FieldLabel htmlFor="to">To</FieldLabel>
                    <Input type="email" />
                  </Field>

                  <Field id="cc" hidden={!selected.includes("CC")}>
                    <FieldLabel htmlFor="cc">
                      CC
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info size={14} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Carbon copy</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FieldLabel>
                    <Input type="email" />
                  </Field>

                  <Field id="bcc" hidden={!selected.includes("BCC")}>
                    <FieldLabel htmlFor="bcc">
                      BCC
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info size={14} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Blind carbon copy</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FieldLabel>
                    <Input type="email" />
                  </Field>

                  <Field id="subject">
                    <FieldLabel htmlFor="subject">Subject</FieldLabel>
                    <Input type="text" />
                  </Field>

                  <Field id="body">
                    <FieldLabel htmlFor="body">Message</FieldLabel>
                    <Textarea />
                  </Field>

                  <Field id="attachments">
                    <FieldLabel htmlFor="attachments">Attachments</FieldLabel>
                    <FileUpload
                      maxFiles={2}
                      maxSize={5 * 1024 * 1024}
                      className="w-full max-w-md"
                      value={files}
                      onValueChange={setFiles}
                      onFileReject={onFileReject}
                      multiple
                    >
                      <FileUploadDropzone>
                        <div className="flex flex-col items-center gap-1 text-center">
                          <div className="flex items-center justify-center rounded-full border p-2.5">
                            <Upload className="size-6 text-muted-foreground" />
                          </div>
                          <p className="font-medium text-sm">
                            Drag & drop files here
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Or click to browse (max 2 files, up to 5MB each)
                          </p>
                        </div>
                        <FileUploadTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 w-fit"
                          >
                            Browse files
                          </Button>
                        </FileUploadTrigger>
                      </FileUploadDropzone>
                      <FileUploadList>
                        {files.map((file, index) => (
                          <FileUploadItem key={index} value={file}>
                            <FileUploadItemPreview />
                            <FileUploadItemMetadata />
                            <FileUploadItemDelete asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-7"
                              >
                                <X />
                              </Button>
                            </FileUploadItemDelete>
                          </FileUploadItem>
                        ))}
                      </FileUploadList>
                    </FileUpload>
                  </Field>
                </FieldGroup>
              </FieldSet>
              {/* ADD ADDRESS BOOK */}
              {/* ADD SUGGESTIONS */}
            </div>
          </ScrollArea>

          <DrawerFooter className="border-t">
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button onClick={onClose} variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
