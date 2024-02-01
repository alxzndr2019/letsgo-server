const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { userAuth, adminAuth } = require("../middlewares/Auth");

router.post("/", UserController.createUserAccount);
// POST to login to user
router.post("/login", UserController.login);
// me
router.get("/myuser/me", userAuth, UserController.returnUser);

module.exports = router;
