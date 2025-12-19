"use client"

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { LinkNode } from "@lexical/link";
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

import ToolbarPlugin from './toolbar';
import editorTheme from './editor-theme';
import './styles.css';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';

const editorConfig = {
  // NOTE: This is critical for collaboration plugin to set editor state to null. It
  // would indicate that the editor should not try to set any default state
  // (not even empty one), and let collaboration plugin do it instead
  editorState: null,
  namespace: 'React.js Collab Demo',
  nodes: [
    LinkNode
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
        <LinkPlugin />
        <AutoFocusPlugin />
      </div>
    </div>
    </LexicalComposer>
  );
}
