import {
  Card,
  Container,
  Header,
  InputSearchContainer,
  ListContainer,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import trash from '../../assets/images/icons/trash.svg';
import edit from '../../assets/images/icons/edit.svg';

const Home = () => {
  return (
    <>
      <Container>
        <InputSearchContainer>
          <input type="text" placeholder="Pesquisar contato" />
        </InputSearchContainer>

        <Header>
          <strong>3 contatos</strong>
          <a href="">Novo contato</a>
        </Header>

        <ListContainer>
          <header>
            <button type="button">
              <span>Nome</span>
              <img src={arrow} alt="Arrow" />
            </button>
          </header>

          <Card>
            <div className="info">
              <div className="contact-name">
                <strong>Mateus Silva</strong>
                <small>instagram</small>
              </div>
              <span>mateus@devacademy.com.br</span>
              <span>(41) 99999-9999</span>
            </div>

            <div className="actions">
              <a href="">
                <img src={edit} alt="Edit" />
              </a>
              <button type="button">
                <img src={trash} alt="Trash" />
              </button>
            </div>
          </Card>
        </ListContainer>
      </Container>
    </>
  );
};

export default Home;
