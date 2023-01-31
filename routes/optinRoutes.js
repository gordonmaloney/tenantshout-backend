const express = require("express");
const { createOptin, getOptins } = require("../controllers/optinController");
const router = express.Router();


router.post('/', createOptin)
router.post('/optins', getOptins)


module.exports = router;
