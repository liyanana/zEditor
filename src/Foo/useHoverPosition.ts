import { useState, useEffect } from 'react';


/**
 * 
 * @returns 获取sideBar高度
 */
export const useHoverPosition = () => {
  const [hoveredElement, setHoveredElement] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {

    const handleMouseEnter = (event) => {
      const element = event.target.closest('[data-slate-node="element"]');
      // 获取element的lineHeight
      // 如果element子元素或者后代子元素拥有  data-slate-length="0"这个属性 
      // const hasEmpty = element?.querySelector('[data-slate-length="0"]')


      if (element) {
        const computedStyle = window.getComputedStyle(element);
        const marginTop = computedStyle.marginTop?.replace('px', '')||0;
        const top = element.offsetTop + 24 + +marginTop
        console.log()
        setHoveredElement(element);
        setPosition(top);
      }
    };



    // 获取到某个id的element

    document.addEventListener('mouseover', handleMouseEnter);

    return () => {
      document.removeEventListener('mouseover', handleMouseEnter);
    };
  }, []);

  return { hoveredElement, top: position };
};

export default useHoverPosition;
