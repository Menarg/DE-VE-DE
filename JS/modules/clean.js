const moviesListElem = document.querySelector('#moviesList');

async function clean() {
    // tar bort gamla listan om den finns
    console.log("cleaning");
    while (moviesListElem.hasChildNodes()) { 
        moviesListElem.removeChild(moviesListElem.children[0]);
    }
}

export { clean }