// Get the data
let searchIndex;
const resultsLocation = document.querySelector(".search-results");
const searchBtn = document.querySelector(".js-search [type='submit']");
searchBtn.addEventListener('click', findMatch);

fetch('/search.json').then(function(response) {
    return response.json();
}).then(function(response) {
    searchIndex = response.search;
    setupDefaultPage(searchIndex);
});




function findMatch(event) {
    event.preventDefault();

    clearSearchResults();

    const searchString = document.querySelector("#search").value.toLowerCase();
    console.log(searchString);

    // Look for matches in each item in the JSON
    var results = [];
    for (var item in searchIndex) {
        var title = searchIndex[item].title.toLowerCase();
        var found = title.indexOf(searchString);

        if (found === -1) {
            var phase = searchIndex[item].phase?.toLowerCase();
            if (!phase) continue;
            found = phase.indexOf(searchString);
        }

        if (found != -1) {
            results.push(searchIndex[item]);
        }
    }

    // Display the results
    displayResults(results);
    updateSearchMessage(results.length, searchString);
}

function displayResults(results) {

    let markup = '';
    results.forEach(item => {
        markup += getListItem(item);
    });
    
    const newElement = appendHtml(markup, "ul");
    resultsLocation.appendChild(newElement);
}

function getListItem(item) {

    const prefix = (item.type) ? item.type : "";
    const slug = (item.phase) ? item.phase : "";
    const link = `/${prefix}/${slug}/${item.link}`;

    const phase = (item.phase) ? item.phase : null;
    const processLength = (item.processLength) ? item.processLength : null;
    const setupTime = (item.setupTime) ? item.setupTime : null;

    if (processLength) {
        return `
        <li class="section flow">
            <h2>${item.title}</h2>
            <div>
                <ul class="list--inline">
                    <li><a href="/${prefix}/${phase}" class="badge badge--info js-phase">${item.phase}</a></li>
                    <li><a href="#" class="badge badge--info js-process-length">${item.processLength} days</a></li>
                    <li><a href="#" class="badge badge--info js-setup-time">${item.setupTime} Setup</a></li>
                </ul>
            </div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, officia tenetur, ipsam dolor veniam accusamus similique odio iusto perferendis
            amet ad magni? Nemo numquam laborum, nostrum praesentium quia at modi!</div>
            <a class="cta" href="${link}">Learn about ${item.title}</a>
        </li> 
        `
    }

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

function clearSearchResults() {
    resultsLocation.innerHTML = "";
}

function updateSearchMessage(count, queryValue) {
    const messageElem = document.querySelector('.js-search-message');
    const message = `Showing ${count} results for "${queryValue}"`;
    messageElem.innerHTML = message;
}

function setupDefaultPage(searchIndex) {

    // Get top 2 for each phase
    let topMethods = [];
    for (var item in searchIndex) {
        if (searchIndex[item].topMethod === "true") {
            topMethods.push(searchIndex[item]);
        }
    }

    let results = [];
    let phaseList = [];
    for (var item in topMethods) {
        const method = topMethods[item];
        if (phaseList.indexOf(method.phase) === -1) {
            phaseList.push(method.phase);
            results.push(method);
        }
    }


    displayResults(results);


}

