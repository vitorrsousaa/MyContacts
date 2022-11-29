import { ReactNode } from 'react';
import Input from '../Input';
import { Container } from './styles';

interface FormGroupProps {
  children: ReactNode;
}

const FormGroup = ({ children }: FormGroupProps) => {
  return <Container>{children}</Container>;
};

export default FormGroup;
