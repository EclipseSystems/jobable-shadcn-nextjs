"use client"

import { LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list"

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

import './styles.css';
import editorTheme from './editor-theme';
import ToolbarPlugin from './toolbar';

const editorConfig = {
  // NOTE: This is critical for collaboration plugin to set editor state to null. It
  // would indicate that the editor should not try to set any default state
  // (not even empty one), and let collaboration plugin do it instead
  editorState: null,
  namespace: 'React.js Collab Demo',
  nodes: [
    LinkNode,
    ListNode,
    ListItemNode
  ],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: editorTheme,
};

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export default function Editor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
    <div className="editor-container">
      <ToolbarPlugin />
      <div className="editor-inner">
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <AutoFocusPlugin />
        <CheckListPlugin />
        <ListPlugin />        
        <LinkPlugin />
      </div>
    </div>
    </LexicalComposer>
  );
}
