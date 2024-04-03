<script>
import { store } from '../store';
import axios from 'axios';

export default {
    name: 'AppHeader',
    data() {
        return {
            store,
            searchText: '',
        }
    },
    methods: {
        searchMovie(text) {
            // console.log(store.moviesList);
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=7c7d2baca05b9819b69763a53ed1d49d&query=${text}&language=it-IT`).then(response => {
                // console.log(response);
                this.store.moviesList = response.data.results
                // console.log(store.moviesList);
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

</template>


<style></style>