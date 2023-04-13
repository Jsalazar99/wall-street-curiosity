const router = require('express').Router();
const { Stocks, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  console.log('home routes');
  try {
    // Get all projects and JOIN with user data

    //res.render('homepage');
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/stocks', withAuth, async (req, res, next) => {
  try {
    // Get all projects and JOIN with user data
    const stocksData = await Stocks.findAll();
    const plainStocks = stocksData.map((stock) => stock.get({ plain: true }));
    // array for listing out stocks 
    const stocks = [];
    res.render('stock', {stocks});
  } catch (err) {
    res.status(500).json(err);
  }
}); 
/*
router.get('/watchlist', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const watchlistData = await Stocks.findAll();
    const plainStocks = watchlistData.map((watchlist) => watchlist.get({ plain: true }));
    const stocks=['hi','bye', 'cry']
    res.render('stock', {watchlist});
  } catch (err) {
    res.status(500).json(err);
  }
}); */
router.get('/user/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const userLogin = userData.get({ plain: true });

    res.render('', {
      ...userLogin,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/watchlist', withAuth, async (req, res, next) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Stocks }],

    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render('watchlist', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/watchlist');
    return;
  }

  res.render('login');
});

module.exports = router;
