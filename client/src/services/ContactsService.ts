import HttpClient from './utils/HttpClient';

export interface ContactData {
  name: string;
  email: string;
  phone: string;
  category_id: string;
}

class ContactsService {
  private httpClient;
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3000');
  }

  listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts/?orderBy=${orderBy}`);
  }

  getContactById(id: string) {
    return this.httpClient.get(`/contacts/${id}`);
  }

  createContact(contact: ContactData) {
    return this.httpClient.post('/contacts', contact);
  }

  updateContact(id: string, contact: ContactData) {
    return this.httpClient.put(`/contacts/${id}`, { body: contact });
  }

  delete(id: string) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
