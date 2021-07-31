var router = require('express').Router();
var formAnsController = require('../../controllers/v1/formAns.controller');
router.post("/assetData/:assetId",formAnsController.addAnswer)

module.exports = router;