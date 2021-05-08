// Get the data
let searchIndex;

fetch('/search.json').then(function(response) {
    return response.json();
}).then(function(response) {
    searchIndex = response.search;
});


const searchBtn = document.querySelector(".js-search [type='submit']");


function findMatch(event) {
    event.preventDefault();

    const searchString = document.querySelector("#search").value;
    console.log(searchString);

    // Look for matches in each item in the JSON
    var results = [];
    for(var item in searchIndex ) {
      var title = searchIndex[item].title.toLowerCase();
      var found = title.indexOf(searchString);
      if(found != -1 ) {
        results.push(searchIndex[item])
      }
    }

    // Display the results
    displayResults(results);
}

function displayResults(results) {

    let markup = '';
    results.forEach(item => {
        markup += getListItem(item);
    });

    const resultsLocation = document.querySelector(".search-results");
    const newElement = appendHtml(markup, "ul");
    resultsLocation.appendChild(newElement);
}

function getListItem(item) {

    const prefix = (item.type) ? item.type : "";
    const slug = (item.phase) ? item.phase : "";
    const link = `/${prefix}/${slug}/${item.link}`;

    return `
        <li class="section flow">
            <h2>${item.title}</h2>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, officia tenetur, ipsam dolor veniam accusamus similique odio iusto perferendis
            amet ad magni? Nemo numquam laborum, nostrum praesentium quia at modi!</div>
            <a class="cta" href="${link}">Learn about ${item.title}</a>
        </li> 
    `
}

function appendHtml(htmlString, elementType) {
    let element = document.createElement(elementType);
    element.innerHTML = htmlString;
    element.classList.add("list--bare");
    return element;
}

searchBtn.addEventListener('click', findMatch);