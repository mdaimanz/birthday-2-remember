const { pool } = require("./dbConfig");
const stripe  = require('stripe')('sk_test_51K3V16JInS7TPGr6CnHyeZwD0BxN0yTT3KDwHL7bUX8TRR3KW0CIpOTyYXaQo3AgXEBzitETWogEWtzCeycWY79000WnR8Qn95');



module.exports = {
    async createPaymentIntent (req, res) {
        pool.query('SELECT product.product_id, product.product_price, image_path, product_name, product_category, quantity, total_price, applied_promo FROM product INNER JOIN cart ON (SELECT CAST(product.product_id as VarChar))= cart.product_id WHERE user_id = $1', [req.params.user_id], async(error, results) => {
            let cart = []
            try{
                if (error) {
                    throw error;
                  }
                  
                  cart = results.rows
                  let totalAmount = 0
                  //calculating total amount after retrieving all product price from current user cart
                  cart.forEach(calculateTotalAmount)
                  function calculateTotalAmount(item){
                      
                      if(item.applied_promo===null){
                        totalAmount+=parseFloat(item.total_price)
                      }else{
                        totalAmount+=parseFloat(item.total_price*item.applied_promo)
                      }
                      
                  }
                console.log("totalAmount",totalAmount*100)
                //create paymentIntent
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: totalAmount*100,
                    currency: "myr",
                });
                res.status(200).send({
                    secret: paymentIntent.client_secret,
                });  
            }catch(error){
                res.status(500).send({error: error})
            }
        })
    },
    async addToOrder (req, res) {
        
        pool.query('SELECT product.product_id, product.product_price, user_id, product_name, product_category, quantity, total_price FROM product INNER JOIN cart ON (SELECT CAST(product.product_id as VarChar))= cart.product_id WHERE user_id = $1', [req.params.user_id], (error, results) => {
            let cart = []
            if(error){
                console.log(error)
            }
            //we only need product_id, user_id, quantity
            //calculate today's date
            const date = new Date()
            let dd = date.getDate()
            let mm = date.getMonth()+1
            let yyyy = date.getFullYear()
            let today = yyyy+'-'+mm+'-'+dd
            let status = "Order submitted"

            cart = results.rows
            for (let i=0; i< cart.length; i++){
                 pool.query('INSERT INTO orders (user_id, product_id, quantity, status, date_created) VALUES ($1, $2, $3, $4, $5)',
                 [cart[i].user_id, cart[i].product_id, cart[i].quantity, status, today], async (error, results) => {
                     if(error){
                         console.log(error)
                     }
                    // console.log("User ID: ",cart[i].user_id)
                    // console.log("Product ID: ",cart[i].product_id)
                    // console.log("Quantity: ",cart[i].quantity)
                    
                 })
            }
            res.status(200).send({message: "Order submitted"})
        });

        
    },

    async deleteFromCart (req, res) {
        try{
            pool.query('DELETE FROM cart WHERE user_id = $1', [req.params.user_id], (error, results) => {
                if(error){
                    res.status(403).send({error: error})
                }else{
                    res.status(200).send({
                        message: "Item has been deleted from the cart",
                    })
                }
            }); 
        }catch(error){
            res.status(403).send({error: error})
        }
    },

    async savePaymentRecord(req, res){
        try{
        let {name, email, address} = req.body
        
        
        pool.query('SELECT product.product_id, product.product_price, user_id, product_name, product_category, quantity, total_price FROM product INNER JOIN cart ON (SELECT CAST(product.product_id as VarChar))= cart.product_id WHERE user_id = $1', [req.params.user_id], (error, results) => {
            let product_list=[]
            let quantity_list=[]
            let price_per_item=[]
            let cart = results.rows
            let addr = address.line1+','+address.city+','+address.postal_code+','+address.state
            
            let price_total = 0
                  //calculating total amount after retrieving all product price from current user cart
                  cart.forEach(calculateTotalAmount)
                  function calculateTotalAmount(item){
                    price_total+=parseFloat(item.total_price)
            }

            for(let i=0; i<cart.length; i++){
                
                product_list[i]=cart[i].product_id
                quantity_list[i]=cart[i].quantity
                price_per_item[i]=cart[i].product_price

                // console.log("product_id",cart[i].product_id)
                // console.log("quantity",cart[i].quantity)
                // console.log("price_per_item",cart[i].product_price)
            }
            console.log("email: ", email)
            console.log("address: ", addr)
            console.log("product_list: ", product_list)
            console.log("quantity: ", quantity_list)
            console.log("price_per_item: ", price_per_item)
            console.log("price_total: ", price_total)
            console.log("user_id: ", req.params.user_id)

            pool.query('INSERT INTO payment (email, address, product_list, quantity_list, price_per_item, price_total, user_id, user_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                 [email, addr, product_list, quantity_list, price_per_item, price_total, req.params.user_id, name], async (error, results) => {
                if(error){
                    throw error;
                }
                })
        })
        
            res.status(200).send({
                message: "Payment recorded",
            })

        }catch(error){
            res.status(403).send({error: error})
        }
    },
    async applyPromotionCode (req, res){
        let { code } = req.body
        console.log(req.body)
        try{
            if(code==null){
                throw error="Code is empty"
            }
            pool.query('SELECT promo_rate FROM promotion WHERE CURRENT_DATE BETWEEN start_date and end_date and promo_code = $1', [code], (error, results) => {
                
                // console.log(results)
                if(results.rowCount==0){
                    res.status(403).send({error: "Invalid code"})
                }else{
                    pool.query('UPDATE cart SET applied_promo=$1 WHERE user_id = $2',
                    [results.rows[0].promo_rate, req.params.user_id],
                (   err, results) => {
                    if(err){
                        throw error = err
                    }
                    res.status(200).send({
                        message: "Promotion code has been applied",
                    })
                })
                }
                
            })
        }catch(error){
            res.status(403).send({error: error})
        }
        
    }
}
