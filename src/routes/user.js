const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/auth');
const User = require("../controllers/user.js")

//get Specific quiz scoreCard 
router.get('/:quiz_id/score', authenticateUser, User.getScoreCard);

//get General quiz scoreCard
router.get('/quiz', authenticateUser, User.generateScoreCard);

module.exports = router;