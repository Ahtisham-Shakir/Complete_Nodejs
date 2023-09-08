exports.getLogin = (req, res, next) => {
  // console.log(req.get("Cookie").split(";")[3].trim().split("=")[1]);
  const isLoggedin = req.get("Cookie").split(";")[3].trim().split("=")[1];
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedin,
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "isLoggedin=true");
  res.redirect("/");
};
