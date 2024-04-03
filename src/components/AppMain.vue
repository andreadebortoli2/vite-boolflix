<script>
import { store } from '../store';
import MovieCard from './MovieCard.vue';

export default {
    name: 'AppMain',
    components: {
        MovieCard,
    },
    data() {
        return {
            store,
        }
    }
}
</script>

<template>
    <ul class="sarech_response" v-for="movie in store.moviesList">
        <MovieCard :title="movie.title" :originalTitle="movie.original_title" :language="movie.original_language"
            :vote="movie.vote_average" />
    </ul>
</template>


<style scoped></style>