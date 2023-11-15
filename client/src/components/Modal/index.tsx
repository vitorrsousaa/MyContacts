import ReactDOM from 'react-dom';
import Button from '../Button';
import { Overlay, Container, Footer } from './styles';
import useAnimatedUnmounted from '../../hooks/useAnimatedUnmounted';

interface ModalProps {
  danger?: boolean;
  containerId?: string;
  isOpen: boolean;
  isLoading: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const Modal = ({
  danger = false,
  containerId = 'modal-root',
  isOpen,
  isLoading,
  onCancel,
  onConfirm,
  title,
}: ModalProps) => {
  let container = document.getElementById(containerId);

  const { shouldRender, animatedRef } = useAnimatedUnmounted(isOpen);

  if (!shouldRender) {
    return null;
  }

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(
    <Overlay isLeaving={!isOpen} ref={animatedRef}>
      <Container danger={danger} isLeaving={!isOpen}>
        <h1>{title}</h1>
        <p>Essa ação não pode ser desfeita!</p>
        <Footer>
          <button type="button" className="cancel-button" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </button>
          <Button type="button" danger={danger} onClick={onConfirm}>
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    container
  );
};

export default Modal;
