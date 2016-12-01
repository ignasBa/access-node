var jwt = require('jsonwebtoken');
var config = require('../api/config');

exports.signToken = function (id) {
    return jwt.sign(
        {user_id: id},
        config.secret,
        {expiresIn: 86400} // Expires in 24h
    )
};