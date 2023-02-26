import styled, { css } from 'styled-components';

interface ButtonProps {
  danger?: boolean;
}

export const ButtonStyled = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  padding: 0 16px;
  border: none;
  background: ${({ theme }) => theme.colors.primary.main};
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  color: #fff;
  border-radius: 4px;

  transition: background 0.2s ease-in;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    cursor: default;
    background: #ccc;
  }

  ${({ theme, danger }) =>
    danger &&
    css`
      background: ${theme.colors.danger.main};

      &:hover {
        background: ${theme.colors.danger.light};
      }

      &:active {
        background: ${theme.colors.danger.dark};
      }
    `}
`;
