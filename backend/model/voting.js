const mongoose = require("mongoose");

const votingSchema = new mongoose.Schema({
    candidates: [{
        //option name
        id: {type: String}
    }],
    is_active: {type: Boolean, default: true},
    requested_by: {type: String},
    date_start: {type: Date},
    date_finish: {type: Date},
    title: {type: String},
    description: {type: String},
    public_key: {type: String},
    users_able_to_vote: [{
        //encrypted username
        id: {type: String},
        has_voted: {type: Boolean, default: false}
    }],
    votes: [{
        selected_candidate: {type: String},
        encrypted_vote_data: {type: String}
    }]
});

module.exports = mongoose.model("voting",votingSchema);