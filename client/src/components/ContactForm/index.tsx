import React, { BaseSyntheticEvent, useState } from 'react';
import isEmailValid from '../../utils/isEmailValid';
import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { Form, ButtonContainer } from './styles';

interface ErrorsProps {
  field: string;
  message: string;
}

interface ContactFormProps {
  buttonLabel: string;
}

const ContactForm = ({ buttonLabel }: ContactFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState<ErrorsProps[]>([]);

  function handleNameChange(event: BaseSyntheticEvent) {
    setName(event.target.value);

    if (!event.target.value) {
      setErrors((prevState) => [...prevState, { field: 'name', message: 'Nome é obrigatório.' }]);
    } else {
      setErrors((prevState) => prevState.filter((error) => error.field !== 'name'));
    }
  }

  function handleEmailChange(event: BaseSyntheticEvent) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      const errorAlreadyExists = errors.find((error) => error.field === 'email');

      if (errorAlreadyExists) {
        return;
      }

      setErrors((prevState) => [...prevState, { field: 'email', message: 'E-mail inválido' }]);
    } else {
      setErrors((prevState) => prevState.filter((error) => error.field !== 'email'));
    }
  }

  function getErrorMessageByFieldName(fieldName: string) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  function handleSubmit(event: React.SyntheticEvent) {
    console.log(event);
    event.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          placeholder="Nome"
          type="text"
          value={name}
          onChange={handleNameChange}
          error={!!getErrorMessageByFieldName('name')}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={handleEmailChange}
          error={!!getErrorMessageByFieldName('email')}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          type="text"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">Categoria</option>
          <option value="instagram">Instagram</option>
          <option value="discord">Discord</option>
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
};

export default ContactForm;
