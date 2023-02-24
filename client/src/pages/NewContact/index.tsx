import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactsService, { ContactData } from '../../services/ContactsService';

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

      const response = await ContactsService.createContact(contact);

      console.log(response);
    } catch {
      alert('Ocorreu um erro');
    }
  }
  return (
    <>
      <PageHeader title="Novo Contato" />
      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </>
  );
};

export default NewContact;
