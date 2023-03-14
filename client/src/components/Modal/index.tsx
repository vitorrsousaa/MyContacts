import ReactDOM from 'react-dom';
import Button from '../Button';
import { Overlay, Container, Footer } from './styles';

interface ModalProps {
  danger?: boolean;
  containerId?: string;
  title: string;
  subtitle: string;
  onCancel: () => void;
  onDelete: () => void;
}

const Modal = ({
  danger = false,
  containerId = 'modal-root',
  title,
  subtitle,
  onCancel,
  onDelete,
}: ModalProps) => {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <Footer>
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancelar
          </button>
          <Button type="button" danger={danger} onClick={onDelete}>
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    container
  );
};

export default Modal;
