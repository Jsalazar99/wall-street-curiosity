/* window.localStorage;
// Create variable for news API/ alphavantage
var newsApiKey = "Y05JOHE1Z7ATCKW7";
// Create variables for ticker and price API/ Finhub
var tickerApiKey = "cfe7pg9r01qp08kufpagcfe7pg9r01qp08kufpb0";
var priceApiKey = "cfe7pg9r01qp08kufpagcfe7pg9r01qp08kufpb0";
*/

//require('dotenv').config();
//process.env.SESSION_SECRET
const newsAPI = "Y05JOHE1Z7ATCKW7"; //process.env.NEWSAPIKEY;
const tickerAPI = "cfe7pg9r01qp08kufpagcfe7pg9r01qp08kufpb0"; //process.env.TICKERAPIKEY;
const priceAPI = "cfe7pg9r01qp08kufpagcfe7pg9r01qp08kufpb0"; //process.env.PRICEAPIKEY;

var searchStock = document.querySelector("#searchStocks");
var ticker = document.querySelector("#search-input");
var searchForm = document.querySelector("#search-form");

// Create a function to pull data from search button using the API's
let stockTicker = function (search) {

  console.log(search);

  // Stock Name Data for stocks
  fetch(`https://finnhub.io/api/v1/search?q=${search}&token=${tickerAPI}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("first stock", data);
    })
    .catch();

  // Gets Price Data for Stocks
  fetch(`https://finnhub.io/api/v1/quote?symbol=${search}&token=${priceAPI}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("stock price", data);
      console.log(data.c);
      // Dan says this needs to be in the scope, so I moved it here!
      var symbol = document.querySelector("#symbol");
      symbol.textContent = ` ${search}`;

      var currentPrice = document.querySelector("#currentP");
      currentPrice.textContent = ` Current Price: ${data.c}`;

      var highP = document.querySelector("#highP");
      highP.textContent = ` High Price: ${data.h}`;

      var lowP = document.querySelector("#lowP");
      lowP.textContent = ` Low Price: ${data.l}`;

      var openP = document.querySelector("#openP");
      openP.textContent = ` Open Price: ${data.o}`;

      var prevClose = document.querySelector("#prevClose");
      prevClose.textContent = ` Previous Close: ${data.pc}`;

      var iconFloat = document.getElementsByClassName("small");
      iconFloat.classList.add("icon-float");
      

    })
    .catch((error) => {
      console.log(error);
    });

  // Pulls News data for stock ticker
  fetch(
    `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${search}&apikey=${newsAPI}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("stock news", data);
      console.log(data.feed);

      if (!data.feed) {
        console.log("No Results");
        search.innerHTML = "<h3>No results found, search again!</h3>";
      } else {
        search.innerHTML = "";
        // Creating cards for news articles
        var articleEl = document.querySelector(".current-news");
        articleEl.textContent = ''
        for (var i = 0; i < 5; i++) {
          var articleData = data.feed[i];

          var cardBody = document.createElement("div");
          var articletitle = document.createElement("h5");
          var articleSummary = document.createElement("p");
          var linkButtonEl = document.createElement("a");

          cardBody.classList.add('card');
          articleSummary.textContent = 'Summary: ' + articleData.summary
          articletitle.textContent = 'Title: ' + articleData.title
          linkButtonEl.textContent = 'Read More';
          linkButtonEl.setAttribute('href', articleData.url);
          linkButtonEl.setAttribute('target', '_blank');
          linkButtonEl.classList.add('btn');

          articleEl.appendChild(cardBody);
          cardBody.appendChild(articletitle);
          cardBody.appendChild(articleSummary);
          cardBody.appendChild(linkButtonEl);
        }
      }
    })

    .catch();
  // comment from Jesus - append ticker data into div
  var currentSymbol = document.querySelector("#symbol");
  currentSymbol.textContent = `Symbol: ${search}`;

  // variable to include ALL stock info?
  var stockInfo = document.querySelector(".current-prices");
};

// Create event listeners for the search
searchForm.addEventListener("submit", (e) => {
  e.preventDefault()
  stockTicker(ticker.value)
});

// ADD Stock Button 
const addButton = document.querySelector('#add-stock');
addButton.addEventListener('click', async (event) => {
  event.preventDefault();

  const addStock = document.querySelector('#search-input').value.trim();

  if (addStock) {
    const response = await fetch(`/api/stocks`, {
      method: 'POST',
      body: JSON.stringify({ addStock }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(addStock);

    if (response.ok) {
      document.location.replace('/watchlist');
    } else {
      alert('Failed to add stock!');
    }
  }
});

// Attach addStock function to the add-stock button
document.querySelector('#add-stock')
  .addEventListener('click', addStock);

/*
    const { Chart } = await import('chart.js');
    require(['path/to/chartjs/dist/chart.umd.js'], function(Chart){
      const myChart = new Chart(ctx, {...});
  });
  require(['chartjs'], function(Chart) {
    require(['moment'], function() {
        require(['chartjs-adapter-moment'], function() {
            new Chart(ctx, {...});
        });
    });
});  
*/