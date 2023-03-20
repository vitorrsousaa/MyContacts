import { ButtonHTMLAttributes, ReactNode } from 'react';
import Spinner from '../Spinner';
import { ButtonStyled } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  disabled?: boolean;
  children: ReactNode;
  danger?: boolean;
}

export default function Button({ isLoading, disabled, children, ...props }: ButtonProps) {
  return (
    <ButtonStyled {...props} disabled={disabled || isLoading}>
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </ButtonStyled>
  );
}
