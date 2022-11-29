import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

const NewContact = () => {
  return (
    <>
      <PageHeader title="Novo Contato" />
      <ContactForm buttonLabel="Cadastrar" />
    </>
  );
};

export default NewContact;
