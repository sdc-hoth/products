const db = require('../db');

module.exports.getAllProducts =  async function(count = 5, page = 1) {
  const query = 'SELECT json_agg(p)\
                    FROM (\
                        SELECT *\
                        FROM products\
                        LIMIT $1\
                    ) p';
  try {
    const data = await db.query(query, [count * page]);
    return data.rows[0].json_agg;
  } catch (e) {
    console.log('err in fetching all products', e)
  }
}
