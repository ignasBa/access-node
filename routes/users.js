var express = require('express');
var router = express.Router();
var controller = require('../model/usersController');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function (req, res) {
    if(req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

/* GET users listing. */
router.route('/')
    .get(controller.get)
    .post(controller.post);

module.exports = router;
