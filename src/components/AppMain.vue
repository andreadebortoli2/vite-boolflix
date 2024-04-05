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
        store.generateGenreLists();
    }
}
</script>

<template>
    <section class="container" id="movies">
        <div class="movie_header" v-if="store.searchedMovieList !== null">
            <h2>MOVIES</h2>
            <div class="genres">
                <div v-for="genre in store.genresListMovie">
                    <input type="checkbox" :id="genre.name" :name="genre.name" :value="genre.id"
                        v-model="store.filterList">
                    <label :for="genre.name">{{ genre.name }}</label>
                </div>
            </div>
        </div>
        <!-- / movies_header -->
        <div class="search_response">
            <ContentCard :id="content.id" :image="content.poster_path" :title="content.title"
                :originalTitle="content.original_title" :language="content.original_language"
                :vote="content.vote_average" :overview="content.overview" :castUrl="store.movieCastApiUrl"
                :genreIds="content.genre_ids" :genresList="store.genresListMovie" :filterList="store.filterList"
                v-for="content in store.searchedMovieList" />
            <!-- / card -->
            <div class="empty_array_message"
                v-if="store.searchedMovieList !== null && store.searchedMovieList.length === 0">
                NESSUN RISULTATO TROVATO
            </div>
            <!-- / empty_array_message -->
        </div>
    </section>
    <!-- / # movies -->
    <section class="container" id="tv_shows">
        <div class="tv_shows_header" v-if="store.searchedTvList !== null">
            <h2>TV SHOWS</h2>
            <div class="genres">
                <div v-for="genre in store.genresListTv">
                    <input type="checkbox" :id="genre.name" :name="genre.name" :value="genre.id"
                        v-model="store.filterList">
                    <label :for="genre.name">{{ genre.name }}</label>
                </div>
            </div>
        </div>
        <!-- / tv_shows_header -->
        <div class="search_response">
            <ContentCard :id="content.id" :image="content.poster_path" :title="content.name"
                :originalTitle="content.original_name" :language="content.original_language"
                :vote="content.vote_average" :overview="content.overview" :castUrl="store.tvCastApiUrl"
                :genreIds="content.genre_ids" :genresList="store.genresListTv" :filterList="store.filterList"
                v-for="content in store.searchedTvList" />
            <!-- / card -->
            <div class="empty_array_message" v-if="store.searchedTvList !== null && store.searchedTvList.length === 0">
                NESSUN RISULTATO TROVATO
            </div>
            <!-- / empty_array_message -->
        </div>
    </section>
    <!-- / # tv_shows -->
</template>


<style scoped>
.search_response {
    display: flex;
    gap: 5px;
    overflow-x: auto;
    padding: 1rem 0 0;
}

h2 {
    padding: 1rem 2rem;
    color: ivory;
    background-color: darkcyan;
    width: fit-content;
    border-radius: 0.5rem;
}

.genres {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem 0 0.5rem;

    input {
        width: 0;
        margin: 1rem 0.5rem;

        &:checked+label {
            background-color: darkcyan;
            border: 2px solid darkcyan;
        }
    }

    label {
        padding: 0.2rem 0.3rem;
        background-color: rgba(88, 191, 195, 0.7);
        border: 2px solid rgba(88, 191, 195, 0.1);
        border-radius: 1rem;
        color: ivory;

        &:hover {
            border: 2px solid darkcyan;
        }
    }
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