const express = require('express');
const router = express.Router();

const { getIndex } = require('../controllers')
const authRoutes = require('./auth')
const auth = require('../middlewares/auth');

router.get('/',auth, getIndex);
router.use('/auth', authRoutes);


module.exports = router;