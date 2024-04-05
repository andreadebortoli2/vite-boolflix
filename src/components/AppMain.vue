<script>
import { store } from '../store';
import ContentCard from './ContentCard.vue';

export default {
    name: 'AppMain',
    components: {
        ContentCard,
    },
    data() {
        return {
            store,
        }
    },
    mounted() {
        store.generateGenreLists()
    }
}
</script>

<template>
    <div class="container">
        <h2 v-if="store.searchedMovieList !== null">MOVIES</h2>
        <div class="search_response">
            <ContentCard :id="content.id" :image="content.poster_path" :title="content.title"
                :originalTitle="content.original_title" :language="content.original_language"
                :vote="content.vote_average" :overview="content.overview" :castUrl="store.movieCastApiUrl"
                :genreIds="content.genre_ids" :genresList="store.genresListMovie"
                v-for="content in store.searchedMovieList" />
            <div class="empty_array_message"
                v-if="store.searchedMovieList !== null && store.searchedMovieList.length === 0">
                NESSUN RISULTATO TROVATO
            </div>
        </div>
    </div>
    <div class="container">
        <h2 v-if="store.searchedTvList !== null">TV SHOWS</h2>
        <div class="search_response">
            <ContentCard :id="content.id" :image="content.poster_path" :title="content.name"
                :originalTitle="content.original_name" :language="content.original_language"
                :vote="content.vote_average" :overview="content.overview" :castUrl="store.tvCastApiUrl"
                :genreIds="content.genre_ids" :genresList="store.genresListTv"
                v-for="content in store.searchedTvList" />
            <div class="empty_array_message" v-if="store.searchedTvList !== null && store.searchedTvList.length === 0">
                NESSUN RISULTATO TROVATO
            </div>
        </div>
    </div>
</template>


<style>
.search_response {
    display: flex;
    gap: 5px;
    overflow-x: auto;
    padding: 1rem 0;
}

h2 {
    padding: 1rem 2rem;
    color: ivory;
    background-color: darkcyan;
    width: fit-content;
    border-radius: 0.5rem;
}

.empty_array_message {
    height: 100px;
    width: 500px;
    margin: 0 auto;
    background-color: darkcyan;
    text-align: center;
    line-height: 100px;
    font-size: 2rem;
    font-weight: bold;
    color: ivory;
    border-radius: 1rem;
}
</style>