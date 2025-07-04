const router = require("express").Router();
const {register} = require("../services/user");

router.post("/register",register);

module.exports = router;