const db = require('../db');

module.exports = {
  getRelated: async function(product_id) {
    const query = 'select json_agg(r.related_product_id) from related r\
                   where r.current_product_id = $1';
    try {
      const data = await db.query(query, [product_id]);
      // if(data === null) return null;
      return data.rows[0].json_agg;
    } catch (e) {
      console.log('err in fetching styles', e)
    }
  }
}