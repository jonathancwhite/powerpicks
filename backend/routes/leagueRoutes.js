const express = require('express');
const router = express.Router()
const { getLeagues, setLeague, updateLeague, deleteLeague} = require('../controllers/leagueController');

router.route('/').get(getLeagues).post(setLeague)
router.route('/:id').delete(deleteLeague).put(updateLeague)

module.exports = router