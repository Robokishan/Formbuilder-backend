var router = require('express').Router();

//login api without authentication routes
router.use("/v1", require('./apiv1/login.routes.js'));
router.use("/v1", require('./apiv1/register.routes.js'));
router.use("/v1",require('./apiv1/noauth.routes.js'));

/****** Protected routes for user **********/
router.use(require('./apiv1/auth.routes.js'));
/****** Authentication route **********/

// API Error routes
router.use(function(req, res) {
  return res.status(404).json({
      message : process.env.NODE_ENV != 'production' ? "NOT FOUND" : "Page Not found"
    });
});

module.exports = router;