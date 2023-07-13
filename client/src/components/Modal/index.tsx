import ReactDOM from 'react-dom';
import Button from '../Button';
import { Overlay, Container, Footer } from './styles';
import { useEffect, useState } from 'react';

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
  const [shouldRender, setShouldRender] = useState(isOpen);
  let container = document.getElementById(containerId);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }

    let timeoutId: number;

    if (!isOpen) {
      timeoutId = setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isOpen]);

  if (!shouldRender) {
    return null;
  }

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(
    <Overlay isLeaving={!isOpen}>
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
