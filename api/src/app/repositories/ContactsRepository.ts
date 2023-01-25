const { uuid } = require('uuidv4');

let contacts = [
  {
    id: uuid(),
    name: 'Mateus',
    email: 'mateus@gtes.com',
    category_id: uuid(),
    phone: '21998217463',
  },
];

interface createProps {
  name: string;
  email: string;
  phone: string;
  category_id: string;
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

  create({ name, email, phone, category_id }: createProps) {
    return new Promise((resolve) => {
      const newContact = {
        id: uuid(),
        name,
        email,
        phone,
        category_id,
      };

      contacts.push(newContact);

      resolve(newContact);
    });
  }

  update(id: string, { name, email, phone, category_id }: createProps) {
    return new Promise((resolve) => {
      const updateContact = {
        id: uuid(),
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (contact.id === id ? updateContact : contact));

      resolve(updateContact);
    });
  }
}

module.exports = new ContactsRepository();
