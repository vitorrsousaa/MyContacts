import { Container } from './styles';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import { useEffect, useRef } from 'react';

interface ToastMessageProps {
  onRemove: (id: number) => void;
  message: {
    id: number;
    text: string;
    type?: 'danger' | 'success' | 'default';
    duration?: number;
  };
  isLeaving: boolean;
  animatedRef: unknown;
}

export default function ToastMessage({
  message,
  onRemove,
  isLeaving,
  animatedRef,
}: ToastMessageProps) {
  const { text, type = 'default', id, duration } = message;

  // const animatedRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   function handleAnimationEnd() {
  //     onAnimationEnd(message.id);
  //   }

  //   const elementRef = animatedRef.current;

  //   if (isLeaving) {
  //     elementRef?.addEventListener('animationend', handleAnimationEnd);
  //   }

  //   return () => {
  //     elementRef?.removeEventListener('animationend', handleAnimationEnd);
  //   };
  // }, [isLeaving, message.id, onAnimationEnd]);

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
    <Container type={type} onClick={handleRemoveToast} isLeaving={isLeaving} ref={animatedRef}>
      {type === 'danger' && <img src={xCircleIcon} alt="danger" />}
      {type === 'success' && <img src={checkCircleIcon} alt="success" />}
      <strong>{text}</strong>
    </Container>
  );
}
