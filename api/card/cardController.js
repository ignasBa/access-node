var Card = require('./cardModel');
var User = require('../user/userModel');
var config = require('./../config');


/** Verify that user is in the company and send out card_id */
exports.verify = function (req, res, next) {
    var institution = req.params.institution;
    var email = req.body.email;
    var pin = req.body.pin;
    var _id = req.user._id;

    Card.findOne({
        email: email,
        pin: pin
    })
        .exec()
        .then(function (card) {
            if (!card) {
                res.json('no cards found')
            }
            User.addCard(_id, institution, card.card_id, card.access_lvl);
            Card.deactivatePin(card._id);
            res.json({
                success: true,
                message: 'Card added to the user',
                card_id: card.card_id
            })
        });
};

/** Create new card */
exports.post = function (req, res, next) {
    var newCard = new Card(req.body);

    newCard.save(function (err, card) {
        if (err) {
            return res.json(err);
        }
        res.json({card});
    })
};

