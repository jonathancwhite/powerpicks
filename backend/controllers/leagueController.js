const asyncHandler = require('express-async-handler')
const League = require('../models/leagueModel')

// @desc    Get Leagues
// @route   GET /api/leagues
// @access  Private
const getLeagues = asyncHandler(async (req, res) => {
  const leagues = await League.find()

  res.status(200).json(leagues)
})

// @desc    Set League
// @route   POST /api/leagues
// @access  Private
const setLeague = asyncHandler(async (req, res) => {
  if(!req.body.leagueName) {
    res.status(400)
    throw new Error('League cannot be created without a name')
  }

  const league = await League.create({
    leagueName: req.body.leagueName,
    leagueSport: req.body.leagueSport,
    leagueLevel: req.body.leagueLevel,
    maxPlayers: req.body.maxPlayers,
    leagueDescription: req.body.leagueDescription
  })

  res.status(200).json(league)
})

// @desc    Update League
// @route   PUT /api/leagues/:id
// @access  Private
const updateLeague = asyncHandler(async (req, res) => {

  const league = await League.findById(req.params.id)

  if (!league) {
    res.status(400)
    throw new Error('League not found')
  }

  const updatedLeague = await League.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(200).json(updatedLeague)
})

// @desc    Delete League
// @route   DELETE /api/Leagues/:id
// @access  Private
const deleteLeague = asyncHandler(async (req, res) => {
  const league = await League.findById(req.params.id)

  if (!league) {
    res.status(400)
    throw new Error('League not found')
  }

  await league.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getLeagues,
  setLeague,
  updateLeague,
  deleteLeague,
}