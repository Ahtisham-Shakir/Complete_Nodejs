const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// const sequelize = require("./utils/database");
const mongoConnect = require("./utils/database").mongoConnect;
// const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");
// const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use("/admin", adminRoutes);
// app.use(shopRoutes);

// 404 page
// app.use(errorController.get404);

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
mongoConnect(() => {
  console.log("connected!");
  app.listen(3000);
});
