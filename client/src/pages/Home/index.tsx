import { Card, Container, Header, InputSearchContainer, ListHeader } from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import trash from '../../assets/images/icons/trash.svg';
import edit from '../../assets/images/icons/edit.svg';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import Loader from '../../components/Loader';
import { BaseSyntheticEvent, useEffect, useMemo, useState } from 'react';
import delay from '../../utils/delay';

interface Contact {
  name: string;
  email: string;
  phone: string;
  category_id: string | null;
  category_name: string | null;
  id: string;
}

const Home = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      ),
    [contacts, searchTerm]
  );

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);

        const response = await fetch(`http://localhost:3000/contacts?orderBy=${orderBy}`);

        await delay(500);

        const json = await response.json();
        setContacts(json);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event: BaseSyntheticEvent) {
    setSearchTerm(event.target.value);
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      {/* <Modal danger /> */}
      <Container>
        <InputSearchContainer>
          <input
            type="text"
            placeholder="Pesquisar contato"
            value={searchTerm}
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>

        <Header>
          <strong>
            {filteredContacts.length} {filteredContacts.length === 1 ? 'contato' : 'contatos'}
          </strong>
          <Link to="/new">Novo contato</Link>
        </Header>

        {filteredContacts.length > 0 && (
          <ListHeader orderBy={orderBy}>
            <button type="button" onClick={handleToggleOrderBy}>
              <span>Nome</span>
              <img src={arrow} alt="Arrow" />
            </button>
          </ListHeader>
        )}

        {filteredContacts.map((contact) => (
          <Card key={contact.id}>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                {contact.category_name && <small>{contact.category_name}</small>}
              </div>
              <span>{contact.email}</span>
              <span>{contact.phone}</span>
            </div>

            <div className="actions">
              <Link to={`/edit/${contact.id}`}>
                <img src={edit} alt="Edit" />
              </Link>
              <button type="button">
                <img src={trash} alt="Trash" />
              </button>
            </div>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default Home;
