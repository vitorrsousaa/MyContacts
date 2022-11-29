import { Link } from 'react-router-dom';
import { Container } from './styles';
import arrow from '../../assets/images/icons/arrow.svg';

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <Container>
      <Link to="/">
        <img src={arrow} alt="Arrow" />
        <span>Voltar</span>
      </Link>
      <h1>{title}</h1>
    </Container>
  );
};

export default PageHeader;
