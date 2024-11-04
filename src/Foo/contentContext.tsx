import { useEffect, useState } from "react";
import {
    Editor,
    Range,
    Element as SlateElement,
  } from "slate";
export function useMyContext(editor){
    const [editorContext, setEditorContext] = useState({});
    const getSurroundingText = (length: number = 1000) => {
        const { selection } = editor;
    
        if (!selection || Range.isCollapsed(selection)) {
          return { before: "", after: "" };
        }
    
        const { anchor, focus } = selection;
    
        // 获取选区前100字符
        const beforePoint = Editor.before(editor, anchor, {
          unit: "character",
          distance: length,
        });
        const beforeText = beforePoint
          ? Editor.string(editor, { anchor: beforePoint, focus: anchor })
          : "";
    
        // 获取选区后100字符
        const afterPoint = Editor.after(editor, focus, {
          unit: "character",
          distance: length,
        });
        const afterText = afterPoint
          ? Editor.string(editor, { anchor: focus, focus: afterPoint })
          : "";

          setEditorContext({
            before: beforeText,
            after: afterText,
            content: Editor.string(editor, editor.selection),
            selection: editor.selection,
          })
      };
      useEffect(() => {
        getSurroundingText();
      
      }, [editor.selection]);

    
    return editorContext
}