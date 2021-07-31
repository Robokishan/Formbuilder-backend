var router = require('express').Router();
var formAnsController = require('../../controllers/v1/formAns.controller');

router.get('/',                 formAnsController.listAnswers)
router.delete('/:answerId',formAnsController.deleteAnswer);
router.get('/:answerId', formAnsController.getAnswer);
module.exports = router;