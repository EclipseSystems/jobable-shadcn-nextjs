import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "../ui/button";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  LucideIcon,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";

function Divider() {
  return <div className="divider" />;
}



export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <div className="toolbar" ref={toolbarRef}>

      {/* Undo button */}
      <Button
        disabled={!canUndo}
        variant="ghost"
        size="icon"
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        aria-label="Undo"
      >
        <Undo />
      </Button>

      {/* Redo button */}
      <Button
        disabled={!canRedo}
        variant="ghost"
        size="icon"
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        aria-label="Redo"
      >
        <Redo />
      </Button>

      <Divider />

      {/* Bold button */}
      <Button
        variant="ghost"
        size="icon"
        className={isBold ? "bg-secondary" : ""}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        aria-label="Format Bold"
      >
        <Bold />
      </Button>

      {/* Italic button */}
      <Button
        variant="ghost"
        size="icon"
        className={isItalic ? "bg-secondary" : ""}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        aria-label="Format Italic"
      >
        <Italic />
      </Button>

      {/* Underline button */}
      <Button
        variant="ghost"
        size="icon"
        className={isUnderline ? "bg-secondary" : ""}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        aria-label="Format Underline"
      >
        <Underline />
      </Button>

      {/* Strikethrough button */}
      <Button
        variant="ghost"
        size="icon"
        className={isStrikethrough ? "bg-secondary" : ""}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        aria-label="Format Strikethrough"
      >
        <Strikethrough />
      </Button>

      <Divider />

      {/* Align left button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        aria-label="Left Align"
      >
        <AlignLeft />
      </Button>

      {/* Align center button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        aria-label="Center Align"
      >
        <AlignCenter />
      </Button>

      {/* Align right button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
        aria-label="Right Align"
      >
        <AlignRight />
      </Button>

      {/* Align justify button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
        aria-label="Justify Align"
      >
        <AlignJustify />
      </Button>
    </div>
  );
}
