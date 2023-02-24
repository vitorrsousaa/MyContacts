import delay from '../../utils/delay';
import APIError from '../../errors/APIError';
import { ContactData } from '../ContactsService';

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

  post(path: string, body: ContactData) {
    return this.makeRequest(path, {
      method: 'POST',
      body,
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
