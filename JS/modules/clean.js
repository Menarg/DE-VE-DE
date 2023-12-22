// exported because it doesn't need any infomartion from anything else.

const moviesListElem = document.querySelector('#moviesList');
const searchListElem = document.querySelector('#searchResults');

async function clean() {
    // tar bort gamla listan om den finns
    console.log("cleaning");
    while (moviesListElem.hasChildNodes()) { 
        moviesListElem.removeChild(moviesListElem.children[0]);
    }
}

async function cleanSearch() {
    // rensar search listan
    console.log("cleaning search");
    while (searchListElem.hasChildNodes()) { 
        searchListElem.removeChild(searchListElem.children[0]);
    }
}

export { clean, cleanSearch }