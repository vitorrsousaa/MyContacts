import HttpClient from './utils/HttpClient';

class ContactsService {
  async listContacts(orderBy = 'asc') {
    return HttpClient.get(`http://localhost:3000/contacts?orderBy=${orderBy}`);
  }
}

export default new ContactsService();
