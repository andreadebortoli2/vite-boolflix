<script>
import { store } from '../store';
import axios from 'axios';

export default {
    name: 'AppHeader',
    data() {
        return {
            store,
            searchText: '',
            movies: []
        }
    },
    methods: {
        searchMovie(text) {
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=7c7d2baca05b9819b69763a53ed1d49d&query=${text}&language=it-IT`).then(response => {
                // console.log(response);
                this.movies = response.data.results
            })
        }
    },
    mounted() {

    }
}
</script>

<template>
    <div>
        <input type="text" v-model="searchText" placeholder="Write the title you looking for">
        <button @click="searchMovie(searchText)">Search</button>
    </div>
    <ul class="sarech_response" v-for="movie in movies">
        <li>
            <ul>
                <li>
                    Titolo: {{ movie.title }}
                </li>
                <li>
                    Titolo originale: {{ movie.original_title }}
                </li>
                <li>
                    Lingua: {{ movie.original_language }}
                </li>
                <li>
                    Voto: {{ movie.vote_average }}
                </li>
            </ul>
        </li>
    </ul>
</template>


<style scoped></style>