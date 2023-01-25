import { Request, Response } from 'express';

const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request: Request, response: Response) {
    // Listar todos os registros

    const contacts = await ContactsRepository.findAll();

    response.json(contacts);
  }

  async show(request: Request, response: Response) {
    // Obter um registro
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ message: 'User not found' });
    }

    return response.json(contact);
  }

  store(request: Request, response: Response) {
    // Criar novo registro
  }

  update(request: Request, response: Response) {
    // Editar um registro
  }

  async delete(request: Request, response: Response) {
    // Deletar um registro

    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ message: 'User not found' });
    }

    await ContactsRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new ContactController();
