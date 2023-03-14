import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader';
import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';
import { ContactAPI } from '../../types/Contact';
import toast from '../../utils/toast';

interface ContactFormRef {
  setFieldsValues: (contact: ContactAPI) => void;
}

const EditContact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const contactFormRef = useRef<ContactFormRef>(null);

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id);

        // Primeira forma de encaminhar as refs
        contactFormRef.current?.setFieldsValues(contactData);

        setIsLoading(false);
      } catch {
        history.push('/');
        toast({
          type: 'danger',
          text: 'Contato não encontrado',
        });
      }
    }

    loadContact();
  }, [id]);

  function handleSubmit() {
    //
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title="Editar Mateus Silva" />
      <ContactForm buttonLabel="Salvar alterações" ref={contactFormRef} />
    </>
  );
};

export default EditContact;
