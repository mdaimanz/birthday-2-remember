const { pool } = require("./dbConfig");



module.exports ={
    getAllProduct (req, res)  {
        pool.query('SELECT * FROM product',(error, results) => {
            if (error) {
              res.send({error:error})
            }
            res.status(200).json(results.rows)
          })
    },

    getItemCategory (req, res)  {
        pool.query('SELECT DISTINCT product_category FROM product',(error, results) => {
            if (error) {
              res.send({error:error})
            }
            res.status(200).json(results.rows)
          })
    },

    getProduct (req, res)  {
      pool.query('SELECT * FROM product WHERE product_id = $1', [req.params.product_id],(error, results) => {
          if (error) {
            res.send({error:error})
          }
          res.status(200).json(results.rows)
      })
    },
    getReview (req, res)  {
      pool.query('SELECT * FROM review WHERE product_id = $1', [req.params.product_id],(error, results) => {
          if (error) {
            res.send({error:error})
          }
          res.status(200).json(results.rows)
      })
    },

    async addReview (req, res){
      let {product_id, user_review, product_rating} = req.body;
      if(!product_id && !user_review && !product_rating){
        res.status(403).send({error: "Please fill all fields."});
      }
      try{
          pool.query('INSERT INTO review (product_id, user_id, user_review, product_rating) VALUES ($1, $2, $3, $4)',
          [product_id, req.params.user_id, user_review, product_rating], (error, results) => {
              if(error){
                  res.status(403).send({error: error})
              }else{
                  res.status(200).send({
                    message: "New review has been added"
                  })
                }
          })
      }catch(error){
          res.status(403).send({error: error})
      }
  },
  async updateStatusToRated (req, res){
    let status = 'Rated'
    pool.query('UPDATE orders SET status = $1 WHERE order_id = $2',
      [status, req.params.order_id],
      (err, results) => {
        if(err){
          res.status(403).send({error: err})
        }else{
          res.status(200).send({
            message: "Status has been updated",
          })
        }
      })
  },

    async addProduct (req, res){
      let {product_name, product_price, product_desc, product_category, image_path} = req.body;
      if(!product_name && !product_price && !product_desc && !product_category && !image_path){
        res.status(403).send({error: "Please fill all fields."});
      }
      try{
          pool.query('INSERT INTO product (product_name, product_price, product_desc, product_rating, product_category, image_path) VALUES ($1, $2, $3, $4, $5, $6) RETURNING product_id',
          [product_name, product_price, product_desc, "0", product_category, image_path], (error, results) => {
              if(error){
                  res.status(403).send({error: error})
              }else{
                  res.status(200).send({
                    product_id: results.rows.product_id,
                    message: "New product has been added"
                  })
                }
          })
      }catch(error){
          res.status(403).send({error: error})
      }
  },

  async deleteProduct(req,res){
      try{
          pool.query('DELETE FROM important_date WHERE remind_id = $1 and cust_id = $2',
          [req.params.remind_id, req.params.user_id], 
          (error, results) => {
              if(error){
                  res.status(403).send({error: error})
              }else{
                  res.status(200).send({
                      message: "Reminder has been deleted",
                    })
              }
          }); 
      }catch(error){
          res.status(403).send({error: error})
      }
  },

  async addToCart (req, res){
    let {quantity} = req.body;
    let {product_price , totalPrice} = 0;
    
    if(!quantity){
      res.status(403).send({error: "Please fill all fields."});
    }
    
    try{

      //check if chosen product ady exist in the cart
      pool.query('SELECT * FROM cart WHERE product_id = $1', [req.params.product_id],(error, results) => {
        //handle if exists
        if(results.rows[0]){
          // res.status(200).send({
          //   message: "Product ady existed"
          // })
          pool.query('SELECT product_price FROM product WHERE product_id = $1', [req.params.product_id],(error, results) => {
            if (error) {
              res.send({error:error})
            }
            product_price = results.rows[0].product_price
            //calculate total price
            totalPrice = quantity*product_price
  
            pool.query('UPDATE cart SET quantity = $1, total_price = $2 WHERE product_id = $3 AND user_id = $4',
            [quantity, totalPrice, req.params.product_id, req.params.user_id],
            (err, results) => {
              if(err){
                res.status(403).send({error: err})
              }else{
                res.status(200).send({
                  message: "Changes has been saved successfully.",
                })
              }
            }
            );
  
          })


        }else{
          
          //query for specific product price
        pool.query('SELECT product_price FROM product WHERE product_id = $1', [req.params.product_id],(error, results) => {
          if (error) {
            res.send({error:error})
          }
          product_price = results.rows[0].product_price
          //calculate total price
          totalPrice = quantity*product_price

          pool.query('INSERT INTO cart (product_id, user_id, product_price, quantity, total_price) VALUES ($1, $2, $3, $4, $5)',
          [req.params.product_id, req.params.user_id, product_price, quantity, totalPrice], (error, results) => {
              if(error){
                  res.status(403).send({error: error})
              }else{
                  res.status(200).send({
                    message: "Product has been added into the cart"
                  })
              }
          })
        })    
        }
      })

         
    }catch(error){
        res.status(403).send({error: error})
    }
  },

  async deleteCartItem(req,res){
    try{
        pool.query('DELETE FROM cart WHERE product_id = $1 and user_id = $2',
        [req.params.product_id, req.params.user_id], 
        (error, results) => {
            if(error){
                res.status(403).send({error: error})
            }else{
                res.status(200).send({
                    message: "Item has been removed from the cart",
                  })
            }
        }); 
    }catch(error){
        res.status(403).send({error: error})
    }
  },

  getUserCart (req, res)  {
    pool.query('SELECT product.product_id, product.product_price, image_path, product_name, product_category, quantity, total_price FROM product INNER JOIN cart ON (SELECT CAST(product.product_id as VarChar))= cart.product_id WHERE user_id = $1', [req.params.user_id],(error, results) => {
        if (error) {
          res.send({error:error})
        }
        res.status(200).json(results.rows)
    })
  },

  async editProductQuantity (req, res){
    let {quantity} = req.body;
    
    if (!quantity){
      res.status(403).send({error: "Please fill out all the fields required."})
    }else{

      try{
        pool.query('SELECT product_price FROM product WHERE product_id = $1', [req.params.product_id],(error, results) => {
          if (error) {
            res.send({error:error})
          }
          product_price = results.rows[0].product_price
          //calculate total price
          totalPrice = quantity*product_price

          pool.query('UPDATE cart SET quantity = $1, total_price = $2 WHERE product_id = $3 AND user_id = $4',
          [quantity, totalPrice, req.params.product_id, req.params.user_id],
          (err, results) => {
            if(err){
              res.status(403).send({error: err})
            }else{
              res.status(200).send({
                message: "Changes has been saved successfully.",
              })
            }
          }
          );

        })
      }catch(err){

      }

      
    }
  },

  getUserRecommendation (req, res)  {
    pool.query('SELECT recommended FROM recommendation WHERE user_id = $1', [req.params.user_id],(error, results) => {
     
        if (error) {
          res.send({error:error})
        }else{
          if(results.row!=[]){
            pool.query('SELECT * FROM product WHERE product_id = $1', [results.rows[0].recommended],(error, results) => {
              if(error){
                res.send({error:error})
              }
              console.log(results.rows)
              res.status(200).json(results.rows)
            })
          }
          

          
          
        }
        
    })
  },
}