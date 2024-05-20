const express = require("express");
const router = express.Router();

router.use("/users", require("./userRoute"));
router.use("/mangas", require("./mangaRoute"));

module.exports = router;
