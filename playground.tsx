import { Dispatch, useCallback, useContext, useState } from "react";

import { Button } from "./components/ui/button";
import { Link } from "lucide-react";

import { LexicalEditor } from "lexical";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { sanitizeUrl } from "./components/editor/url";
import { useToolbarState } from "./components/editor/toolbar-context";

export default function Playground({ editor, activeEditor, setIsLinkEditMode }: {
  editor: LexicalEditor
  activeEditor: LexicalEditor;
  setIsLinkEditMode: Dispatch<boolean>
}) {
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());
  const { toolbarState, updateToolbarState } = useToolbarState();

  const insertLink = useCallback(() => {
    if (!toolbarState.isLink) {
      setIsLinkEditMode(true);
      activeEditor.dispatchCommand(
        TOGGLE_LINK_COMMAND,
        sanitizeUrl("https://")
      );
    } else {
      setIsLinkEditMode(false);
      activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [activeEditor, setIsLinkEditMode, toolbarState.isLink]);

  return (
    <Button
      disabled={!isEditable}
      onClick={insertLink}
      aria-label="Insert link"
    >
      <Link />
    </Button>
  );
}
