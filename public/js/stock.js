// Creating cards for stock listings
/* if (!data.feed) {
    console.log("No Results");
    search.innerHTML = "<h3>No results found, search again!</h3>";
} else {
    search.innerHTML = "";


    // POST for addStock btn event listener.  
    //const addStock = document.querySelector("#add-stock");

    if (description) {
        const response = await fetch(`/api/projects`, {
          method: 'POST',
          body: JSON.stringify({ description }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert('Failed to create project');
        }
      }
    };

    document.querySelector('#add-stock').addEventListener('submit', newFormHandler);
    */
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

    if (response.ok) {
      document.location.replace('/watchlist');
    } else {
      alert('Failed to add stock!');
    }
  }
});

const deleteButton = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/stocks/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/watchlist');
    } else {
      alert('Failed to delete project');
    }
  }
};

// Attach addStock function to the add-stock button
document.querySelector('#add-stock')
  .addEventListener('click', addStock);

// Attach deleteButton function to all elements with a data-id attribute
document.querySelectorAll('[data-id]')
  .forEach(element => {
    element.addEventListener('click', deleteButton);
  });


    // change the variable names here for stock handlebars     
    // var articleEl = document.querySelector(".current-news");
    // articleEl.textContent = ''
    // for (var i = 0; i < 50; i++) {
    //     var articleData = data.feed[i];

    //     var cardBody = document.createElement("div");
    //     var articletitle = document.createElement("h5");
    //     var articleSummary = document.createElement("p");
    //     var linkButtonEl = document.createElement("a");

    //     cardBody.classList.add('card');
    //     articleSummary.textContent = 'Summary: ' + articleData.summary
    //     articletitle.textContent = 'Title: ' + articleData.title
    //     linkButtonEl.textContent = 'Read More';
    //     linkButtonEl.setAttribute('href', articleData.url);
    //     linkButtonEl.setAttribute('target', '_blank');
    //     linkButtonEl.classList.add('btn');

    //     articleEl.appendChild(cardBody);
    //     cardBody.appendChild(articletitle);
    //     cardBody.appendChild(articleSummary);
    //     cardBody.appendChild(linkButtonEl);
    // }

