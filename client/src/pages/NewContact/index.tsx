import { useRef } from 'react';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ToastContainer from '../../components/Toast/ToastContainer';
import ContactsService from '../../services/ContactsService';
import ContactMapper from '../../services/mappers/ContactMapper';
import toast from '../../utils/toast';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  categoryId: string;
}

interface ContactFormRef {
  resetFields: () => void;
}

const NewContact = () => {
  const contactFormRef = useRef<ContactFormRef>(null);
  async function handleSubmit(contact: FormData) {
    try {
      await ContactsService.createContact(contact);
      contactFormRef.current?.resetFields();

      toast({
        type: 'success',
        text: 'Contato cadastrado',
        duration: 8000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato',
      });
    }
  }

  return (
    <>
      <ToastContainer />
      <PageHeader title="Novo Contato" />
      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} ref={contactFormRef} />
    </>
  );
};

export default NewContact;
