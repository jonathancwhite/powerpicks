const asyncHandler = require('express-async-handler')
const { rest } = require('lodash')
const League = require('../models/leagueModel')
const User = require('../models/userModel')

// @desc    Get Leagues
// @route   GET /api/leagues
// @access  Private
const getLeagues = asyncHandler(async (req, res) => {
  if (req.user.id) {
    const leagues = await League.find()
    res.status(200).json(leagues)
  }else {
    res.status(404)
    throw new Error('Unauthorized')
  }
  
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
    user: req.user.id,
    leagueName: req.body.leagueName,
    leagueSport: req.body.leagueSport,
    leagueLevel: req.body.leagueLevel,
    maxPlayers: req.body.maxPlayers,
    leagueDescription: req.body.leagueDescription,
    selectedFile: req.body.selectedFile,
    currentParticipants: req.body.currentParticipants
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

  const user = await User.findById(req.user.id)

  // check for user
  if (!user) {
    res.status(401)
    throw new Erorr('User not found')
  }

  // Making sure the logged in user matches the league owner
  if(league.user.toString() != user.id) {
    res.status(401)
    throw new Error('User not authorized')
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

  const user = await User.findById(req.user.id)

  // check for user
  if (!user) {
    res.status(401)
    throw new Erorr('User not found')
  }

  // Making sure the logged in user matches the league owner
  if(league.user.toString() != user.id) {
    res.status(401)
    throw new Error('User not authorized')
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