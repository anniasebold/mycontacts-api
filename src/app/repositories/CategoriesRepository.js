const db = require('../../database');

class CategoriesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM categories ORDER BY name ${direction}`);
    return rows;
  }

  async findByName(name) {
    const [row] = await db.query('SELECT * FROM categories WHERE name = $1', [name]);
    return row;
  }

  async create({ name }) {
    const [row] = await db.query(`
      INSERT INTO categories(name)
      VALUES($1)
    `, [name]);

    return row;
  }
}

module.exports = new CategoriesRepository();
