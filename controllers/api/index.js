const router = require('express').Router();
const userRoutes = require('./userRoutes');
const stockRoutes = require('./stockRoutes');

router.use('/users', userRoutes);
router.use('/stocks', stockRoutes);

module.exports = router;
