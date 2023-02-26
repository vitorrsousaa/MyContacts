import styled from 'styled-components';

export default styled.select`
  width: 100%;
  background: #fff;
  border: solid 2px #fff;
  border-radius: 4px;
  border: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  height: 52px;

  outline: none;
  appearance: none;

  padding: 0 16px;
  font-size: 16px;

  transition: border-color 0.2s ease-in;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray.lighter};
    border-color: ${({ theme }) => theme.colors.gray.light};
    opacity: 1;
  }
`;
