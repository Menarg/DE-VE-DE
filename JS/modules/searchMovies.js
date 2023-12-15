// exported because it works, and it's cleaner ? :)

import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, where} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./firebase.js";

async function searchMovies() {
    // console.log("got here");
    const searchbarText = document.querySelector('#searchbar_input');
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

export { searchMovies }