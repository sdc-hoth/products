const db = require('../db');

module.exports = {
  getAllProducts: async (count = 5, page = 1) => {
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
      console.log('err in fetching all products in db', e)
    }
  },
  getProduct: async (product_id) => {
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
      return data.rows[0].row_to_json || {};
    } catch (e) {
      console.log('err in fetching specific product in db', e)
    }
  },
  getRelated: async (product_id) => {
    const query = 'select json_agg(r.related_product_id) from related r\
                   where r.current_product_id = $1';
    try {
      const data = await db.query(query, [product_id]);
      // if(data === null) return null;
      return data.rows[0].json_agg || [];
    } catch (e) {
      console.log('err in fetching styles in db', e)
    }
  },
  getStyles: async (product_id) => {


    const query = `select json_build_object(
                  'product_id', ${product_id},
                  'results',
                  (SELECT jsonb_agg(nested_results)
                  FROM (
                    SELECT
                    styles.id as style_id,
                    styles.name,
                    styles.original_price,
                    styles.sale_price,
                    styles.default_style as default,
                  (
                  select json_agg(p)
                    from (
                      select url, thumbnail_url
                      from photos
                      where photos.styleId = styles.id
                      ) p
                  ) AS photos,
                    (
                  SELECT json_object_agg(
                    skus.id,
                    json_build_object(
                      'quantity', skus.quantity,
                      'size', skus.size
                      )
                    )FROM skus where skus.styleId = styles.id
                    ) AS skus
                    FROM styles
                    WHERE styles.productId = $1
                  ) AS nested_results)
                )`
    try {
      const data = await db.query(query, [product_id])
      return data.rows[0].json_build_object;
    } catch (e) {
      console.log('err in fetching styles in db', e)
    }

  }
}
