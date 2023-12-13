import { collection, getDocs, addDoc, query, where, updateDoc, increment, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./modules/firebase.js";

const addMovieButton = document.querySelector('#searchbar-button');
const addMovieText = document.querySelector('#searchbar-input');

async function addMovie(movie) {
    try {
        await addDoc(collection(db, 'movies'), movie)
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
};

addMovieButton.addEventListener('click', () => {
    const movie = {
        title: addMovieText.value,
        genre: '',
        release: '',
        watched: false,
        createdAt: new Date().toLocaleDateString()
      }

      addMovie(movie);
});