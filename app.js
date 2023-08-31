const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// const sequelize = require("./utils/database");
// const mongoConnect = require("./utils/database").mongoConnect;
const mongoose = require("mongoose");
// const User = require("./models/user");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findById("64edecbcf02a26833516a736")
//     .then((user) => {
//       req.user = new User(user.username, user.email, user.cart, user._id);
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// 404 page
app.use(errorController.get404);

// connecting to database
// sequelize
//   .sync()
//   .then((result) => {
//     // console.log(result);
//     app.listen(3000);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Connecting to database using mongoDB
// mongoConnect(() => {
//   console.log("connected!");
//   app.listen(3000);
// });

// Connecting to the database using mongoose
mongoose
  .connect(
    "mongodb+srv://ahtishamshakir000:shaam777@cluster0.fyh6w91.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected!");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
