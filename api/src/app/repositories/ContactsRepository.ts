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
}

module.exports = new ContactsRepository();
