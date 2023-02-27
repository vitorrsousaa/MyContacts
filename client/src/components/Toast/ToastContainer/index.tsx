import { useEffect, useState } from 'react';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

interface Toast {
  id: number;
  type: 'default' | 'success' | 'danger';
  text: string;
}

export default function ToastContainer() {
  const [messages, setMessages] = useState<Toast[]>([
    { id: Math.random(), type: 'default', text: 'Default toast' },
    { id: Math.random(), type: 'danger', text: 'Error toast' },
    { id: Math.random(), type: 'success', text: 'Success toast' },
  ]);

  useEffect(() => {
    function handleAddToast(event) {
      (event: Event) => {
        const { type, text } = event.detail;

        setMessages((prevState) => [
          ...prevState,
          {
            id: Math.random(),
            type,
            text,
          },
        ]);
      };
    }

    document.addEventListener('addtoast', handleAddToast);

    return () => {
      document.removeEventListener('addtoast', handleAddToast);
    };
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage key={message.id} type={message.type} text={message.text} />
      ))}
    </Container>
  );
}
