import React from 'react';
import { MarkEnumType } from './types';
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf[MarkEnumType.Bold]) {
    children = <b>{children}</b>;
  }

  if (leaf[MarkEnumType.Italic]) {
    children = <em>{children}</em>;
  }

  if (leaf[MarkEnumType.Strikethrough]) {
    children = <s>{children}</s>;
  }

  if (leaf[MarkEnumType.Underline]) {
    children = <u>{children}</u>;
  }
  if (leaf.highlight) {
    children = <span id='need_high' style={{ backgroundColor: '#DADEF3', padding: '5px 0' }}>{children}</span>;
  }

  if (leaf[MarkEnumType.Superscript]) {
    children = <sup>{children}</sup>;
  }
  // if (leaf[MarkEnumType.BACKSLASH]) {
  //   children = <span className='backslash_sp'>{children}<i></i></span>;
  // }
  if (leaf.placeholder) {
    children = <>
      {children}
      <span id='element_placeholder' style={{ 'opacity': 0.3, position: "absolute", left: '100%', top: '50%', transform: 'translateY(-50%)', width: 'max-content', pointerEvents: 'none', userSelect: 'none', 'WebkitUserSelect': 'none', 'MozUserSelect': 'none', 'msUserSelect': 'none' }}
        contentEditable={false}// 防止光标移到这里
      >请输入内容</span>
    </>
  }

  return (
    <span {...attributes} style={{ fontSize: 'inherit', position: 'relative' }} >
      {children}
    </span>
  );
};

export default Leaf;
