import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';
import PageHeader from '../../components/PageHeader';
import useIsMounted from '../../hooks/useIsMounted';
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
  const isMounted = useIsMounted();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id);

        // Primeira forma de encaminhar as refs
        if (isMounted()) {
          contactFormRef.current?.setFieldsValues(contactData);

          setIsLoading(false);
          setContactName(contactData.name);
        }
      } catch {
        if (isMounted()) {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado',
          });
        }
      }
    }

    loadContact();
  }, [id, isMounted, history]);

  async function handleSubmit(formData: FormData) {
    try {
      const contact = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        category_id: formData.categoryId,
      };

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
