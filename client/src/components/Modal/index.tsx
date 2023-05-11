import ReactDOM from 'react-dom';
import Button from '../Button';
import { Overlay, Container, Footer } from './styles';

interface ModalProps {
  danger?: boolean;
  containerId?: string;
  isOpen: boolean;
  isLoading: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const Modal = ({ danger = false, containerId = 'modal-root' }: ModalProps) => {
  let container = document.getElementById(containerId);

  if (!isOpen) {
    return null;
  }

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>{title}</h1>
        <p>Essa ação não pode ser desfeita!</p>
        <Footer>
          <button type="button" className="cancel-button" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </button>
          <Button type="button" danger={danger}>
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    container
  );
};

export default Modal;
