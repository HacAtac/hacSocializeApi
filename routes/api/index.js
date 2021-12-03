const router = require("express").Router();
const thoughtroutes = require("./thoughtroutes");
const userroutes = require("./userroutes");

// add prefix to all routes
router.use("/thoughts", thoughtroutes);
router.use("/users", userroutes);

//export router
module.exports = router;
