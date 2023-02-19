import delay from '../../utils/delay';
import APIError from '../../errors/APIError';

class HttpClient {
  baseURL;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  async get(path: string) {
    await delay(500);

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
}

export default HttpClient;
