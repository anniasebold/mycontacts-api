const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await CategoriesRepository.findAll(orderBy);
    return response.json(categories);
  }

  async store(request, response) {
    // Desestruturando o name do body
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Category Name is required' });
    }

    const categoryExists = await CategoriesRepository.findByName(name);

    if (categoryExists) {
      return response.status(400).json({ error: 'Category Name already exists' });
    }

    const category = await CategoriesRepository.create({ name });
    response.send(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return response.status(400).json({ error: 'Category not found' });
    }

    const categoryNameExists = await CategoriesRepository.findByName(name);

    if (categoryNameExists) {
      return response.status(400).json({ error: 'Category Name already exists' });
    }

    const category = await CategoriesRepository.update(id, { name });
    response.send(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return response.status(400).json({ error: 'Category not found' });
    }

    const category = await CategoriesRepository.delete(id);
    response.send(category);
  }
}

module.exports = new CategoryController();
