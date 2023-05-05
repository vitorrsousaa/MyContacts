import { domainContact } from '../types/Contact';
import ContactMapper from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

export interface ContactData {
  name: string;
  email: string;
  phone: string;
  categoryd: string;
}

class ContactsService {
  private httpClient;
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3000');
  }

  async listContacts(orderBy = 'asc') {
    const contacts = await this.httpClient.get(`/contacts/?orderBy=${orderBy}`);

    // return contacts.map(ContactMapper.toDomain);

    return contacts;
  }

  getContactById(id: string) {
    return this.httpClient.get(`/contacts/${id}`);
  }

  createContact(contact: domainContact) {
    const data = ContactMapper.toPersistance(contact);
    return this.httpClient.post('/contacts', data);
  }

  updateContact(id: string, contact: domainContact) {
    const data = ContactMapper.toPersistance(contact);
    return this.httpClient.put(`/contacts/${id}`, { body: data });
  }

  delete(id: string) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
