import isHotkey from 'is-hotkey';
import { MyProvider } from './MyContext';

type ZEDitorProps = {
  value: string | any[]; //接受markdown的字符串或者直接是slatejs所需数据格式的数据
  valueType: 'markdown' | 'json'; //如果,
  onContentChange: (value: any) => void;
  selection: {
    onChange: (value: any) => void;
    length: 1000;
  };
  //当前内容变化时候触发
};

import { Editor, Node, Range, Transforms, createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { withHistory } from 'slate-history';
import Element from './Element';
import HoverToolbar from './HoverToolbar';
import Leaf from './Leaf';
import { ToolBar } from './ToolBar';
import { SideBar } from './sidebar';
import { FontEnumType } from './types';
import {
  deserializeHTML,
  getSurroundingText,
  onSetTotalSum,
  toggleMark,
  withId,
} from './utils';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+z': 'undo',
  'mod+y': 'redo',
};

const ZEditor = (props: ZEDitorProps) => {
  const editor = useMemo(
    () => withId(withHistory(withReact(createEditor()))),
    [],
  );
  const {
    value = '',
    valueType = 'markdown',
    onContentChange,
    selection,
  } = props;
  const [isEditorEmpty, setIsEditorEmpty] = useState(false);
  const [toolBarHeight, setToolBarHeight] = useState(0);

  useEffect(() => {
    const trueEditor = valueType == 'markdown' ? deserializeHTML(value) : value;
    editor.children = trueEditor;
    onSetTotalSum(editor);
  }, [value]);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const { redo, undo } = editor;
  function handleEnterKey(event) {
    const { selection } = editor;
    const nodes = Editor.above(editor);
    const text = nodes[0].children[0].text;
    const type = nodes[0].type;
    const offset = selection?.focus?.offset;
    if (type !== FontEnumType.正文 && text?.length == offset) {
      event.preventDefault();
      Transforms.insertNodes(editor, {
        type: FontEnumType.正文,
        children: [{ text: '' }],
      });

      return;
    }
  }

  return (
    <div id="super_editor_amn" style={{ height: '800px' }}>
      <div id="ana-editor-slate-wrapper" className="ana-editor-slate-wrapper">
        <Slate
          editor={editor}
          initialValue={
            valueType == 'markdown' ? deserializeHTML(value) : value
          }
          onChange={(value) => {
            setIsEditorEmpty(
              editor.children.length <= 1 &&
                Array.from(Node.texts(editor)).length <= 1 &&
                Node.string(editor) === '',
            );
            const isContentChange = editor.operations.some(
              (op) => 'set_selection' !== op.type,
            );
            if (isContentChange) {
              onContentChange?.(value);
              onSetTotalSum(editor);
            } else {
              const {
                before,
                after,
                content,
                selection: _selection,
              } = getSurroundingText(editor, selection?.length);
              selection?.onChange({
                content,
                before,
                after,
                selection: _selection,
              });
            }
          }}
        >
          <div className="super_editor_amn_fixtop">
            <ToolBar />
          </div>

          <div
            id="super_editor_amn_content_id"
            className="super_editor_amn_content"
            style={{
              padding: '0 35px 30px',
              background: '#fff',
            }}
          >
            <div
              className="editor-doc"
              style={{
                paddingBottom: toolBarHeight || 20,
                paddingTop: 20,
                position: 'relative',
              }}
            >
              <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                renderPlaceholder={({ children, attributes }) => (
                  <div className="text-base" {...attributes}>
                    <p>{children}</p>
                  </div>
                )}
                decorate={([node, path]) => {
                  // 空行添加placeholder
                  if (editor.selection != null) {
                    if (
                      !Editor.isEditor(node) &&
                      Editor.string(editor, [path[0]]) === '' &&
                      Range.includes(editor.selection, path) &&
                      Range.isCollapsed(editor.selection)
                    ) {
                      return [
                        {
                          ...editor.selection,
                          placeholder: true,
                        },
                      ];
                    }
                  }

                  if (
                    editor.selection &&
                    Editor.string(editor, editor.selection)?.length > 0 &&
                    Range.includes(editor.selection, path)
                  ) {
                    return [
                      {
                        ...editor.selection,
                        highlight: true,
                      },
                    ];
                  }
                  return [];
                }}
                style={{
                  outline: 'none',
                  color: '#202224',
                }}
                spellCheck
                // autoFocus
                onKeyDown={(event) => {
                  if (event.key == 'Enter') {
                    handleEnterKey(event);
                  }
                  for (const hotkey in HOTKEYS) {
                    if (isHotkey(hotkey, event as any)) {
                      event.preventDefault();
                      const mark = HOTKEYS[hotkey];

                      switch (mark) {
                        case 'undo':
                          undo();
                          break;
                        case 'redo':
                          redo();
                          break;
                        default:
                          toggleMark(editor, mark);
                      }
                    }
                  }
                }}
              />
              <MyProvider>
                <HoverToolbar setToolBarHeight={setToolBarHeight} />
                <SideBar />
              </MyProvider>
            </div>
          </div>
        </Slate>
      </div>
    </div>
  );
};

export default ZEditor;
