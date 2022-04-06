const { pool } = require("./dbConfig");

module.exports = {
    async getOrder (req, res)  {
        pool.query('SELECT orders.order_id,orders.user_id, product.product_id, product.image_path, product.product_name, product.product_category, orders.quantity, orders.status, orders.date_created,orders.date_received from orders INNER JOIN product ON (SELECT CAST(product.product_id as VarChar))= orders.product_id WHERE orders.user_id = $1', 
        [req.params.user_id],(error, results) => {
            if (error) {
              res.send({error:error})
            }
            res.status(200).json(results.rows)
        })
    },

















    
}