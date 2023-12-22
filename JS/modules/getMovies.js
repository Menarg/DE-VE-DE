// exported because it exports information

import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, where} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./firebase.js";

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

export { getMovies }