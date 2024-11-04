import { useEffect, useState } from 'react';

function useTextSelection() {
  const [selectionEnd, setSelectionEnd] = useState(0);

  useEffect(() => {
    const handleMouseUp = () => {
      if (selectionEnd === 1) {
        setSelectionEnd(2);
      } else {
        setSelectionEnd(0);
      }
    };

    const handleSelectionChange = () => {
      if (window.getSelection().toString().length > 0) {
        setSelectionEnd(1);
      } else {
        setSelectionEnd(0);
      }
    };

    const handleMouseDown = () => {
      setSelectionEnd(0);
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [selectionEnd]);

  return selectionEnd;
}


export default useTextSelection;
