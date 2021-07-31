var router = require('express').Router();

router.use('/v1/owner',require('./owner.auth.function.js'),require('./owner.routes'));
router.use('/v1/asset',require('./owner.auth.function.js'),require('./assets.routes'));
router.use('/v1/answer',require('./owner.auth.function.js'),require('./answer.routes'));
// // API v1
// router.use('/v1/owner', require('./owner.routes')); //users api lists
// router.use('/v1/asset', require('./assets.routes')); //assets api lists

module.exports = router;