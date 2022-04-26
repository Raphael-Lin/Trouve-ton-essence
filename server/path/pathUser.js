//importation 
const express = require("express");

//importation du middleware/password
const password = require("../middleware/password.js");

// importation du contr/user.js
const userController = require("../main/user.js")

// la fonction router()
const router = express.Router();

//la route (endpoint) signup
router.post("/register",password, userController.signup);

// la route (endpoint) login
router.post("/login",userController.login);

//exportation du module 
module.exports = router;