import styled, { css, keyframes } from 'styled-components';

interface ContainerProps {
  type: 'danger' | 'success' | 'default';
}

const messageIn = keyframes`
from {
  opacity: 0;
  transform: translateY(100px);
}
to{
  opacity: 1;
  transform: translateY(0px);
}
`;

const containerVariants = {
  default: css`
    background: ${({ theme }) => theme.colors.primary.main};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger.main};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success.main};
  `,
};

export const Container = styled.div<ContainerProps>`
  padding: 16px 32px;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;

  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ type }) => containerVariants[type] || containerVariants.default}

  animation: ${messageIn} 0.5s;

  & + & {
    margin-top: 12px;
  }
  img {
    margin-right: 8px;
  }
`;
