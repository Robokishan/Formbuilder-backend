var router = require('express').Router();

router.use("/p",require('./public.routes.js'))

module.exports = router;