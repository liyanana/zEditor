import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const MyContext = createContext();

// Create a provider component
export const MyProvider = ({ children, ...props }) => {
  const [isLock, setIsLock] = useState(false); //sideBar是否被锁定
  const [isHandleClick, setIsHandleClick] = useState(false); //是否是手动点击
  const [toolsClick, setToolsClick] = useState(null); //默认选哪个快捷问题
  const {selection} = props


  return (
    <MyContext.Provider
      value={{ isLock, setIsLock, isHandleClick, setIsHandleClick, toolsClick, setToolsClick,selection }}
    >
      {children}
    </MyContext.Provider>
  );
};
