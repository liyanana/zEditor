import { useEffect, useState, useRef } from 'react';
import { useSlate } from 'slate-react';
import { ReactEditor } from 'slate-react';

export const useDetectSlash = () => {
  const editor = useSlate();
  const slashDetectedRef = useRef(false);

  const [slashDetected, setSlashDetected] = useState(false); //是否根据反斜杠展示下拉框
  const [slashPosition, setSlashPosition] = useState({ top: 0, left: 0 }); //下拉框的位置
  const [slashSelection, setslashSelection] = useState(null); //反斜杠的位置
  const [slashRect, setSlashRect] = useState(null);

  function reset() {
    slashDetectedRef.current = false;
    setSlashDetected(false);
    setSlashPosition({ top: 0, left: 0 });
    setslashSelection(null);
    setSlashRect(null)
  }
  // //

  // useEffect(() => {
  //   const handleKeyDown = event => {
  //     if (event.key === '/') {
  //       event.preventDefault();
  //       const selection = editor.selection || {
  //         anchor: { path: [0, 0], offset: 0 },
  //         focus: { path: [0, 0], offset: 0 },
  //       };
  //       const domRange = ReactEditor.toDOMRange(editor, selection);
  //       const rect = domRange.getBoundingClientRect();
  //       const { top, left } = rect;
  //       setSlashDetected(true);
  //       slashDetectedRef.current = true; // 更新引用值
  //       setSlashPosition({ top, left }); //保存tools的位置
  //       setslashSelection(selection); //保存光标的位置
  //       setSlashRect(rect)

  //     }
  //   };

  //   // const handleClick = event => {
  //   //   // 如果是反斜杠阶段 && 点击的不是input 恢复
  //   //   // console.log('🎈', slashDetectedRef.current, tagname)
  //   //   const specifiedElement = document.getElementById('super_editor_amn'); // 替换为你的id
  //   //   // console.log('点击到编辑器上看', specifiedElement?.contains(event.target))
  //   //   const isSlate = specifiedElement?.contains(event.target);
  //   //   if (isSlate) {
  //   //     // if (lock.current) {
  //   //     reset();
  //   //     // }
  //   //   } else {
  //   //     lock.current = true;
  //   //   }


  //   // };

  //   window.addEventListener('keydown', handleKeyDown);
  //   // window.addEventListener('click', handleClick);

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //     // window.removeEventListener('click', handleClick);
  //   };
  // }, [editor]);

  return { slashDetected, slashPosition, slashRect, slashSelection, reset };
};

