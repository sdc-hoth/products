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
    const queryForStyle = 'select json_agg(s)\
                          from (\
                          select styles.id as style_id,\
                                name,\
                                original_price,\
                                sale_price,\
                                default_style as "default?"\
                          from styles\
                          where styles.productId = $1\
                          ) s';
    try {
      const style = await db.query(queryForStyle, [product_id]);
      const queryForPhotos = 'select json_agg(p)\
                            from (\
                            select url, thumbnail_url\
                            from photos\
                            where styleId = $1\
                            ) p';
      const queryForSkus = "SELECT json_object_agg(\
                          skus.id,\
                          json_build_object( \
                          'quantity', skus.quantity,\
                          'size', skus.size\
                          )\
                          )FROM skus where skus.styleId = $1";

      const styleData = style.rows[0].json_agg;
      if(!styleData) return {};
      for (let item of styleData) {
        const {style_id} = item;
        const photos = await db.query(queryForPhotos, [style_id]);
        const skus = await db.query(queryForSkus, [style_id]);
        const photoData = photos.rows[0].json_agg;
        const skusData = skus.rows[0].json_object_agg;
        item.photos = photoData;
        item.skus = skusData;
      }
      const fullData = {
        'product_id': product_id,
        results: styleData
      };
      return fullData;
    } catch (e) {
      console.log('err in fetching styles in db', e)
    }

  }
}
