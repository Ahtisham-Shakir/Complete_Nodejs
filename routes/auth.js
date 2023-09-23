const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");

router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);
router.get("/reset", authController.getReset);

// post login
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password", "Password has to be valid")
      .trim()
      .isLength({ min: 5 })
      .isAlphanumeric(),
  ],
  authController.postLogin
);

// post signup
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        // if (value === "test@test.com") {
        //   throw new Error("This email address is forbidden");
        // }
        // return true;
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("This Email address is already taken");
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 5 characters"
    )
      .trim()
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match");
        }
        return true;
      }),
  ],
  authController.postSignup
);
router.post("/logout", authController.postLogout);
router.post("/reset", authController.postReset);
router.get("/reset/:token", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);
module.exports = router;
