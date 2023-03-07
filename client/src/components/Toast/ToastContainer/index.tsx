import { useEffect, useState } from 'react';
import { toastEventManager, toastProps } from '../../../utils/toast';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

interface Toast {
  id: number;
  type: 'default' | 'success' | 'danger';
  text: string;
}

export default function ToastContainer() {
  const [messages, setMessages] = useState<Toast[]>([]);

  useEffect(() => {
    function handleAddToast({ type, text }: toastProps) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          type,
          text,
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  function handleRemoveMessage(id: number) {
    setMessages((prevState) => prevState.filter((message) => message.id !== id));
  }

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage key={message.id} message={message} onRemove={handleRemoveMessage} />
      ))}
    </Container>
  );
}
