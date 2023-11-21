import { useCallback, useState } from 'react';

interface Toast {
  id: number;
  type: 'default' | 'success' | 'danger';
  text: string;
  duration?: number;
}

export default function useAnimatedList() {
  const [pendingRemovalMessagesIds, setPendingRemovalMessagesIds] = useState<number[]>([]);
  const [messages, setMessages] = useState<Toast[]>([]);

  const handleRemoveMessage = useCallback((id: number) => {
    setPendingRemovalMessagesIds((prevState) => [...prevState, id]);
  }, []);

  const handleAnimationEnd = useCallback((id: number) => {
    setMessages((prevState) => prevState.filter((message) => message.id !== id));
    setPendingRemovalMessagesIds((prevState) => prevState.filter((messageId) => messageId !== id));
  }, []);

  return {
    messages,
    setMessages,
    pendingRemovalMessagesIds,
    handleRemoveMessage,
    handleAnimationEnd,
  };
}
