import delay from '../../utils/delay';
import APIError from '../../errors/APIError';
import { ContactData } from '../ContactsService';
import { domainContact, persistanceContact } from '../../types/Contact';

interface optionsProps {
  method: string;
  body?: any;
}

class HttpClient {
  baseURL;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  get(path: string) {
    return this.makeRequest(path, { method: 'GET' });
  }

  post(path: string, body: persistanceContact) {
    return this.makeRequest(path, {
      method: 'POST',
      body,
    });
  }

  put(path: string, body: unknown) {
    return this.makeRequest(path, {
      method: 'PUT',
      body,
    });
  }
  delete(path: string) {
    return this.makeRequest(path, {
      method: 'DELETE',
    });
  }

  async makeRequest(path: string, options: optionsProps) {
    await delay(1000);

    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
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
