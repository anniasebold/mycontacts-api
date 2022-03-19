const db = require('../../database');

class ContactsRepository {
  async findAll(orderBy = 'ASC') {
    /*
      Colocando uma condição para não interpolar direto o valor na Query
      então eu vou receber, tratar a condição e só depois colocar na variável

      Se não for enviado nada nos queryParams então o valor default vai ser 'ASC'
    */
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM contacts ORDER BY name ${direction}`);
    return rows;
  }

  async findById(id) {
    // De novo utilizando o blind
    /* Desestruturei o array que é retornado para trazer somente a primeira posição */
    // O PostgreSQL sempre vai mandar um array mesmo que só tenha um registro nele
    const [row] = await db.query('SELECT * FROM contacts WHERE id = $1', [id]);
    return row;
  }

  async findByEmail(email) {
    /* Nessa query se torna necessário pegar só o primeiro registro
       pois se você pegar o array a condição de email único do controller
       vai sempre achar alguma coisa e vai travar o POST de contatos.
    */
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
    return row;
  }

  async delete(id) {
    const [row] = await db.query('DELETE FROM contacts WHERE id = $1', [id]);
    return row;
  }

  async create({
    name, email, phone, category_id,
  }) {
    /* Quando eu recebo a query e uso os binds do PostgreSQL
       para adicionar a query e os valores separadamente
    */
    const [row] = await db.query(`
    INSERT INTO contacts(name, email, phone, category_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [name, email, phone, category_id]);

    return row;
    /* Não é necessário retornar uma Promise explicitamente,
       porque a função async já retorna uma Promise.
    */
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
    UPDATE contacts set name = $2,
    email = $3,
    phone = $4,
    category_id = $5
    WHERE id = $1`, [id, name, email, phone, category_id]);
    return row;
  }
}

module.exports = new ContactsRepository();
