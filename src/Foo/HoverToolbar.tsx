import React, { useRef, useEffect, useState, useCallback, useContext } from 'react';
import { useSlate, useFocused, ReactEditor } from 'slate-react';
import { Editor, Range, Path, Transforms } from 'slate';

import AIRender from './AIRender';
import {deserializeHTML} from './utils';
import {useDetectSlash} from './useDetectKeydown.ts';
import { useFocus } from './useFocus.ts';
import useTextSelection from './useTextSelection.ts';
import { MyContext } from './MyContext';
import { useEventListener, useScroll } from 'ahooks';
// import { stopSSE } from '@/servies/sse';

const HoverToolbar = props => {
  const { setToolBarHeight } = props
  const ref = useRef<HTMLDivElement | null>()
  const editor = useSlate()

  const inFocus = useFocused()
  const [toggle, settoggle] = useState(false) //是否需要给选中加颜色
  const [content, setcontent] = useState() //划线的内容string
  const [selection, setselection] = useState()
  const { slashDetected, slashRect, slashPosition, slashSelection, reset } = useDetectSlash()
  const { clickInref, setClickInRef } = useFocus(ref)
  const AIref = useRef()
  const hasContent = editor.selection && Editor.string(editor, editor.selection)
  const selectionEnd = useTextSelection()
  const { isLock, setIsLock, isHandleClick, setIsHandleClick, setToolsClick } = useContext(MyContext)

  const scrollDom=useScroll(()=>document.getElementById('super_editor_amn'))
  useEventListener(
    'click',
    e => {
      const tagName = e.target.tagName.toLowerCase();
      if (tagName == 'li' && hasContent) {
        setTimeout(() => {
          const domRange = ReactEditor.toDOMRange(editor, selection);
          const rect = domRange.getBoundingClientRect()
          setPositionFun(rect)
        }, 0);
      }
    },
    { target: document.getElementById('fixtoolbar_select') },
  )

  useEffect(() => {
    setIsLock(!!hasContent || (!hasContent && slashDetected))
    if (!slashDetected && !hasContent) {
      setIsHandleClick(false)
    }
  }, [hasContent, slashDetected])

  useEffect(() => {
    if (slashDetected) {
      setClickInRef(false)
      setTimeout(() => {
        AIref.current.focus()
      }, 300)
    }
  }, [slashDetected])

  // useEffect(() => {
  //   if (!slashDetected) {
  //     toggleMark(!clickInref)
  //   }
  // }, [clickInref, slashDetected])

  // if (
  //   editor.selection
  // ) {
  //   const [a] = Editor.above(editor, editor.selection)
  //   console.log(a)
  // }


  useEffect(() => {
    const el = ref.current

    if (!el) {
      return
    }

    const { selection: _selection } = editor //选中区域或者光标位置
    if (toggle) {
      return
    }

    if (!hasContent) {
      onClose()
    }

    if (slashDetected) {
      setPositionFun(slashRect)
    }

    if (_selection && hasContent && (selectionEnd == 2 || isHandleClick)) {
      // 记录选区内容
      const domSelection = window.getSelection()
      setselection(_selection)
      const text = domSelection.toString()
      setcontent(text)
      // 记录选区的，位置
      const domRange = domSelection.getRangeAt(0)
      const rect = domRange.getBoundingClientRect()
      setPositionFun(rect) //
      Transforms.select(editor, _selection);
    }
  }, [
    editor?.selection,
    slashDetected,
    slashSelection,
    slashPosition,
    toggle,
    selectionEnd,
    hasContent,
    isHandleClick,
    slashRect,
  ])

  /**
   * 隐藏AiTools
   * 停止内部的请求操作
   * 恢复所有默认
   */

  function onClose() {
    const el = ref.current
    el.removeAttribute('style')
    AIref?.current?.refresh()
  }

  useEffect(() => {
    const el = ref.current
    const isDisplay = el?.style?.display == 'block'
    if (!inFocus && clickInref && isDisplay) {
      setToolsClick(null)
      onClose()
      // toggleMark(false)
      reset()
      // stopSSE()
      Transforms.deselect(editor)
    }
  }, [inFocus, clickInref])

  function setPositionFun(rect) {
    const el = ref.current
    el.style.opacity = '1'
    el.style.display = 'block'
   
    // 获取super_editor_amn距离视口顶部的高度
    // 获取super_editor_amn滚动高度
    
    const idDom=document.getElementById('super_editor_amn')
    const idDomTop=idDom.getBoundingClientRect()?.top||0
    const scrollDom=document.getElementById('ana-editor-slate-wrapper')
    const scrollTop=scrollDom?.scrollTop
        // 获取super_editor_amn 滚动高度
    el.style.top = `${rect?.bottom +scrollTop - 48   - idDomTop +12}px`
  }

  

  /**
   *
   * @param text isAdd
   * @param isAdd true为插入 默认为替换
   */

  const onReplace = useCallback(
    (text, isAdd: boolean) => {
      console.log(text)
      // Editor.deleteBackward(editor)

      const [start, end] = Editor.edges(editor, slashDetected ? slashSelection : selection)
      let md2slate = deserializeHTML(text)
      // console.log(md2slate)
      if (!isAdd) {
        // 是替换
        setTimeout(() => {
          Transforms.delete(editor, { at: { anchor: start, focus: end } })
          Transforms.insertNodes(editor, md2slate, { at: { anchor: start, focus: start } })
        }, 20)
      } else {
        setTimeout(() => {
          Transforms.insertNodes(editor, md2slate, { at: { anchor: end, focus: end } })
        }, 20)
      }
      AIref?.current?.refresh()
      onClose()
      Transforms.deselect(editor)

      // toggleMark(false)
      reset()
    },
    [selection, editor, slashDetected, slashSelection],
  )

  return (
    <div
      ref={ref}
      onMouseDown={e => {
        // prevent toolbar from taking focus away from editor
        e.preventDefault();
      }}
      id="ai-tools-container"
    >
      <AIRender
        ref={AIref}
        // onToggleMask={bool => {
        //   toggleMark(bool);
        // }}
        content={content}
        onReplace={onReplace}
        isSlash={slashDetected}
        setToolBarHeight={setToolBarHeight}
      />
    </div>
  )
}
export default HoverToolbar