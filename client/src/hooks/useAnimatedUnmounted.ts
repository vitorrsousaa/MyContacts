import { useEffect, useRef, useState } from 'react';

export default function useAnimatedUnmounted(isOpen: boolean) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const animatedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const animatedRefElement = animatedRef.current;
    if (!isOpen && animatedRefElement) {
      animatedRef.current?.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (animatedRefElement) {
        animatedRefElement.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [isOpen]);

  return {
    shouldRender,
    animatedRef,
  };
}
