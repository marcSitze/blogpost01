const express = require('express');
const router = express.Router();

const { getIndex } = require('../controllers')
const authRoutes = require('./auth')

router.get('/', getIndex);
router.use('/auth', authRoutes);

module.exports = router;