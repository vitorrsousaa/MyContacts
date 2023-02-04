import delay from '../../utils/delay';

class HttpClient {
  async get(url: string) {
    const response = await fetch(url);

    await delay(500);

    return response.json();
  }
}

export default new HttpClient();
