import { ReactNode } from 'react';
import { Container } from './styles';

interface FormGroupProps {
  children: ReactNode;
  error?: string;
}

const FormGroup = ({ children, error }: FormGroupProps) => {
  return (
    <Container>
      {children}
      {error && <small>{error}</small>}
    </Container>
  );
};

export default FormGroup;
