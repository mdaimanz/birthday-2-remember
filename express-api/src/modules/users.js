const { pool } = require("./dbConfig");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('./config')

function jwtSignUser (user) {
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: '7d'
  })
}


module.exports ={
  getUsers (req, res) {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
          res.send({error:error})
        }
        res.status(200).json(results.rows)
      })
  
  },
    getName (req, res) {
      
      pool.query('SELECT name FROM users WHERE id = $1',[req.params.userID], (error, results) => {
          if (error) {
            res.send({error:error})
          }
          res.status(200).json(results.rows)
        })

    },
    getUserInfo (req, res) {
      
      pool.query('SELECT * FROM users WHERE id = $1',[req.params.user_id], (error, results) => {
          if (error) {
            res.send({error:error})
          }
          res.status(200).json(results.rows)
        })

    },

    async register (req, res) {
      let { name, email, phone_num, password, password_confirm } = req.body;

      
      
      //if passed all if statement above, proceed.
      
      try{
        //filter input
        if (!name || !email || !phone_num || !password || !password_confirm) {
          throw error="Please fill all fields."
        }

        if (password.length < 6) {
          throw error="Password must be a least 6 characters long."
        }

        if (password != password_confirm) {
          throw error="Passwords confirmation do not match."
        }
        hashedPassword = await bcrypt.hash(password, 10);

        pool.query('SELECT * FROM users WHERE email = $1',[email], (error,results) => {
          //handle database error
          if (error) {
            res.status(403).send({error:error})
          }
          //handle if there is existing email in the database
          if(results.rows.length > 0){
            res.status(403).send({error: "The email is already registered."})
           
          }else{
            pool.query('INSERT INTO users (name, email, password, phone_num) VALUES ($1, $2, $3, $4) RETURNING id, password',[name, email, hashedPassword, phone_num], (error,results) =>{
              if (error) {
                res.status(403).send({error: error})
              }else{
                res.status(200).send({
                  message: "Registration is successful.",
                  email: email,
                  password: hashedPassword
                })
              }
            })
          }
        })
      }catch(err){
        res.status(403).send({error: err})
      }
      //end
    },

    async login (req, res) {
      let {email, password} = req.body;

      try{
        pool.query('SELECT * FROM users WHERE email = $1',[email] ,(error, results) => {
          if (error) {
            return res.status(403).send({error:error})
          }else{
            if(results.rows.length > 0){
              const user = results.rows[0]

              bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err){
                  return res.status(403).send({error: err})
                }
                if(isMatch) {
                  const userJson = JSON.stringify(user)
                  res.send({
                    user: user,
                    token: jwtSignUser(user)
                  })
                }else{
                  return res.status(403).send({error: 'Password is incorrect.'})
                }
              })
              
            }else{
              return res.status(403).send({
                error: 'The account associated with this email is not exist'
              })
            }
          }
        })

      }catch(err){
        res.status(403).send({
          error: 'There is an error when try to login'
        })
      }
      
   },
   async editProfile (req, res){
  
    let {name, phone_num} = req.body;

    if (!name || !phone_num){
      res.status(403).send({error: "Please fill out all the fields required."})
    }else{
      pool.query('UPDATE users SET name = $1, phone_num = $2 WHERE id = $3',
      [name, phone_num, req.params.user_id],
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
    }
  },

  async changePassword (req, res){
  
    let {oldPassword, newPassword} = req.body;
    
    if (!oldPassword || !newPassword){
      res.status(403).send({error: "Please fill out all the fields required."})
    }else{
      pool.query('SELECT * FROM users WHERE id = $1',[req.params.user_id] , (error, results) => {
        if (error) {
          return res.status(403).send({error:error})
        }else{
          if(results.rows.length > 0){
            const user = results.rows[0]

            bcrypt.compare(oldPassword, user.password, async (err, isMatch) => {
              if(err){
                return res.status(403).send({error: err})
              }
              if(isMatch) {
                let hashedPassword = await bcrypt.hash(newPassword, 10);
                pool.query('UPDATE users SET password = $1 WHERE id = $2',
                [hashedPassword, req.params.user_id],
                (err, results) => {})
                res.status(200).send({
                  message: "Password has changed successfully"
                })

              }else{
                return res.status(403).send({error: 'Password is incorrect.'})
              }
            })
            
          }else{
            return res.status(403).send({
              error: 'Database error'
            })
          }
        }
      })
    }
  },

}