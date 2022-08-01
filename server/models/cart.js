const db = require('../db');

module.exports = {
  getCart: async(userToken) => {
    const query = `select json_agg(c)
                  from (
                  select product_id as sku_id,
                        COUNT(cart.active)
                  from cart
                  where user_session = 1111
                  group by product_id,active
                  )c`;
    try {
      const data = await db.query(query, [userToken]);
      const res = data.rows[0].json_agg;
      if(!res) return [];
      return res;
    } catch (e) {
      console.log('err in getting cart in db', e)
    }

  },
  createCart: async(user_token, sku_id) => {
    const queryChangeId = "select setval( pg_get_serial_sequence('cart', 'id'), \
                  (select max(id) from cart)\
                  )";
    const queryAddCart = 'insert into cart (user_session, product_id, active) VALUES($1, $2, 1)';
    try {
      await db.query(queryChangeId);
      await db.query(queryAddCart, [user_token, sku_id])
    } catch (e) {
      console.log('err in creaing cart in db', e)
    }

  }
}