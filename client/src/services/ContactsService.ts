import HttpClient from './utils/HttpClient';

export interface ContactData {
  name: string;
  email: string;
  phone: string;
  category_id: string;
}

class ContactsService {
  httpClient;
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3000');
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts/?orderBy=${orderBy}`);
  }

  async createContact(contact: ContactData) {
    return this.httpClient.post('/contacts', contact);
  }
}

export default new ContactsService();
