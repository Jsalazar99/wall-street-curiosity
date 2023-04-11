// create a pool for database connections
const pool = mysql.createPool({
    // host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'your_database_name',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  
  // define a function to handle user requests to add a stock to their watchlist
  function add_to_watchlist(user_id, stock_symbol) {
    // check if the stock symbol already exists in the stocks table
    pool.query('SELECT id FROM stocks WHERE symbol = ?', [stock_symbol], (error, results) => {
      if (error) throw error;
  
      if (results.length > 0) {
        // if the stock symbol already exists, add it to the user's watchlist
        const stock_id = results[0].id;
        pool.query('INSERT INTO watchlist (user_id, stock_id) VALUES (?, ?)', [user_id, stock_id], (error, results) => {
          if (error) throw error;
          console.log(`Added ${stock_symbol} to user ${user_id}'s watchlist`);
        });
      } else {
        // if the stock symbol doesn't exist, insert it into the stocks table and add it to the user's watchlist
        pool.query('INSERT INTO stocks (symbol) VALUES (?)', [stock_symbol], (error, results) => {
          if (error) throw error;
          const stock_id = results.insertId;
          pool.query('INSERT INTO watchlist (user_id, stock_id) VALUES (?, ?)', [user_id, stock_id], (error, results) => {
            if (error) throw error;
            console.log(`Added ${stock_symbol} to user ${user_id}'s watchlist`);
          });
        });
      }
    });
  }