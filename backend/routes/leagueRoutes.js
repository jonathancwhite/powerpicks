const express = require('express');
const router = express.Router()
const { 
    getLeagues, 
    setLeague, 
    updateLeague, 
    deleteLeague
} = require('../controllers/leagueController');
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getLeagues).post(protect, setLeague)
router.route('/:id').delete(protect, deleteLeague).put(protect, updateLeague)

module.exports = router