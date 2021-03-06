var router = require('express').Router();
var controller = require('./cardController');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var auth = require('../../auth/auth');
var checkUser = auth.validateToken();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function (req, res) {
    if(req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

/** POST create new card. */
router.route('/')
    .post(controller.post);

/** Verify that user is in the company and send out card_id */
router.route('/verify/:institution')
    .post(checkUser, controller.verify);

module.exports = router;