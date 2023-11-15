import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    /* Estilos iniciais */
    opacity: 0;
  }

  to {
    /* Estilos finais da animação */
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    /* Estilos iniciais */
    opacity: 1;
  }

  to {
    /* Estilos finais da animação */
    opacity: 0;
  }
`;

export const Overlay = styled.div<{ isLeaving: boolean }>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(246, 245, 252, 0.8);

  display: flex;
  align-items: center;
  justify-content: center;

  animation: ${fadeIn} 0.3s;

  ${({ isLeaving }) =>
    isLeaving &&
    css`
      animation: ${fadeOut} 0.3s;
    `}
`;
