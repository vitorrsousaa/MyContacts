import { useEffect } from 'react';
import { toastEventManager, toastProps } from '../../../utils/toast';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';
import useAnimatedList from '../../../hooks/useAnimatedList';

export default function ToastContainer() {
  const { handleRemoveMessage, setMessages, renderList } = useAnimatedList();

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
  }, [setMessages]);

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemove={handleRemoveMessage}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
        />
      ))}
    </Container>
  );
}
