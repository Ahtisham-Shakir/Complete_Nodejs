const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
// const sequelize = require("./utils/database");
// const mongoConnect = require("./utils/database").mongoConnect;
const mongoose = require("mongoose");
const User = require("./models/user");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const errorController = require("./controllers/error");

const MONGODB_URI =
  "mongodb+srv://ahtishamshakir000:shaam777@cluster0.fyh6w91.mongodb.net/?retryWrites=true&w=majority";

const app = express();

const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

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
  .connect(MONGODB_URI)
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Shaam",
          email: "shaam@gmail.com",
          cart: { items: [] },
        });
        user.save();
      }
    });
    console.log("connected!");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
