const express = require("express");
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3000;

const initializePassport = require("./passportConfig");
const { query } = require("express");

initializePassport(passport);

// Middleware

// Parses details from a form
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use(
  session({
    // Key we want to keep secret which will encrypt all of our information
    secret: process.env.SESSION_SECRET,
    // Should we resave our session variables if nothing has changes which we dont
    resave: false,
    // Save empty value if there is no vaue which we do not want to do
    saveUninitialized: false
  })
);
// Funtion inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
app.use(passport.session());
app.use(flash());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/users/register", checkAuthenticated, (req, res) => {
  res.render("register.ejs");
});

app.get("/users/login", checkAuthenticated, (req, res) => {
  // flash sets a messages variable. passport sets the error message
  console.log(req.session.flash.error);
  res.render("login.ejs");
});

app.get("/users/dashboard", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("dashboard", { user: req.user.name });
});

app.get("/users/reminder", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());

  let dates = [];
  pool.query('SELECT * FROM important_date WHERE cust_id = $1', [req.user.id],
  (err, results) => {
    if(err){
      throw err;
    }else{
      console.log(results.rows);
      dates = results.rows;
      res.render("reminder", { dates: dates });
    }
  } );

});

app.get("/users/delete-reminder/:_remindId", checkNotAuthenticated, (req, res) => {
  const {_remindId} = req.params;
  
  console.log(req.isAuthenticated());

  pool.query('DELETE FROM important_date WHERE cust_id = $1 AND title = $2', 
  [req.user.id, _remindId], 
  (err, results) => {
    if(err){
      throw err;
    }else{
      console.log(results.rows);
      req.flash("success_msg", "The chosen date have been deleted.");
      res.redirect("/users/reminder");
    }
  }); 
});

app.get("/users/add-reminder", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("add-reminder.ejs");
});

app.post("/users/add-reminder", async (req, res) => {
  
  let {date, title, description, remind_date, remind_time } = req.body;
  let errors = [];
  
  console.log({
    date, title, description, remind_date, remind_time
  });

  if (!date || !title || !description || !remind_date || !remind_time) {
    errors.push({ message: "Please enter all fields" });
  }

  pool.query('INSERT INTO important_date (date, title, description, remind_date, remind_time, cust_id) VALUES ($1, $2, $3, $4, $5, $6)', 
  [date, title, description, remind_date, remind_time, req.user.id], 
  (err, results) =>{
    if (err) {
      console.log(err);
    }else{
      console.log(results.rows);
      req.flash("success_msg", "New date and its information has been saved.");
      res.redirect("/users/reminder");
    }
  })

});

app.get("/users/edit-reminder/:_remindId", checkNotAuthenticated, (req, res) => {
  const {_remindId} = req.params;
  
  console.log(req.isAuthenticated());
  let dates = [];

  pool.query('SELECT * FROM important_date WHERE cust_id = $1 AND remind_id = $2', [req.user.id, _remindId],
  (err, results) => {
    if(err){
      throw err;
    }else{
      console.log(results.rows);
      dates = results.rows;
      res.render("edit-reminder", {dates: dates});
    }
  } );
});

app.post("/users/edit-reminder/:_remindId", async (req, res) => {
  const {_remindId} = req.params;
  let {date, title, description, remind_date, remind_time } = req.body;
  let errors = [];
  
  console.log({
    date, title, description, remind_date, remind_time
  });

  if (!date || !title || !description || !remind_date || !remind_time){
    console.log("Please fill out all the fields required.");
  }else{
    console.log("UPDATE important_date SET date =" + date + ", title = "+title+", description ="+description+", remind_date ="+ remind_date+", remind_time = $5 WHERE cust_id = $6 AND remind_id = "+_remindId);
    pool.query('UPDATE important_date SET date = $1, title = $2, description = $3, remind_date = $4, remind_time = $5 WHERE cust_id = $6 AND remind_id = $7',
    [date, title, description, remind_date, remind_time, req.user.id, _remindId],
    (err, results) => {
      if(err){
        throw err;
      }else{
        console.log(results.rows);
        req.flash("success_msg", "Data has been updated.");
        res.redirect("/users/reminder");
      }
    }
    );
  }



});

app.get("/users/logout", (req, res) => {
  req.logout();
  res.render("index", { message: "You have logged out successfully" });
});

app.post("/users/register", async (req, res) => {
  let { name, email, password, password2 } = req.body;

  let errors = [];

  console.log({
    name,
    email,
    password,
    password2
  });

  if (!name || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password must be a least 6 characters long" });
  }

  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.render("register", { errors, name, email, password, password2 });
  } else {
    hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Validation passed
    pool.query(
      `SELECT * FROM users
        WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          return res.render("register", {
            message: "Email already registered"
          });
        } else {
          pool.query(
            `INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3)
                RETURNING id, password`,
            [name, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
              req.flash("success_msg", "You are now registered. Please log in");
              res.redirect("/users/login");
            }
          );
        }
      }
    );
  }
});

app.post(
  "/users/login",
  passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
  })
);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/dashboard");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/users/login");
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 