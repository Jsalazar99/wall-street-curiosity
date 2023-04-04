const router = require('express').Router();
const userRoutes = require('./userRoutes');
const newsRoutes = require('./newsRoutes');
const stockRoutes = require('./stockRoutes');

router.use('/users', userRoutes);
router.use('/news', newsRoutes);
router.use('/stocks', stockRoutes);

module.exports = router;
