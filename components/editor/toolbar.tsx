import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "../ui/button";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Italic, List, ListCheck, ListOrdered, Redo, Strikethrough, Underline, Undo } from "lucide-react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { $getSelection, $isRangeSelection, CAN_REDO_COMMAND, CAN_UNDO_COMMAND, COMMAND_PRIORITY_LOW, ElementFormatType, FORMAT_ELEMENT_COMMAND, FORMAT_TEXT_COMMAND, REDO_COMMAND, SELECTION_CHANGE_COMMAND, TextFormatType, UNDO_COMMAND } from "lexical";
import { $insertList, INSERT_CHECK_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list"

function Divider() {
  return <div className="divider" />;
}

export default function ToolbarPlugin() {
  const toolbarRef = useRef(null);
  const [editor] = useLexicalComposerContext();
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
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(SELECTION_CHANGE_COMMAND, (_payload, _newEditor) => { $updateToolbar(); return false; }, COMMAND_PRIORITY_LOW),
      editor.registerCommand(CAN_UNDO_COMMAND, (payload) => { setCanUndo(payload); return false; }, COMMAND_PRIORITY_LOW),
      editor.registerCommand(CAN_REDO_COMMAND, (payload) => { setCanRedo(payload); return false; }, COMMAND_PRIORITY_LOW),
      editor.registerCommand(INSERT_UNORDERED_LIST_COMMAND, () => { $insertList('bullet'); return true; }, COMMAND_PRIORITY_LOW),
      editor.registerCommand(INSERT_ORDERED_LIST_COMMAND, () => { $insertList('number'); return true; }, COMMAND_PRIORITY_LOW),
      editor.registerCommand(INSERT_CHECK_LIST_COMMAND, () => { $insertList('check'); return true; }, COMMAND_PRIORITY_LOW)
    );
  }, [editor, $updateToolbar]);

  const formatButtons = [
    { value: isBold, payload: "bold", label: "Format Bold", icon: Bold },
    { value: isItalic, payload: "italic", label: "Format Italic", icon: Italic },
    { value: isUnderline, payload: "underline", label: "Format Underline", icon: Underline },
    { value: isStrikethrough, payload: "strikethrough", label: "Format Strikethrough", icon: Strikethrough },
  ]

  const alignButtons = [
    { payload: "left", label: "Left Align", icon: AlignLeft },
    { payload: "center", label: "Center Align", icon: AlignCenter },
    { payload: "right", label: "Right Align", icon: AlignRight },
    { payload: "justify", label: "Justify Align", icon: AlignJustify },
  ]

  const listButtons = [
    { command: INSERT_UNORDERED_LIST_COMMAND, label: "Unordered List", icon: List },
    { command: INSERT_ORDERED_LIST_COMMAND, label: "Ordered List", icon: ListOrdered },
    { command: INSERT_CHECK_LIST_COMMAND, label: "Checklist", icon: ListCheck }
  ]

  return (
    <div className="toolbar" ref={toolbarRef}>

      {/* Undo button */}
      <Button disabled={!canUndo} variant="ghost" size="icon" onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)} aria-label="Undo">
        <Undo />
      </Button>

      {/* Redo button */}
      <Button disabled={!canRedo} variant="ghost" size="icon" onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)} aria-label="Redo">
        <Redo />
      </Button>

      <Divider />

      {formatButtons.map((button) => (
        <Button
          variant='ghost'
          size='icon'
          className={button.value ? "bg-secondary" : ''}
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, button.payload as TextFormatType)}
          aria-label={button.label}
        >
          <button.icon />
        </Button>
      ))}

      <Divider />

      {alignButtons.map((button) => (
        <Button
          variant='ghost'
          size='icon'
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, button.payload as ElementFormatType)}
          aria-label={button.label}
        >
          <button.icon />
        </Button>
      ))}

      <Divider />

      {listButtons.map((button) => (
        <Button
          variant='ghost'
          size='icon'
          onClick={() => editor.dispatchCommand(button.command, undefined)}
          aria-label={button.label}
        >
          <button.icon />
        </Button>
      ))}
    </div>
  );
}
