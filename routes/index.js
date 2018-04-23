var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sess = req.session;
  var loginUser = sess.loginUser;
  res.json({loginU:loginUser});
  res.render('index', { title: 'Express' });
});
module.exports = router;
