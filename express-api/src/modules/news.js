const { pool } = require("./dbConfig");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('./config')


module.exports ={

    getNews (req, res){
        pool.query('SELECT * FROM news ORDER BY news_id DESC', (error, results) => {
            if (error) {
              res.send({error:error})
            }
            res.status(200).json(results.rows)
          })
    },

    async addNews (req, res){
        let { image_path, news_title, news_content} = req.body;

        
        const date = new Date()
        let dd = date.getDate()
        let mm = date.getMonth()+1
        let yyyy = date.getFullYear()
        let today = yyyy+'-'+mm+'-'+dd

        try{
            if(!image_path || !news_title || !news_content){
                throw error = "Please fill all fields"
            }
            pool.query('INSERT INTO news (image_path, news_title, post_date, news_content) VALUES ($1, $2, $3, $4) RETURNING news_id',[image_path, news_title, today, news_content], (error, results) => {
                if(error){
                    res.status(403).send({error: error})
                }else{
                    res.status(200).send({
                      message: "New news has been added"
                    })
                  }
            })
        }catch(error){
            res.status(403).send({error: error})
        }
    },

    async deleteNews(req,res){
        try{
            pool.query('DELETE FROM news WHERE news_id = $1',
            [req.params.news_id], 
            (error, results) => {
                if(error){
                    res.status(403).send({error: error})
                }else{
                    const deleted_news = results.rows[0]
                    const newsJson = JSON.stringify(deleted_news)
                    res.status(200).send({
                        message: "News has been deleted",
                        deleted_news: newsJson
                      })
                }
            }); 
        }catch(error){
            res.status(403).send({error: error})
        }
    },

    getNewsContent (req, res){
        pool.query('SELECT * FROM news WHERE news_id = $1',[req.params.news_id] ,(error, results) => {
            if (error) {
              res.send({error:error})
            }
            res.status(200).json(results.rows)
          })
    },

    async editNews (req, res){
        
        let {image_path, news_title, news_content} = req.body;

        const date = new Date()
            let dd = date.getDate()
            let mm = date.getMonth()+1
            let yyyy = date.getFullYear()
            let today = yyyy+'-'+mm+'-'+dd
        
        if (!image_path || !news_title || !news_content){
            res.status(403).send({error: "Please fill out all the fields required."})
        }else{
            console.log("UPDATE news SET image_path =" + image_path + ", news_title = "+news_title+", news_content ="+news_content+" WHERE news_id = "+req.params.news_id);
            pool.query('UPDATE news SET image_path = $1, news_title = $2, news_content = $3 WHERE news_id = $4',
            [image_path, news_title, news_content, req.params.news_id],
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