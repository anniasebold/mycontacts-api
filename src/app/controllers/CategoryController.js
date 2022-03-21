const ContactsRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await ContactsRepository.findAll(orderBy);
    return response.json(categories);
  }

  async store(request, response) {
    // Desestruturando o name do body
    const { name } = request.body;

    if (!name) {
      return response.json({ error: 'Category Name is required' });
    }

    const categoryExists = await ContactsRepository.findByName(name);

    if (categoryExists) {
      return response.json({ error: 'Category Name already exists' });
    }

    const category = await ContactsRepository.create({ name });
    response.send(category);
  }
}

module.exports = new CategoryController();
