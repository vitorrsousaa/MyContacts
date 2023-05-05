import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';
import PageHeader from '../../components/PageHeader';
import useIsMounted from '../../hooks/useIsMounted';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';
import ContactsService from '../../services/ContactsService';
import { ContactAPI } from '../../types/Contact';
import toast from '../../utils/toast';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  categoryId: string;
}

interface ContactFormRef {
  setFieldsValues: (contact: ContactAPI) => void;
}

const EditContact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const contactFormRef = useRef<ContactFormRef>(null);
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id);

        // Primeira forma de encaminhar as refs

        safeAsyncAction(() => {
          contactFormRef.current?.setFieldsValues(contactData);

          setIsLoading(false);
          setContactName(contactData.name);
        });
      } catch {
        safeAsyncAction(() => {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado',
          });
        });
      }
    }

    loadContact();
  }, [id, safeAsyncAction, history]);

  async function handleSubmit(contact: FormData) {
    try {
      const contactData = await ContactsService.updateContact(id, contact);

      setContactName(contactData.name);

      toast({
        type: 'success',
        text: 'Contato editado com sucesso',
        duration: 8000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato',
      });
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contactName}`} />
      <ContactForm buttonLabel="Salvar alterações" ref={contactFormRef} onSubmit={handleSubmit} />
    </>
  );
};

export default EditContact;
