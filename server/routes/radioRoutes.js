const express = require("express");
const router = express.Router();
const radioController = require("../controllers/radioController");

router.get("/", radioController.getAllRadios);
router.get("/:id", radioController.getRadioById);
router.post("/", radioController.addRadio);
router.delete("/:id", radioController.deleteRadio);

module.exports = router;
