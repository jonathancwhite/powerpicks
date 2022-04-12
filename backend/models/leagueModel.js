const mongoose = require('mongoose')

const leagueSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    leagueName: {
        type: String,
        required: true
    },
    leagueSport: {
        type: String,
        required: true
    },
    leagueLevel: {
        type: String,
        required: true
    },
    maxPlayers: {
        type: Number
    },
    leagueDescription: {
        type: String,
    },
    selectedFile: {
        type: String,
    },
    currentParticipants: [String]
}, 
{
    timestamps: true
});

module.exports = mongoose.model('League', leagueSchema)