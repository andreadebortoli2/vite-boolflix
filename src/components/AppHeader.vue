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

        searchContent(text) {

            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=7c7d2baca05b9819b69763a53ed1d49d&language=it-IT&query=${text}`).then(response => {
                // console.log(response.data.results);

                response.data.results.forEach(movie => { this.store.searchedList.push(movie) });
            });

            axios.get(`https://api.themoviedb.org/3/search/tv?api_key=7c7d2baca05b9819b69763a53ed1d49d&language=it_IT&query=${text}`).then(response => {
                // console.log(response.data.results);

                response.data.results.forEach(tv => this.store.searchedList.push(tv));
            });

            // console.log(store.searchedList);
        }
    },
    mounted() {

    }
}
</script>

<template>
    <div>
        <input type="text" v-model="searchText" placeholder="Write the title you looking for">
        <button @click="searchContent(searchText)">Search</button>
    </div>

</template>


<style></style>