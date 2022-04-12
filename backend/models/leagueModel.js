const mongoose = require('mongoose')

const leagueSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    leagueName: {
        type: String,
        
    },
    leagueSport: {
        type: String,

    },
    leagueLevel: {
        type: String,

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
    currentParticipants: {
        type: String
    },
    text: {
        type: String
    },
}, 
{
    timestamps: true
});

module.exports = mongoose.model('League', leagueSchema)