import { Container } from './styles';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

interface ToastMessageProps {
  text: string;
  type?: 'danger' | 'success' | 'default';
}

export default function ToastMessage({ text, type = 'default' }: ToastMessageProps) {
  return (
    <Container type={type}>
      {type === 'danger' && <img src={xCircleIcon} alt="danger" />}
      {type === 'success' && <img src={checkCircleIcon} alt="success" />}
      <strong>{text}</strong>
    </Container>
  );
}
