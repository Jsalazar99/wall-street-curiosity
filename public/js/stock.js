// Create variable for news API/ alphavantage
var newsAPI = "Y05JOHE1Z7ATCKW7";
// Create variables for ticker and price API/ Finhub
var tickerAPI = "cfe7pg9r01qp08kufpagcfe7pg9r01qp08kufpb0";
var priceAPI = "cfe7pg9r01qp08kufpagcfe7pg9r01qp08kufpb0";

var searchStock = document.querySelector("#searchStocks");
var ticker = document.querySelector("#search-input");
var searchForm = document.querySelector("#search-form");

/* const data = {
  symbol: '',
  name: '',
  c: '',
  chartData: [] // add this property to the data object
}; */

// Create a function to pull data from search button using the API's
let stockTicker = function (search) {

  console.log(search);
  fetch(`/api/stocks/ticker-info?search=${search}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("first stock", data);
    })
    .catch();
  // Stock Name Data for stocks
  // fetch(`https://finnhub.io/api/v1/search?q=${search}&token=${tickerAPI}`)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     console.log("first stock", data);
  //   })
  //   .catch();

  // Gets Price Data for Stocks
  fetch(`https://finnhub.io/api/v1/quote?symbol=${search}&token=${priceAPI}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("stock price", data);
      console.log(data.c);

      // update the data object with the retrieved data
      data.symbol = search;
      data.c = data.c;
      data.chartData = data.chartData; // assuming the API response includes chart data

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

      // new code for CHARTJS fucntion 
      // call function to update the chart with the retrieved chart data
      updateChart(data.chartData);
    })
    .catch((error) => {
      console.log(error);
    });
  //const currentPrice = document.querySelector('#current-price');
  //const searchForm = document.querySelector('#search-form');



  /* fetch(`https://api.example.com/${symbol}`)
    .then(response => response.json())
    .then(apiData => {
      data.symbol = apiData.symbol;
      data.name = apiData.name;
      data.c = apiData.c;
      data.chartData = apiData.chartData; // assuming the API response includes chart data
      
      // update the page with the retrieved data
      //currentPrice.textContent = `Current Price: ${data.c}`;
      
      // call function to update the chart with the retrieved chart data
      updateChart(data.chartData);
    })
    .catch(error => console.error(error));
  */
  // function to update the chart with new data
  /* function updateChart(chartData) {
    const ctx = document.getElementById('myChart');

    // create the chart with the updated data
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Current Price', 'High Price', 'Low Price', 'Open Price', 'Previous Close'],
        datasets: [{
          label: data.symbol,
          data: chartData,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  } */

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