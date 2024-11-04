import DOMPurify from 'dompurify';
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import  './index.less';

import { Editor, Range } from 'slate';
import { Input, message as antdMessage, notification, Tabs } from 'antd';
import { marked, use } from 'marked';
import { useSize } from 'ahooks';
import { useSlate } from 'slate-react';
import { MyContext } from './MyContext';
import { useMyContext } from './contentContext';
// import { sseRequest, stopSSE } from '@/servies/sse';
// import { devHost } from '@/servies/writing';

// const { TabPane } = Tabs;

// export const literature_deep = {
//   label: '主题综述',
//   img: TOOL5,
//   value: 'deep',
//   id: 'edit_tools_deep',
// };

// export const literature_simple = {
//   label: '问题调研',
//   img: TOOL5,
//   value: 'simple', //要调用知识库的内容
//   id: 'edit_tools_simple',
// };

const AIRrecommend = [
  // {
  //   label: '翻译为中文',
  //   img: TOOL5,
  //   getFullMessage: (content: string) =>
  //     `我想让你做一个中文翻译，我会用任何一种语言和你说话，把它翻译成中文，请直接返回给我翻译后的结果，我要翻译的内容是: ${content}`,
  // },
  // {
  //   label: '翻译为英文',
  //   img: TOOL4,
  //   getFullMessage: (
  //     content: string,
  //   ) => `我想让你做英语翻译，拼写纠正和写作改进的工作。我会用任何一种语言跟你说话，你要发现这种语言，把它翻译出来，然后用英语给出文章的更正和改进的版本。
  //   你应该使用科学文献语言逻辑，以及修辞知识和有效写作技巧的经验来回答。我想让你用更漂亮优雅的高级英语单词和句子代替我的简化的A0级单词和句子。意思保持不变，但要更有逻辑、简洁和有力。
  //   我希望你只回复更正和改进后的版本，不要写解释。我的段落是：${content}`,
  // },
  // {
  //   label: '润色',
  //   img: TOOL4,
  //   getFullMessage: (content: string) =>
  //     `请根据这段内容进行语言润色，用词尽量专业，准确，全面。我的段落是：${content}`,
  // },
  // {
  //   label: '解释',
  //   img: TOOL1,
  //   getFullMessage: (
  //     content: string,
  //   ) => `以下这段文本来源于某篇科研文献的领域词汇或者是文本，你的任务是对这段内容用容易理解的方式做出解释,返回结果只要解释的最终结果，不要返回补充说明类文字，不要分段。
  //   文本内容如下：${content}`,
  // },
  // {
  //   label: '精简文字',
  //   img: TOOL2,
  //   getFullMessage: (
  //     content: string,
  //   ) => `你扮演科学文本精炼的角色，我会给你提供一篇科学文献中的一段话。你的任务是把这段话精简到学术要求的字数。
  //   你应该使用科学文献语言逻辑，以及修辞知识和有效写作技巧的经验来回答。意思保持不变，但要更有逻辑、简洁和有力，精炼到100字以内。我的段落是：${content}`,
  // },
  // {
  //   label: '扩写',
  //   img: TOOL2,
  //   getFullMessage: (
  //     content: string,
  //   ) => `你扮演科学文本扩写的角色，我会给你提供一篇科学文献中的一段话。你的任务是把这段话进行学术扩写。
  //   你应该使用科学文献语言逻辑，以及修辞知识和有效写作技巧的经验来回答。我想让你用更漂亮优雅的句子扩写我的A0级单词和句子。意思保持不变，但要更有逻辑、全面和准确。我的段落是：${content}`,
  // },
  // {
  //   label: '生成题目',
  //   img: TOOL6,
  //   getFullMessage: (
  //     content: string,
  //   ) => `我会用任何一种语言为你提供一篇科学论文的摘要，你用同样的语言进行语言检测和回复。你的任务是根据同一语言的摘要和关键词，为我提供3个科学论文的标题。
  //   科学论文的标题应该简洁、清晰、信息量充实。
  //   你应该避免使用诸如“a study of”、“investigation of”、“development of”或“observations on”等无用的词语。确保标题能立即抓住观众的注意力。
  //   我的摘要是: ${content}`,
  // },
  // {
  //   label: '期刊匹配',
  //   img: TOOL3,
  //   getFullMessage: (
  //     content: string,
  //   ) => `你是一个科技文献手稿的匹配者。我将向您提供我的论文稿件的标题、摘要和关键词。你的任务是综合分析我的题目、摘要和关键词，找到与我的研究最相关的、最有信誉的期刊。
  //   你需要提供给我 10本 最合适的期刊。你的回复应包括期刊名称，相应的匹配分数(满分为10分)。我希望你按照排序匹配分数降低的顺序，以 Excel 表格形式回复。：${content}`,
  // },
  // {
  //   label: '纠错',
  //   img: TOOL3,
  //   getFullMessage: (content: string) =>
  //     `你是一个专业领域的科学专家。我将向您提供我的论文稿件的标题、摘要和关键词。你的任务是综合分析所选择的内容进行纠错，纠错范围有，错别字纠错，语法纠错，科学概念纠错，并直接返回纠错内容。我的论文文本如下：${content}`,
  // },
   {
    label: '扩写',
    url:'/writing/expand_writing/'
    // getFullMessage: (
    //   content: string,
    // ) => `你扮演科学文本扩写的角色，我会给你提供一篇科学文献中的一段话。你的任务是把这段话进行学术扩写。
    // 你应该使用科学文献语言逻辑，以及修辞知识和有效写作技巧的经验来回答。我想让你用更漂亮优雅的句子扩写我的A0级单词和句子。意思保持不变，但要更有逻辑、全面和准确。我的段落是：${content}`,
  },
  {
    label: '续写',
    url:'/writing/continue_rewrite/'
    // getFullMessage: (
    //   content: string,
    // ) => `你扮演科学文本扩写的角色，我会给你提供一篇科学文献中的一段话。你的任务是把这段话进行学术扩写。
    // 你应该使用科学文献语言逻辑，以及修辞知识和有效写作技巧的经验来回答。我想让你用更漂亮优雅的句子扩写我的A0级单词和句子。意思保持不变，但要更有逻辑、全面和准确。我的段落是：${content}`,
  },
  {
    label: '改写',
    url:'/writing/format_rewrite/'
    // getFullMessage: (
    //   content: string,
    // ) => `你扮演科学文本扩写的角色，我会给你提供一篇科学文献中的一段话。你的任务是把这段话进行学术扩写。
    // 你应该使用科学文献语言逻辑，以及修辞知识和有效写作技巧的经验来回答。我想让你用更漂亮优雅的句子扩写我的A0级单词和句子。意思保持不变，但要更有逻辑、全面和准确。我的段落是：${content}`,
  },
];
const AIRrecommend2 = [
  {
    label: '续写',
    getFullMessage: (content: string) => `请根据我的内容进行续写，要保持专业性和连贯性`,
  },
  // {
  //   label: '激发灵感',
  //   img: TOOL5,
  //   getFullMessage: (content: string) => `请根据我的内容进行灵感提示`,
  // },
//   literature_simple,
//   literature_deep,
];

interface IAIRender {
  isSlash: boolean; //是否是反斜杠光标输入
}
function AIRender(props, ref) {
  const [inputV, setinputV] = useState('');
  const { content, onReplace, isSlash, setToolBarHeight } = props; //visible 是否展示tools
  const [AIContent, setAIContent] = useState('');
  const [steps, setsteps] = useState(0); //0 未提问 1 提问中 2 问题生成中 3 问题生成完成
  const [checked, setChecked] = useState(null); //选择综述类型
  const messageControllerRef = useRef(new AbortController());
  const [lList, setLList] = useState();
  const inputRef = useRef();
  const timer = useRef();
  const AIREf = useRef();
  const RecoRef = useRef();
  const toolsREf = useRef();
  const myRef = useRef({ stop: false });
  const editor = useSlate();
  const { toolsClick, setToolsClick } = useContext(MyContext);
  const toolsSelect = checked || toolsClick;
  const AIGCREF = useRef()
  const wrapperRef = useRef()
  const prevMessageRef = useRef(null)
  const AIGCSize = useSize(AIGCREF);
  const editorContext=useMyContext(editor)


  useEffect(() => {
    if (AIGCSize?.height > 450) {
      wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight

    }

  }, [AIGCSize?.height])

  useEffect(() => {
    setTimeout(() => {
      inputRef?.current?.focus();
    }, [1])
  }, [toolsSelect])

  useImperativeHandle(ref, () => ({
    refresh,
    focus: () => {
      inputRef?.current?.focus();
    },
    // toolHeight: (toolsREf?.current?.clientHeight || 0) + (RecoRef?.current?.clientHeight || 0),
  }));

  useEffect(() => {
    setToolBarHeight((toolsREf?.current?.clientHeight || 0) + (RecoRef?.current?.clientHeight || 0));
  })


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        stopCreate();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // function onPressEnter(text: string, previousText?: string) {
  //   if (text) {
  //     AIGC(
  //       text + '\n 备注：请简洁回复，不要加粗，不要返回无序列表或者有序列表，不要有标题，只要正文',
  //       previousText,
  //     );
  //   }
  // }

  function onPressEnter(item) {
    setsteps(1);
    // gradual.current.streamEnd = false
    sseRequest({
      base: devHost,
      url: item.url,
      payload:{
        title:'报告',
        pre:editorContext?.before,
        last:editorContext?.after,
        content:editorContext?.content
      },
      onmessage: (res) => {
        // sseCallback(res);
        // 返回的数据
        if (res.data !== '[DONE]') {
          let data = JSON.parse(res.data).choices[0].delta.content
          setAIContent((str) => str + '' + data)
        }else{
          setsteps(3)
        }
        // 如果终止请设置  setSteps(3)
      },
      onerror: (error) => {
        stopSSE()
      },
    })
     
  }


  // 获取光标前所有历史文本
  function getCharactersBeforeCursor() {
    const { selection } = editor;

    if (!selection) {
      return '';
    }

    const [start] = Range.edges(selection);

    const range = Editor.range(editor, [0, 0], start);
    const beforeText = Editor.string(editor, range);
    return beforeText || '';
  }

  // 暂停
  function stopCreate() {
    setsteps(3);
    // stopSSE()
    // clearInterval(timer.current);
    // myRef.current.stop = true;
    // messageControllerRef?.current?.abort();
    // messageControllerRef.current = new AbortController();
  }


  // 重置
  function refresh(item=null) {
    setsteps(0);
    messageControllerRef.current.abort();
    messageControllerRef.current = new AbortController();
    setAIContent('');
    clearInterval(timer.current);
    setinputV('');
    setChecked(item);
  }
  // 插入
  function downgradeMarkdownHeadings(markdown: string) {
    return markdown.replace(/^(#{1,6})\s+(.*)$/gm, (match, hashes, title) => {
      if (hashes.length === 1) {
        return `### ${title}`;
      } else {
        return `**${title}**`;
      }
    });
  }

  function addTitle(text) {
    let result = text;
    if (toolsClick?.value) {
      result = '## ' + inputV + '\n' + downgradeMarkdownHeadings(text)
    }
    return result

  }

  function add() {
    onReplace(addTitle(AIContent), true);
  }
  // 替换
  function replace() {
    onReplace(addTitle(AIContent));
  }

  function submitButton() {
    return (
      <span
        className={`${inputV ? 'opacity-100' : 'opacity-50'} ${inputV ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
        onClick={() => {
          if (!inputV?.trim()) return;
        //   let text = '';
        //   if (content) {
        //     text = `${content}\n 根据如上文本内容，我的提问如下\n${inputV},请回答`;
        //   } else {
        //     text = `我的提问如下\n${inputV},请根据我的问题回答`;
        //   }
        //   onPressEnter(text, getCharactersBeforeCursor());
        }}
      >
        <img src={'data:image/png;base64,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'} width={24} height={24}></img>
      </span>
    );
  }

  return (
    <div
      id="ai-write-content"
      className={'aiWriteContent'}
      style={{ position: 'relative' }}
      ref={AIREf}
    >
      <div
        id="ai-writing-tool"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 99,
          width:'100%'
        }}
        ref={toolsREf}
      >
        <div className={`aitool ${AIContent?'border':''}`}>

          {AIContent && (
            <><div className={'AIGC'} ref={wrapperRef}>
              <span
                className={'container'}
                ref={AIGCREF}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(marked?.parse(AIContent)),
                }}
              ></span>

            </div>
              {steps == 3 && (
                <div className={'contentFooter'}>
                  <span onClick={add}>插入</span>
                  {!isSlash && <span onClick={replace}>替换</span>}
                  <span
                    onClick={() => {
                    //   refresh(checked);
                    //   let text = '';
                    //   if (content) {
                    //     text = `${content}\n 根据如上文本内容，我的提问如下\n${inputV},请回答`;
                    //   } else {
                    //     text = `我的提问如下\n${inputV},请根据我的问题回答`;
                    //   }
                    //   onPressEnter(checked?.item||{});
                    }}
                  >
                    重新写作
                  </span>
                  <span
                    onClick={() => {
                      refresh(null);
                    }}
                  >
                    放弃
                  </span>
                </div>
              )}
            </>
          )}
          <div>
            {/* AI生成的内容 */}

            <div
              className={'inputContent'}
              style={{ background: '#fff', borderRadius: '8px', padding: '4px 0' }}
            >
              {(steps == 0 || steps == 3) && (
                <Input
                  ref={inputRef}
                  // value={inputV}
                  onClick={() => {
                    // props.onToggleMask(true);
                    inputRef?.current?.focus();
                  }}
                  placeholder="选择下列场景或者告诉AI如何编辑"
                  prefix={
                    <div className="flex items-center">
                      <img src={'data:image/png;base64,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'} width={22} height={20}></img>
                      {toolsSelect?.label && (
                        <span
                          className="prefixLabel cursor-pointer"
                          onClick={() => {
                            setChecked(null);
                          }}
                        >
                          {toolsSelect?.label}
                        </span>
                      )}
                    </div>
                  }
                  suffix={!toolsSelect?.value ? submitButton() : null}
                  style={{ border: 'none', borderRadius: '8px', height: '100%' }}
                  onPressEnter={e => {
                    // const value = e.target.value;

                    // if (!value) {
                    //   return;
                    // }
                    // let text = '';
                    // if (content) {
                    //   text = `${content}\n 根据如上文本内容，我的提问如下\n${inputV},请回答`;
                    // } else {
                    //   text = `我的提问如下\n${inputV},请根据我的问题回答`;
                    // }
                    // onPressEnter(text, getCharactersBeforeCursor());
                  }}
                  value={inputV}
                  onChange={v => {
                    setinputV(v.target.value);
                  }}
                />
              )}
              {/* {toolsSelect?.value && (steps == 0 || steps == 3) && (
                <div
                  className="flex justify-between items-center"
                  style={{ padding: '0 10px', marginTop: '15px' }}
                >
                  <KnowledgeBase
                    onChange={val => {
                      const _list = val?.map(item => item.id) || [];
                      setLList(_list);
                    }}
                  />
                  {submitButton()}
                </div>
              )} */}
              {steps == 1 && (
                <div className={style.op}>
                  <img className={style.loading} src={'data:image/png;base64,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'} alt="" width={16} height={16} />
                  {toolsSelect?.label && (
                    <span
                      className="prefixLabel"
                      onClick={() => {
                        setChecked(null);
                      }}
                    >
                      {toolsSelect.label}
                    </span>
                  )}
                  <span style={{ flex: 1 }}>&nbsp;AI创作中...</span>
                  <div
                    onClick={() => {
                      stopCreate();
                    }}
                    className='flex items-center gap-1'
                  >
                    <span style={{ color: '#636870' }}>ESC停止</span>
                    &nbsp;&nbsp;
                    <img
                      src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA+dJREFUWEfNmE1OIkEUgN+rNuASb4A3gBvIARTcCZlk2p2QSQZPoJwATSbgTiaZgDsbPYDcQG4gN5ClELvepLrptrrorv4RiSyM0NVVX73/9xC++Qc3wVcz2wVYLovAWAFsuwCIM+B8bt3dzD67fybA2slZ0WbsgBH9JICDSAjEORJNOcDYyOcH1uBqnhY4FaAAI8YuiMhMe5BYjwATJDpNI9lEgJ8FUy+DiAPM5c6TSDQWUMBxxCcAKK4dBDBx1GcYU2FzkMu5Nvf2VoCdnaJt2yUGUI0wgxlDPLaGvalOG1rAw3qzjYgXQFQIbILYYZwPkqpKOBFfLtsA8DuwF+KccX5u3d0MoiAjAWsnZyZHvJVfdFTDeScpmHqoYyqIXQKoyc8I4Pxx1L8KgwwFrDVaJQ7wpNy28zDsXWZxDvWdo0brEogu/N9dSZbDLr4G6KhjsXiWbY65nhephizQIRqaMaKKCrkGWG20bgNhBHFjkouTpDCh8bB3GjAr+cvKY1+83xDAGo/6x1kklPQdVSCMaF+WYkCC1XrzyQ8JGrtIeniSdWtCUaToA65s71Uy3C9TbZyqZSn6gE7MA+h6L7N8fi8u0h82WiZTY1vw9JkI5FEhxFuqSpEQTx+HPccpfUBZvSJnjkf9ik5F6oV0a+UDo9ZFne8DHjVar17c0wVO74CAvcYYGyJOx8NeOc2FH0Z9h835o4qYGUbF+vdnotuwWm++UEh+jsgGs/Gov6/br/bj1wG3bZHznY9nYi6gyBxEIji7DxVXD9t444AqA2JZFBIuYL1Z4wD3aRxk44BuBvOjiKdFFzBCvFtVsQoIcGyN+la4ilfi3SqgW3f6WYwFVBwh3q0Cqlpc+cFHmKk3yQNKFGYarWciKsVEGOdx6riKOH8Y9vb8MCP+SR2oGy0TiQIFbRRsogtLdYB8oY9UpxyYJNSIbCJ6jrB+xRUdzjnAtZe2oi6g1gHyhT6KBcVI4QvrQBVUrbDlOiBYbinFahIpJrFBbQYRgmHs2Uuzqr0GAONqs8/CRGSke7mJ0hasjrN855LfySohjfrWmqZ8vqzWoOFtp2IXK4/cWIUd2nYCVMKmDJGNe1hBKpooJBKTgExjtagZj05D2tGH07sy1lXHFQBwzXK5q7iWwHMKx2wYMwPN+ipOElFH1xLED4/cOk2UYvrh0fv7DHZ33fnfapgZOzwKadRVT48FdBzHbBdouexmnQuuHZpixpMIUFYVId5qp6qaYJll+JQK0Ac12wV7sRAtZ5UQS2vjOQlSZAaO+NfgfJLFuTIBqkISTuAM0ImKYBhzb5iZ1Il0GWojgF+RAr09/wPhs51Hc5fiwAAAAABJRU5ErkJggg=='}
                      alt=""
                      width={20}
                      height={20}
                      style={{
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* AI推荐的部分 */}
          {(steps == 0 || steps == 3) && !toolsSelect?.value && (
            <ul className={'recom'} ref={RecoRef}>
              {(!isSlash ? AIRrecommend : AIRrecommend2).map(item => {
                return (
                  <li
                    key={item.label}
                    onClick={() => {
                      // props.onToggleMask(true);
                      setChecked({ label: item.label, value: item.label ,item});
                        onPressEnter(item);
                    }}
                    id={item.id}
                  >
                    <img src={item.img} alt="" width={14} height={14} />
                    &nbsp;&nbsp;
                    {item.label}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
export default forwardRef(AIRender);
