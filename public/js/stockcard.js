// Creating cards for stock listings
if (!data.feed) {
    console.log("No Results");
    search.innerHTML = "<h3>No results found, search again!</h3>";
} else {
    search.innerHTML = "";

    // change the variable names here for stock handlebars     
    var articleEl = document.querySelector(".current-news");
    articleEl.textContent = ''
    for (var i = 0; i < 50; i++) {
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
};
