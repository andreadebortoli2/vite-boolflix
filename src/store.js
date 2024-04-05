import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
    movieUrl: 'https://api.themoviedb.org/3/search/movie',
    tvUrl: 'https://api.themoviedb.org/3/search/tv',
    apiKey: '7c7d2baca05b9819b69763a53ed1d49d',
    languageFilter: 'language=it',
    posterImgUrl: 'http://image.tmdb.org/t/p',
    posterSize: 'w342',
    genresListMovieUrl: 'https://api.themoviedb.org/3/genre/movie/list',
    genresListTvUrl: 'https://api.themoviedb.org/3/genre/tv/list',
    searchText: '',
    searchedMovieList: null,
    searchedTvList: null,
    movieCastApiUrl: 'https://api.themoviedb.org/3/movie/',
    tvCastApiUrl: 'https://api.themoviedb.org/3/tv/',
    searchContent() {
        if (this.searchText !== '') {

            this.searchedMovieList = [];
            this.searchedTvList = [];

            const searchMovieUrl = `${this.movieUrl}?api_key=${this.apiKey}&query=${this.searchText}&${this.languageFilter}`;

            const searchtvUrl = `${this.tvUrl}?api_key=${this.apiKey}&query=${this.searchText}&${this.languageFilter}`;

            axios.get(searchMovieUrl).then(response => {
                // console.log(response.data.results);

                response.data.results.forEach(movie => { this.searchedMovieList.push(movie) });
            });

            axios.get(searchtvUrl).then(response => {
                // console.log(response.data.results);

                response.data.results.forEach(tv => this.searchedTvList.push(tv));
            });

            // console.log(store.searchedList);

        } else {
            this.searchedMovieList = null;
            this.searchedTvList = null;
        };
    },
})