import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, where} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./modules/firebase.js";

// Tror ja kan behöva en till genomgång av hur man delar upp programmet i filer, är osäker och har inte vågat mer

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

// Display sections
const moviesListElem = document.querySelector('#moviesList');
const searchListElem = document.querySelector('#searchResults')

// importing functions from separate files
import { searchMovies } from "./modules/searchMovies.js";
import { getMovies } from "./modules/getMovies.js";
import { clean } from "./modules/clean.js";
import { cleanSearch } from "./modules/cleanSearch.js";

async function displaySearch(formatedResults){ // I feel very dumb
    // console.log(formatedResults.movies);
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
        console.log(error);
    }
    displayMovies();
};

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
    displayMoviesSearch();
}

async function deleteMovie(moviesArray) {
    try {
        console.log(moviesArray);
        await deleteDoc(doc(db, 'movies', moviesArray.id));
    } catch (error) { console.log(error); }
    displayMovies();
    displayMoviesSearch();
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

async function displayMovies() {
    await clean();
    const movies = await getMovies();

    // console.log(movies);
    for ( const movie of movies ) {
        createMovieElement(movie);
    }
}

async function displayMoviesSearch() {
    await cleanSearch();

    const formatedResults = await searchMovies();
    console.log(formatedResults);
    for ( const movies of formatedResults) {
        displaySearch(movies);
    }
}

// Program, START!
displayMovies();

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
    displayMovies();
});

addNewMovieButton.addEventListener('click', () => {
    addNewMovieButton.classList.toggle('hidden');
    addNewMovieElem.classList.toggle('hidden');
});

searchbarButton.addEventListener('click', () => {
    displayMoviesSearch();
})