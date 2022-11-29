import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { Form, ButtonContainer } from './styles';

interface ContactFormProps {
  buttonLabel: string;
}

const ContactForm = ({ buttonLabel }: ContactFormProps) => {
  return (
    <Form>
      <FormGroup>
        <Input placeholder="Nome" type="text" />
      </FormGroup>
      <FormGroup>
        <Input placeholder="E-mail" type="email" />
      </FormGroup>
      <FormGroup>
        <Input placeholder="Telefone" type="text" />
      </FormGroup>

      <FormGroup>
        <Select>
          <option value="Instagram">Instagram</option>
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
};

export default ContactForm;
