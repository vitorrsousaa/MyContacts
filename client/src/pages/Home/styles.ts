import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
`;

export const InputSearchContainer = styled.div`
  width: 100%;

  input {
    width: 100%;
    border-radius: 25px;
    background: #fff;
    border: none;
    height: 50px;
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.04));

    outline: none;
    padding: 0 16px;

    &::placeholder {
      color: #bcbcbc;
    }
  }
`;

interface HeaderProps {
  justifyContent: string;
}

export const Header = styled.header<HeaderProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  margin-top: 32px;

  border-bottom: 2px solid ${({ theme }) => theme.colors.gray.lighter};
  padding-bottom: 16px;

  strong {
    font-size: 24px;
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    font-weight: bold;
    padding: 8px 16px;
    border-radius: 4px;
    border: solid 2px ${({ theme }) => theme.colors.primary.main};
    transition: all 0.2s ease-in;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: #fff;
    }
  }
`;

interface ListHeaderProps {
  orderBy: string;
}

export const ListHeader = styled.header<ListHeaderProps>`
  margin-top: 24px;
  margin-bottom: 8px;

  button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;

    span {
      margin-right: 8px;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
    }

    img {
      transform: ${({ orderBy }) => (orderBy === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)')};
      transition: transform 0.2s ease-in;
    }
  }
`;

export const Card = styled.div`
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  background: #fff;

  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 16px;
  }

  .info {
    .contact-name {
      display: flex;
      align-items: center;

      small {
        background: ${({ theme }) => theme.colors.primary.lighter};
        color: ${({ theme }) => theme.colors.primary.main};
        font-weight: bold;
        text-transform: uppercase;
        border-radius: 4px;
        padding: 4px;
        margin-left: 8px;
      }
    }

    span {
      display: block;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray.light};
    }
  }

  .actions {
    display: flex;
    align-items: center;

    button {
      background: transparent;
      border: none;
      margin-left: 8px;
    }
  }
`;

export const ErrorContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;

  .details {
    margin-left: 24px;

    strong {
      font-size: 22px;
      color: ${({ theme }) => theme.colors.danger.main};
      display: block;
    }

    button {
      margin-top: 8px;
    }
  }
`;

export const EmptyListContainer = styled.div`
  margin-top: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.gray.light};

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }

  text-align: center;
`;

export const SearchNotFoundContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 16px;

  span {
    color: ${({ theme }) => theme.colors.gray.light};
    margin-left: 24px;

    text-align: left;
    word-break: break-word;
  }
`;
