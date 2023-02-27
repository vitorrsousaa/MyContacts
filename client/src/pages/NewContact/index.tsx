import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ToastContainer from '../../components/Toast/ToastContainer';
import ContactsService, { ContactData } from '../../services/ContactsService';
import toast from '../../utils/format';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  categoryId: string;
}

const NewContact = () => {
  async function handleSubmit(formData: FormData) {
    try {
      const contact = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        category_id: formData.categoryId,
      };

      await ContactsService.createContact(contact);

      toast({
        type: 'success',
        text: 'Contato cadastrado',
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
      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </>
  );
};

export default NewContact;
