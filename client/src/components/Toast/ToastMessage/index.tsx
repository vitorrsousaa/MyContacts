import { Container } from './styles';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import { useEffect } from 'react';

interface ToastMessageProps {
  onRemove: (id: number) => void;
  message: {
    id: number;
    text: string;
    type?: 'danger' | 'success' | 'default';
    duration?: number;
  };
}

export default function ToastMessage({ message, onRemove }: ToastMessageProps) {
  const { text, type = 'default', id, duration } = message;

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      onRemove(message.id);
    }, duration || 7000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [onRemove, message, duration]);

  function handleRemoveToast() {
    onRemove(id);
  }
  return (
    <Container type={type} onClick={handleRemoveToast}>
      {type === 'danger' && <img src={xCircleIcon} alt="danger" />}
      {type === 'success' && <img src={checkCircleIcon} alt="success" />}
      <strong>{text}</strong>
    </Container>
  );
}
