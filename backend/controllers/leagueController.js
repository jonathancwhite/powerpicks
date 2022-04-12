const asyncHandler = require('express-async-handler')

const League = require('../models/leagueModel')
const User = require('../models/userModel')

// @desc    Get Leagues
// @route   GET /api/leagues
// @access  Private
const getLeagues = asyncHandler(async (req, res) => {
  res.status(200).json({message: 'Get Leagues'})
})

// @desc    Set League
// @route   POST /api/leagues
// @access  Private
const setLeague = asyncHandler(async (req, res) => {
  if(!req.body.user) {
    res.status(400)
    throw new Error('League cannot be created without being logged in')
  }
  res.status(200).json({message: 'Set Leagues'})
})

// @desc    Update League
// @route   PUT /api/leagues/:id
// @access  Private
const updateLeague = asyncHandler(async (req, res) => {
  res.status(200).json({message: 'Update League'})
})

// @desc    Delete League
// @route   DELETE /api/Leagues/:id
// @access  Private
const deleteLeague = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Remove League' })
})

module.exports = {
  getLeagues,
  setLeague,
  updateLeague,
  deleteLeague,
}