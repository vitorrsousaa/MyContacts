export default class APIError extends Error {
  response;

  constructor(response: Response, body: any) {
    //super();  Error.constructor
    super();

    this.message = body?.error || `${response.status} - ${response.statusText}`;

    this.name = 'APIError';
    this.response = response;
  }
}
