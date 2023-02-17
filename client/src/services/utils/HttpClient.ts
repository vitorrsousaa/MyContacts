import delay from '../../utils/delay';

class HttpClient {
  async get(path: string) {
    await delay(500);

    const response = await fetch(`http://localhost:3000${path}`);

    let body = null;

    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      body = await response.json();
    }

    console.log(response);

    if (response.ok) {
      return body;
    }

    // return false;

    throw new Error(body?.error || `${response.status} - ${response.statusText}`);
  }
}

export default new HttpClient();
