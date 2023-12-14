import { collection, getDocs, addDoc, deleteDoc, query, where, updateDoc, increment, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./modules/firebase.js";

// where info for database comes from
const addMovieButton = document.querySelector('#add-movie_button');
const addMovieTitle = document.querySelector('#add-movie_title');
const addMovieGenre = document.querySelector('#add-movie_genre');
const addMovieRelease = document.querySelector('#add-movie_release');
const addMovieWatched = document.querySelector('#add-movie_watched');

//opens interface to add Movies to list
const addNewMovieButton = document.querySelector('#add-new-movie');
const addNewMovieElem = document.querySelector('#add-movie');

//Printout
const moviesListElem = document.querySelector('#moviesList');

async function addMovie(movie) {
    try {
        await addDoc(collection(db, 'movies'), movie)
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
};

async function getMovies() {
    // tar bort gamla listan
    while (moviesListElem.hasChildNodes()) { 
        moviesListElem.removeChild(moviesListElem.children[0]);
    } 

    // fyller på listan från vår databas
    const moviesList = await getDocs(collection(db, 'movies')); 
    moviesList.forEach((movies) => {
        const movie = movies.data();
        createMoviesElement(movie);
    });
}

async function updateMovie(movie) {
    //await updateDoc(doc(db, 'movies',movie.id));
}

async function deleteMovie(movie) {

}

function createMoviesElement(movie) {
    const articleElem = document.createElement('article');
    articleElem.setAttribute("class", "moviesList_movie");
    const textElem = document.createElement('p');
    textElem.innerText = `Title: ${movie.title} - Genre: ${movie.genre} - Release Date: ${movie.release}`;
    const watchedElem = document.createElement('input');
    watchedElem.setAttribute("type", "checkbox");
    if (movie.watched === true) { watchedElem.setAttribute("checked", ""); } //fyller checkboxen bara om watched = true
    console.log(movie.watched);
    const deleteElem = document.createElement('button');
    deleteElem.append("Delete");
    moviesListElem.append(articleElem);
    articleElem.append(textElem, watchedElem, deleteElem);
    // console.log(query(collection(db, 'movies'), where('movies', '==', )));

    // detta ska du göra
    watchedElem.addEventListener('click', () => {
        updateMovie(movie);
    });

    deleteElem.addEventListener('click', () => {
        deleteMovie(movie);
    });
}

getMovies();

addMovieButton.addEventListener('click', () => {
    const movie = {
        title: addMovieTitle.value,
        genre: addMovieGenre.value,
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