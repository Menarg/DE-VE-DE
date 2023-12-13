import { db } from "./modules/firebase";
import { 
    addDoc, collection, getDocs, 
    where, query, deleteDoc,
    doc, updateDoc 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const addMovieButton = document.querySelector('#searchbar-button');
const addMovieText = document.querySelector('#searchbar-input');

async function addMovie(movie) {
    try {
        // Skapar en ny note i databasen där man skickar med i vilken collection den ska skapas samt vilka fält som ska finnas med

        await addDoc(collection(db, 'movies'), movie)
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}

addMovieButton.addEventListener('click', () => {
    const movie = {
        title: document.querySelector('#searchbar-input').value,
        createdAt: new Date().toLocaleDateString()
      }

      addMovie(movie);
});