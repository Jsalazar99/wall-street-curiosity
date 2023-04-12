const router = require('express').Router();
const { Stocks } = require('../../models');
const withAuth = require('../../utils/auth');

// this file is copied from projectRoutes.js file 
router.post('/', withAuth, async (req, res) => {
  try {
    const newStock = await Stocks.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newStock);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const stockData = await Stocks.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!stockData) {
      res.status(404).json({ message: 'No stocks found with this id!' });
      return;
    }

    res.status(200).json(stockData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
