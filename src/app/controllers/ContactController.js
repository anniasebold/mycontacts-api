const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    // Listar todos os registros
    const contacts = await ContactsRepository.findAll();
    response.json(contacts);
  }

  async show(request, response) {
    // Listar UM registro correspondente
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // No .status é necessário passar um body
      return response.status(404).json({ error: 'Contact not found' });
    }

    response.json(contact);
  }

  store() {
    // Criar novo registro
  }

  update() {
    // Editar um registro
  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    await ContactsRepository.delete(id);
    // No sendStatus não é necessário um body, somente o status
    // 204: No Content
    response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
