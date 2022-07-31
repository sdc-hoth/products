const db = require('../db');

module.exports = {
  getProduct: async function(product_id) {
    const query = 'WITH\
                  features AS (\
                    SELECT feature, value\
                    FROM features \
                    where product_id = $1\
                  ),\
                  products AS (\
                    SELECT id, name, slogan, description, category, default_price,\
                           json_agg(features) as features\
                    FROM products p, features\
                    where p.id = $1\
                    GROUP BY p.id\
                  )\
                  SELECT row_to_json(products) FROM products;';
    try {
      const data = await db.query(query, [product_id]);
      return data.rows[0].row_to_json;
    } catch (e) {
      console.log('err in fetching specific product', e)
    }
  }
}

