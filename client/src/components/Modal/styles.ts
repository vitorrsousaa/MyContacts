import styled from 'styled-components';

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);

  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ContainerProps {
  danger: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 450px;
  background: #fff;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

  > h1 {
    font-size: 22px;
    font-weight: bold;
    color: ${({ theme, danger }) => (danger ? theme.colors.danger.main : theme.colors.gray.dark)};
    margin-bottom: 32px;
  }

  p {
    margin-top: 8px;
  }
`;

export const Footer = styled.div`
  margin-top: 32px;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  .cancel-button {
    background: transparent;
    border: none;
    margin-right: 24px;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray.light};
  }
`;
