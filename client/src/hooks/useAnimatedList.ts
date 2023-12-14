import { createRef, useCallback, useEffect, useRef, useState } from 'react';

export interface Toast {
  id: number;
  type: 'default' | 'success' | 'danger';
  text: string;
  duration?: number;
}

export default function useAnimatedList() {
  const [pendingRemovalMessagesIds, setPendingRemovalMessagesIds] = useState<number[]>([]);
  const [messages, setMessages] = useState<Toast[]>([]);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleAnimationEnd = useCallback((id: number) => {
    const removeListener = animationEndListeners.current.get(id);
    removeListener();

    animationEndListeners.current.delete(id);
    animatedRefs.current.delete(id);

    setMessages((prevState) => prevState.filter((message) => message.id !== id));
    setPendingRemovalMessagesIds((prevState) => prevState.filter((messageId) => messageId !== id));
  }, []);

  useEffect(() => {
    pendingRemovalMessagesIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const animatedElement = animatedRef?.current;
      const hasAlreadyListener = animationEndListeners.current.has(itemId);

      if (animatedElement && !hasAlreadyListener) {
        const onAnimationEnd = () => handleAnimationEnd(itemId);
        const removeListener = () => {
          animatedElement.removeEventListener('animationend', onAnimationEnd);
        };

        animatedElement.addEventListener('animationend', onAnimationEnd);

        animationEndListeners.current.set(itemId, removeListener);
      }

      const removeListeners = animationEndListeners.current;
      return () => {
        removeListeners.forEach((removeListener) => removeListener());
      };
    });
  }, [handleAnimationEnd, pendingRemovalMessagesIds]);

  const handleRemoveMessage = useCallback((id: number) => {
    setPendingRemovalMessagesIds((prevState) => [...prevState, id]);
  }, []);

  const getAnimatedRef = useCallback(
    (id: number) => {
      let animatedRef = animatedRefs.current.get(id);

      if (!animatedRef) {
        animatedRef = createRef();
        animatedRefs.current.set(id, animatedRef);
      }

      return animatedRef;
    },
    [animatedRefs]
  );

  const renderList = useCallback(
    (
      renderItem: (
        message: Toast,
        { isLeaving, animatedRef }: { isLeaving: boolean; animatedRef: unknown }
      ) => React.ReactNode
    ) =>
      messages.map((item) => {
        const animatedRef = getAnimatedRef(item.id);

        return renderItem(item, {
          isLeaving: pendingRemovalMessagesIds.includes(item.id),
          animatedRef,
        });
      }),
    [getAnimatedRef, messages, pendingRemovalMessagesIds]
  );

  return {
    messages,
    setMessages,
    handleRemoveMessage,
    renderList,
  };
}
