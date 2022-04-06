const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const { pool } = require("./modules/dbConfig");
const dotenv = require('dotenv');
const stripe= require('stripe')('sk_test_51K3V16JInS7TPGr6CnHyeZwD0BxN0yTT3KDwHL7bUX8TRR3KW0CIpOTyYXaQo3AgXEBzitETWogEWtzCeycWY79000WnR8Qn95');


const users = require("./modules/users");
const reminder = require("./modules/reminder");
const news = require("./modules/news");
const shop = require("./modules/shop");
const payment = require("./modules/payment");
const orders = require("./modules/orders");

const app = express();
//app.use(morgan('combine'));
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
)

app.get('/status', (req,res) => {
    res.send({
        message: 'The server is online!'
    })
})

app.get("/getUsers", users.getUsers)

//reminder module
app.get("/getAllReminder/:user_id", reminder.getAllReminder) 
app.get("/getReminder/:remind_id", reminder.getReminder)
app.post("/addReminder/:user_id", reminder.addReminder)
app.post("/deleteReminder/:user_id/:remind_id", reminder.deleteReminder)
app.post("/editReminder/:user_id/:remind_id", reminder.editReminder)

//user module
app.post("/register", users.register)
app.post("/login", users.login)
app.get("/getName/:userID", users.getName)
app.get("/getUserInfo/:user_id", users.getUserInfo)
app.post("/editProfile/:user_id", users.editProfile)
app.post("/changePassword/:user_id", users.changePassword)

//news module
app.get("/getNews", news.getNews) //done
app.post("/addNews", news.addNews) //done
app.post("/deleteNews/:news_id", news.deleteNews) //done
app.get("/getNewsContent/:news_id", news.getNewsContent) //done
app.post("/editNews/:news_id", news.editNews) //done

//shop module
app.get("/getAllProduct", shop.getAllProduct) 
app.get("/getProduct/:product_id", shop.getProduct) 
app.get("/getItemCategory", shop.getItemCategory) 
app.post("/addProduct", shop.addProduct) 
app.get("/getUserRecommendation/:user_id", shop.getUserRecommendation)

//order module
app.post("/addToCart/:user_id/:product_id", shop.addToCart)
app.get("/getUserCart/:user_id", shop.getUserCart) 
app.post("/deleteCartItem/:user_id/:product_id", shop.deleteCartItem) 
app.post("/editProductQuantity/:user_id/:product_id", shop.editProductQuantity) 
app.post("/addToOrder/:user_id", payment.addToOrder)
app.post("/deleteFromCart/:user_id", payment.deleteFromCart)
app.post("/addReview/:user_id", shop.addReview) 
app.get("/getReview/:product_id", shop.getReview) 
app.post("/updateStatusToRated/:order_id", shop.updateStatusToRated) 
app.get("/getOrder/:user_id", orders.getOrder)

//payment module
app.post("/createPaymentIntent/:user_id", payment.createPaymentIntent) 
app.post("/savePaymentRecord/:user_id", payment.savePaymentRecord)
app.post("/applyPromotionCode/:user_id", payment.applyPromotionCode)




app.listen(process.env.PORT || 8081);
