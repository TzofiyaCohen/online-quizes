const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userAnonymousDetails = new Schema({
    ip: { type: String },
    user_agent: { type: String },
    time: { type: Object }
});

const AnonymousDetails = mongoose.model('userAnonymousDetails', userAnonymousDetails);

module.exports = AnonymousDetails;