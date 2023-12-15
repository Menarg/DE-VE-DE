const searchListElem = document.querySelector('#searchResults')

async function cleanSearch() {
    // rensar search listan
    console.log("cleaning search");
    while (searchListElem.hasChildNodes()) { 
        searchListElem.removeChild(searchListElem.children[0]);
    }
}

export { cleanSearch }