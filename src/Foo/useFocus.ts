//生成一个自定义react hook
import { useClickAway } from 'ahooks';
import { setIn } from 'formik';
import { useState, useEffect, useRef } from 'react';

// 是否点在toole之外
export function useFocus(ref) {
  const [clickInref, setClickInRef] = useState(true);
  const _ref = useRef()

  useEffect(() => {
    function click(event) {
      const myElement = document.getElementById('super_editor_amn');
      const fixtoolbar_select = document.getElementById('fixtoolbar_select');
      const hovertoolbar = document.getElementById('ai-tools-container');
      const isClickInside =!fixtoolbar_select?.contains(event.target) && !hovertoolbar?.contains(event.target);
      // console.log(isClickInside)
      _ref.current = isClickInside;
      setClickInRef(isClickInside); // 更新状态
    }

    document.addEventListener('mousedown', click);
    return () => {
      document.removeEventListener('mousedown', click);
    }
  }, [_ref]);

  return { clickInref, setClickInRef };
}
