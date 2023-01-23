import { InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export default styled.input<InputProps>`
  width: 100%;
  background: #fff;
  border: solid 2px #fff;
  border-radius: 4px;
  /* border: none; */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  height: 52px;

  outline: none;
  appearance: none;

  padding: 0 16px;
  font-size: 16px;

  transition: border-color 0.2s ease-in;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  ${({ theme, error }) =>
    error &&
    css`
      color: ${theme.colors.danger.main};

      border-color: ${theme.colors.danger.main};

      &:focus {
        border-color: ${theme.colors.danger.main};
      }
    `}
`;
