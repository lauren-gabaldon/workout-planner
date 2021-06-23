const router = require("express").Router();
const html = require("./htmlroutes");
const api = require("./apiRoutes");

router.use("/", html);
router.use("/api", api);

module.exports = router;
