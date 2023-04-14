const router = require('express').Router();
const { Stocks } = require('../../models');
const withAuth = require('../../utils/auth');
var tickerAPI = "cfe7pg9r01qp08kufpagcfe7pg9r01qp08kufpb0";
// process.env.TICKER_API

// this file is copied from projectRoutes.js file 
router.get('/ticker-info', async (req, res) => {
  //const stocksData = ;
  fetch(`https://finnhub.io/api/v1/search?q=${req.query.search}&token=${tickerAPI}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("first stock", data);
      res.status(200).json(data);
    })
    .catch(err => res.status(500).json(err));

});

// get method for listing all stocks in DB
router.get('/', withAuth, async (req, res) => {
  const stocksData = await Stocks.findAll();
  
  const plainStocks = stocksData.map((stock) => stock.get({ plain: true }));
  res.json(plainStocks);

});

router.post('/', withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const newStock = await Stocks.create({
      //...req.body,
      symbol: req.body.addStock,
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
