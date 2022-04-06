const { pool } = require("./dbConfig");

module.exports ={
    async getAllReminder (req, res)  {
        let {id} = await req.params.user_id;
        pool.query('SELECT * FROM important_date WHERE cust_id = $1', [req.params.user_id],(error, results) => {
            if (error) {
              res.send({error:error})
            }
            res.status(200).json(results.rows)
          })
    },

    async getReminder (req, res)  {
      pool.query('SELECT * FROM important_date WHERE remind_id = $1', [req.params.remind_id],(error, results) => {
          if (error) {
            res.send({error:error})
          }
          res.status(200).json(results.rows)
      })
  },

    async addReminder (req, res){
      let {title, description, remind_time, remind_date} = req.body;
      const date = new Date()
      let dd = date.getDate()
      let mm = date.getMonth()+1
      let yyyy = date.getFullYear()
      let today = yyyy+'-'+mm+'-'+dd

      try{
          pool.query('INSERT INTO important_date (date, title, description, remind_time, remind_date, cust_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING remind_id',
          [today, title, description, remind_time, remind_date, req.params.user_id], (error, results) => {
              if(error){
                  res.status(403).send({error: error})
              }else{
                  res.status(200).send({
                    remind_id: results.rows.remind_id,
                    message: "New reminder has been added"
                  })
                }
          })
      }catch(error){
          res.status(403).send({error: error})
      }
  },

  async deleteReminder(req,res){
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

  async editReminder (req, res){
   
    let {title, description, remind_date, remind_time } = req.body;

    const date = new Date()
        let dd = date.getDate()
        let mm = date.getMonth()+1
        let yyyy = date.getFullYear()
        let today = yyyy+'-'+mm+'-'+dd
    
    if (!title || !description || !remind_date || !remind_time){
      res.status(403).send({error: "Please fill out all the fields required."})
    }else{
      pool.query('UPDATE important_date SET date = $1, title = $2, description = $3, remind_date = $4, remind_time = $5 WHERE cust_id = $6 AND remind_id = $7',
      [today, title, description, remind_date, remind_time, req.params.user_id, req.params.remind_id],
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

}