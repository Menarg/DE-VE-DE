import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, where} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./modules/firebase.js";

// Tror ja kan behöva en till genomgång av hur man delar upp saker, är osäker och har inte vågat mer

//searchbar
const searchbarButton = document.querySelector('#searchbar_button');

// where info for database comes from
const addMovieButton = document.querySelector('#add-movie_button');
const addMovieTitle = document.querySelector('#add-movie_title');
const addMovieGenre = document.querySelector('#add-movie_genre');
const addMovieRelease = document.querySelector('#add-movie_release');
const addMovieWatched = document.querySelector('#add-movie_watched');

//opens interface to add Movies to list
const addNewMovieButton = document.querySelector('#add-new-movie');
const addNewMovieElem = document.querySelector('#add-movie');

// Display section
const moviesListElem = document.querySelector('#moviesList');
const searchListElem = document.querySelector('#searchResults')

async function searchMovies(searchbarText) {
    const search = searchbarText.value;

    try {
        const searchQuery = query(collection(db, 'movies'), where('title', '==', search.toLowerCase()));
        const results = await getDocs(searchQuery);

        const formatedResults = [];

        results.forEach((result) => {
            const formatedResult = {
                id: result.id,
                movies: result.data()
            }
            formatedResults.push(formatedResult);
        });
        return formatedResults;
    } catch (error) { 
        console.log(error);
    }   
    
}

async function displaySearch(formatedResults){ // I feel very dumb
    console.log(formatedResults.movies);
    // skapar en article tag för varje film
    const articleElem = document.createElement('article');
    articleElem.setAttribute("class", "searchList_movie");

    // console.log(moviesArray.movies.title);
    //fyller article taggen
    const textElem = document.createElement('p');
    textElem.innerText = `TITLE: ${formatedResults.movies.title.toUpperCase()} - GENRE: ${formatedResults.movies.genre.toUpperCase()} - RELEASE DATE: ${formatedResults.movies.release}`;
    const watchedElem = document.createElement('input');
    watchedElem.setAttribute("type", "checkbox");
    if (formatedResults.movies.watched === true) { watchedElem.setAttribute("checked", ""); } //fyller checkboxen bara om watched = true
    // console.log(movies.watched);
    const deleteElem = document.createElement('button');
    deleteElem.append("Delete");
    // console.log(textElem, watchedElem, deleteElem);
    searchListElem.append(articleElem);
    articleElem.append(textElem, watchedElem, deleteElem);

    watchedElem.addEventListener('click', () => {
        updateMovie(formatedResults);
    });

    deleteElem.addEventListener('click', () => {
        deleteMovie(formatedResults);
    });
}

async function addMovie(movie) {
    try {
        await addDoc(collection(db, 'movies'), movie)
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
    displayMovies();
};

async function clean() {
    // tar bort gamla listan om den finns
    console.log("cleaning");
    while (moviesListElem.hasChildNodes()) { 
        moviesListElem.removeChild(moviesListElem.children[0]);
    }
}

async function getMovies() {
    try {
        const moviesArray = [];

        // fyller på listan från vår databas
        const moviesList = await getDocs(collection(db, 'movies')); 
        moviesList.forEach((movies) => {
            const movie = {
                movies: movies.data(),
                id: movies.id
            }
            moviesArray.push(movie);
            // console.log(movie);
        });
        // console.log(moviesArray);
        return moviesArray;
    } catch (error) {
        console.log(error);
    }
}

async function updateMovie(moviesArray) {

    const id = moviesArray.id;
    const watch = moviesArray.movies.watched;
    console.log(watch);
    try {
        await updateDoc(doc(db, 'movies', id), { //changes watched state
            watched: !watch
        }) 
    } catch (error) { console.log(error); }
    displayMovies();
}

async function deleteMovie(moviesArray) {
    try {
        console.log(moviesArray);
        await deleteDoc(doc(db, 'movies', moviesArray.id));
    } catch (error) { console.log(error); }
    displayMovies();
}

function createMovieElement(moviesArray) {
    // skapar en article tag för varje film
    const articleElem = document.createElement('article');
    articleElem.setAttribute("class", "moviesList_movie");

    // console.log(moviesArray.movies.title);
    //fyller article taggen
    const textElem = document.createElement('p');
    textElem.innerText = `TITLE: ${moviesArray.movies.title.toUpperCase()} - GENRE: ${moviesArray.movies.genre.toUpperCase()} - RELEASE DATE: ${moviesArray.movies.release}`;
    const watchedElem = document.createElement('input');
    watchedElem.setAttribute("type", "checkbox");
    if (moviesArray.movies.watched === true) { watchedElem.setAttribute("checked", ""); } //fyller checkboxen bara om watched = true
    // console.log(movies.watched);
    const deleteElem = document.createElement('button');
    deleteElem.append("Delete");

    moviesListElem.append(articleElem);
    articleElem.append(textElem, watchedElem, deleteElem);

    watchedElem.addEventListener('click', () => {
        updateMovie(moviesArray);
    });

    deleteElem.addEventListener('click', () => {
        deleteMovie(moviesArray);
    });
}

// Program, START!
displayMovies();

async function displayMovies() {
    await clean();
    const movies = await getMovies();

    // console.log(movies);
    for ( const movie of movies ) {
        createMovieElement(movie);
    }
}

async function displayMoviesSearch(searchbarText) {
    const formatedResults = await searchMovies(searchbarText);
    for ( const movies of formatedResults) {
        displaySearch(movies);
    }
    searchListElem.classList.toggle('hidden');
}

addMovieButton.addEventListener('click', () => {
    const movie = {
        title: addMovieTitle.value.toLowerCase(),
        genre: addMovieGenre.value.toLowerCase(),
        release: addMovieRelease.value,
        watched: addMovieWatched.checked,
      }
    addMovie(movie);
    addNewMovieButton.classList.toggle('hidden');
    addNewMovieElem.classList.toggle('hidden');
    getMovies();
});

addNewMovieButton.addEventListener('click', () => {
    addNewMovieButton.classList.toggle('hidden');
    addNewMovieElem.classList.toggle('hidden');
});

searchbarButton.addEventListener('click', () => {
    const searchbarText = document.querySelector('#searchbar_input');
    displayMoviesSearch(searchbarText);
})