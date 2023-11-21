import { useCallback, useEffect, useState } from 'react';
import { toastEventManager, toastProps } from '../../../utils/toast';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

interface Toast {
  id: number;
  type: 'default' | 'success' | 'danger';
  text: string;
  duration?: number;
}

export default function ToastContainer() {
  const [messages, setMessages] = useState<Toast[]>([]);
  const [pendingRemovalMessagesIds, setPendingRemovalMessagesIds] = useState<number[]>([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }: toastProps) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          type,
          text,
          duration,
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id: number) => {
    setPendingRemovalMessagesIds((prevState) => [...prevState, id]);
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemove={handleRemoveMessage}
          isLeaving={pendingRemovalMessagesIds.includes(message.id)}
        />
      ))}
    </Container>
  );
}
