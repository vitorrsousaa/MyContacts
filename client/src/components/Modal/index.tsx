import Button from '../Button';
import { Overlay, Container, Footer } from './styles';

interface ModalProps {
  danger?: boolean;
}

const Modal = ({ danger = false }: ModalProps) => {
  return (
    <Overlay>
      <Container danger={danger}>
        <h1>Título do modal</h1>
        <p>Desripão</p>
        <Footer>
          <button type="button" className="cancel-button">
            Cancelar
          </button>
          <Button type="button" danger={danger}>
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>
  );
};

export default Modal;
