const db = require('../db');

module.exports = {
  getStyles: async function(product_id) {
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
      console.log('err in fetching styles', e)
    }

  }
}