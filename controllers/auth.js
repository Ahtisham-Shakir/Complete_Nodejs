const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // console.log(req.get("Cookie").split(";")[3].trim().split("=")[1]);

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.session.isLoggedin,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("64f0d6f9215f23c69ed57d1c")
    .then((user) => {
      req.session.user = user;
      req.session.isLoggedin = true;
      // after storing session into db then redirect
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
