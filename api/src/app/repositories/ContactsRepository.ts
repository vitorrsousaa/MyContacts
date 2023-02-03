import { v4 as uuidv4 } from 'uuid';

let contacts = [
  {
    id: uuidv4(),
    name: 'Mateus',
    email: 'mateus@gtes.com',
    category_id: uuidv4(),
    category_name: 'Instagram',
    phone: '21998217463',
  },
  {
    id: uuidv4(),
    name: 'Vitor',
    email: 'v.sousa.cf@gmail.com',
    category_id: uuidv4(),
    category_name: 'Instagram',
    phone: '21998217463',
  },
  {
    id: uuidv4(),
    name: 'Gabriela Magalhaes',
    email: 'gabi2022@gmail.com',
    category_id: null,
    category_name: null,
    phone: '21998217463',
  },
];

interface createProps {
  name: string;
  email: string;
  phone: string;
  category_id: string;
  category_name: string;
}

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id: string) {
    return new Promise((resolve) => resolve(contacts.find((contact) => contact.id === id)));
  }

  delete(id: string) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);

      resolve('');
    });
  }

  findByEmail(email: string) {
    return new Promise((resolve) => resolve(contacts.find((contact) => contact.email === email)));
  }

  create({ name, email, phone, category_id, category_name }: createProps) {
    return new Promise((resolve) => {
      const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
        category_id,
        category_name,
      };

      contacts.push(newContact);

      resolve(newContact);
    });
  }

  update(id: string, { name, email, phone, category_id, category_name }: createProps) {
    return new Promise((resolve) => {
      const updateContact = {
        id: uuidv4(),
        name,
        email,
        phone,
        category_id,
        category_name,
      };

      contacts = contacts.map((contact) => (contact.id === id ? updateContact : contact));

      resolve(updateContact);
    });
  }
}

module.exports = new ContactsRepository();
