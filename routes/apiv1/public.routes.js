var router = require('express').Router();
var formAnsController = require('../../controllers/v1/formAns.controller');
var assetController = require('../../controllers/v1/assets.controller');
router.post("/assetData/:assetId",formAnsController.addAnswer)
router.get('/asset/:assetId', assetController.getPublic);

module.exports = router;