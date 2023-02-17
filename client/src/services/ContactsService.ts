import HttpClient from './utils/HttpClient';

class ContactsService {
  async listContacts(orderBy = 'asc') {
    return HttpClient.get(`/contacts/988fe130-6ac3-4266-a73b-34866ef17882/?orderBy=${orderBy}`);
  }
}

export default new ContactsService();
