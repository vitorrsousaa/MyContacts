import delay from '../../utils/delay';
import APIError from '../../errors/APIError';
import { ContactData } from '../ContactsService';

class HttpClient {
  baseURL;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async get(path: string) {
    await delay(1000);

    const response = await fetch(`${this.baseURL}${path}`);

    let body = null;

    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    // return false;

    throw new APIError(response, body);
  }

  async post(path: string, body: ContactData) {
    await delay(1000);

    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });

    let responseBody = null;

    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    // return false;

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
