import { Container } from './styles';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

interface ToastMessageProps {
  onRemove: (id: number) => void;
  message: {
    id: number;
    text: string;
    type?: 'danger' | 'success' | 'default';
  };
}

export default function ToastMessage({ message, onRemove }: ToastMessageProps) {
  const { text, type = 'default', id } = message;
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
