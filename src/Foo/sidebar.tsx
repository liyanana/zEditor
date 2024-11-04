import { useContext, useEffect, useMemo, useState } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { MyContext } from './MyContext';
import useHoverPosition from './useHoverPosition.ts';

import { Editor } from 'slate';
export function SideBar() {
  const { top, hoveredElement } = useHoverPosition();
  const editor = useSlate();
  const hasContent =
    editor.selection && Editor.string(editor, editor.selection);
  const { isLock, setIsHandleClick } = useContext(MyContext);
  const [currentTop, setcurrentTop] = useState(top);
  useEffect(() => {
    if (!isLock) {
      setcurrentTop(top);
    }
  }, [top, isLock]);

  function onClick() {
    if (hoveredElement) {
      setIsHandleClick(true);
      // 手动选中
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(hoveredElement);
      selection?.removeAllRanges();
      selection?.addRange(range);
      const text = selection?.toString()?.trim() || '';
      if (!text) {
        // 手动给这个element增加一个光标
        range.setStart(hoveredElement, 0);
        setTimeout(() => {
          const event = new KeyboardEvent('keydown', {
            key: '/',
            bubbles: true,
            cancelable: true,
          });
          window.dispatchEvent(event);
          return;
        }, 1);
      }

      const { anchorNode, anchorOffset, focusNode, focusOffset } =
        selection || {};
      const anchor = ReactEditor.toSlatePoint(
        editor,
        [anchorNode, anchorOffset],
        {},
      );
      const focus = ReactEditor.toSlatePoint(
        editor,
        [focusNode, focusOffset],
        {},
      );
      editor.setSelection({
        anchor,
        focus,
      });
    }
  }

  return useMemo(
    () => (
      <div
      className='zEditor-sidebar'
        style={{
          left: '-5px',
          top: currentTop || 0,
          transform: 'translate(-100%, 0)',
          transition: '0.2s ease',
          width: '28px',
          height: '28px',
          boxShadow: '0px 2px 5px 0px #D3D9E0',
          borderRadius: '8px',
          background: '#F4F6FD',
          zIndex: 9,
          display:currentTop == null ?'none':'flex'
        }}
        onClick={onClick}
      >
        <img
          src={
            'data:image/png;base64,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'
          }
          width={15}
          height={15}
        />
      </div>
    ),
    [currentTop],
  );
}
