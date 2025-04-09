const express = require("express");
const router = express.Router();
const articleController = require("../controllers/lastController");

router.get("/last", articleController.getlastArticles);

module.exports = router;
