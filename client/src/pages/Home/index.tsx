import {
  Card,
  Container,
  EmptyListContainer,
  ErrorContainer,
  Header,
  InputSearchContainer,
  ListHeader,
  SearchNotFoundContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import trash from '../../assets/images/icons/trash.svg';
import edit from '../../assets/images/icons/edit.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import Loader from '../../components/Loader';
import { BaseSyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
import ContactsService from '../../services/ContactsService';

import Button from '../../components/Button';
import toast from '../../utils/toast';

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
  const [hasError, setHasError] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState<Contact>({} as Contact);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      ),
    [contacts, searchTerm]
  );
  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);
      // const contactsList = [];

      setContacts(contactsList);
      setHasError(false);

      // Poderiamos utilizar esta forma para tratar o erro, mas isto implacaria em repetição que código, pois devemos exibir o erro caso caia no bloco catch tbm
      // if(contactsList) {
      //   setContacts(contactsList);
      // } else {
      //   console.log('Erro na API')
      // }
    } catch (error) {
      // if(error instanceof APIError){
      //mostra uma mensagem para o usuário
      // } else {
      // mostra uma mensagem para o usuário
      // Envia o erro para o serviço de log
      // Erro do javascript
      // }
      // console.log(error);

      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event: BaseSyntheticEvent) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  function handleDeleteContact(contact: Contact) {
    setIsModalDeleteVisible(true);
    setContactBeingDeleted(contact);
  }

  function handleOnCloseModal() {
    setIsModalDeleteVisible(false);
    setContactBeingDeleted(null);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await ContactsService.delete(contactBeingDeleted.id);

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso',
      });
      handleOnCloseModal();
      setContacts((prevState) =>
        prevState.filter((contact) => contact.id !== contactBeingDeleted.id)
      );
    } catch {
      toast({
        type: 'danger',
        text: 'Tivemos um erro para deletar o contato',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <Modal
        danger
        isOpen={isModalDeleteVisible}
        title={`Você tem certeza que deseja deletar o contato '${contactBeingDeleted?.name}' ?`}
        onCancel={handleOnCloseModal}
        onConfirm={handleConfirmDeleteContact}
        isLoading={isLoadingDelete}
      />
      <Container>
        {contacts.length > 0 && (
          <InputSearchContainer>
            <input
              type="text"
              placeholder="Pesquisar contato"
              value={searchTerm}
              onChange={handleChangeSearchTerm}
            />
          </InputSearchContainer>
        )}

        <Header
          justifyContent={hasError ? 'flex-end' : contacts.length > 0 ? 'space-between' : 'center'}
        >
          {!hasError && contacts.length > 0 && (
            <strong>
              {filteredContacts.length} {filteredContacts.length === 1 ? 'contato' : 'contatos'}
            </strong>
          )}
          <Link to="/new">Novo contato</Link>
        </Header>

        {hasError && (
          <ErrorContainer>
            <img src={sad} alt="sad" />
            <div className="details">
              <strong>Ocorreu um erro ao obter os seus contatos!</strong>

              <Button type="button" onClick={handleTryAgain}>
                Tentar novamente
              </Button>
            </div>
          </ErrorContainer>
        )}

        {!hasError && (
          <>
            {contacts.length < 1 && !isLoading && (
              <EmptyListContainer>
                <img src={emptyBox} alt="empty-box" />
                <p>
                  Você ainda não tem nenhum contato cadastrado! Clice no botão{' '}
                  <strong>NovoContato</strong> à cima para cadastrar o seu primeiro contato!
                </p>
              </EmptyListContainer>
            )}

            {contacts.length > 0 && filteredContacts.length < 1 && (
              <SearchNotFoundContainer>
                <img src={magnifierQuestion} alt="MagnifierQuestion" />
                <span>
                  Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>.
                </span>
              </SearchNotFoundContainer>
            )}

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
                  <button type="button" onClick={() => handleDeleteContact(contact)}>
                    <img src={trash} alt="Trash" />
                  </button>
                </div>
              </Card>
            ))}
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
