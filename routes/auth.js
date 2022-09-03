const express = require("express");
const router = express.Router();

const {
  createUser,
  login,
  getLogin,
  getRegister,
} = require("../controllers/auth");

/*===========================
         REGISTER
============================*/
router.post("/register", createUser);
router.get("/register", getRegister);

/*===========================
         LOGIN
============================*/
router.post("/login", login);
router.get("/login", getLogin);

module.exports = router;
