const express = require("express");
const uploadRouter = require("./upload");
const dataRouter = require("./electric-cars");

const router = express.Router();

router.use("/upload", uploadRouter);
router.use("/electric-cars", dataRouter);


module.exports = router;