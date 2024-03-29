import React, {
  BaseSyntheticEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import useErrors from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';
import { FormData } from '../../pages/NewContact';
import formatPhone from '../../utils/formatPhone';
import isEmailValid from '../../utils/isEmailValid';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { Form, ButtonContainer } from './styles';
import Button from '../Button';
import { ContactAPI } from '../../types/Contact';

interface ContactFormProps {
  buttonLabel: string;
  onSubmit: (formData: FormData) => Promise<void>;
}

interface Category {
  id: string;
  name: string;
}

// eslint-disable-next-line react/display-name
const ContactForm = forwardRef(({ buttonLabel, onSubmit }: ContactFormProps, ref) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setError, removeError, getErrorMessageByFieldName, errors } = useErrors();

  const isFormValid = name && errors.length === 0;

  // Primeira forma de encaminhar as refs
  // useEffect(() => {
  //   const refObject = ref
  // refObject.current = {
  //   setFieldsValues: (contact:ContactAPI) => {
  //     setName(contact.name)
  //     setEmail(contact.email)
  //     setPhone(contact.phone)
  //     setCategoryId(contact.category_id)
  //   }
  // }
  // }, [])

  useImperativeHandle(
    ref,
    () => ({
      setFieldsValues: (contact: ContactAPI) => {
        setName(contact.name);
        setEmail(contact.email ?? '');
        setPhone(formatPhone(contact.phone));
        setCategoryId(contact.category_id ?? '');
      },
      resetFields: () => {
        setName('');
        setEmail('');
      },
    }),
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories(controller.signal);

        setCategories(categoriesList);
      } catch {
        //
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();

    () => {
      controller.abort();
    };
  }, []);

  function handleNameChange(event: BaseSyntheticEvent) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório.' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event: BaseSyntheticEvent) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event: BaseSyntheticEvent) {
    setPhone(formatPhone(event.target.value));
  }

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({ name, email, phone: phone.replace(/\D/g, ''), categoryId });

    setIsSubmitting(false);
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          placeholder="Nome"
          type="text"
          value={name}
          onChange={handleNameChange}
          error={!!getErrorMessageByFieldName('name')}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={handleEmailChange}
          error={!!getErrorMessageByFieldName('email')}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={15}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button type="submit" isLoading={isSubmitting} disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

export default ContactForm;
