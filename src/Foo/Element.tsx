import React from 'react';
import { FontEnumType } from './types';

const Element = ({ attributes, children, element }) => {
  const style = {
    textAlign: element.align,
    display: element._title ? 'none' : 'normal',
    color: '#202224',
    
  };
  switch (element.type) {
    case FontEnumType.H1:
      return (
        <h1
          id={element?.id}
          className="header-anchor"
          style={{
            fontSize: '32px',
            lineHeight: '48px',
            fontWeight: '500',
            ...style,
          }}
          {...attributes}
        >
          {children}
        </h1>
      );
    case FontEnumType.H2:
      return (
        <h2
          id={element?.id}
          className="header-anchor"
          style={{
            fontSize: '24px',
            lineHeight: '36px',
            fontWeight: '500',
            ...style,
          }}
          {...attributes}
        >
          {children}
        </h2>
      );
    case FontEnumType.H3:
      return (
        <h3
          id={element?.id}
          className="header-anchor"
          style={{
            fontSize: '18px',
            lineHeight: '27px',
            fontWeight: '500',
            ...style,
          }}
          {...attributes}
        >
          {children}
        </h3>
      );
    default:
      return (
        <p
          {...attributes}
          style={{ ...style, fontSize: '16px',fontWeight:'400', lineHeight: '28px', margin:'8px 0', }}
        >
          {children}
        </p>
      );
  }
};
export default Element
