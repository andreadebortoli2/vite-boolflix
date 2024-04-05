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
    genresListMovie: [],
    genresListTv: [],
    // debug before finish reset searchText has ''(empty string)
    searchText: 'la montagna sacra',
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
            axios.get(searchMovieUrl)
                .then(response => {
                    // console.log(response.data.results);
                    if (response.data.results.length === 0) {
                        this.searchedMovieList = null;
                    } else {
                        response.data.results.forEach(movie => { this.searchedMovieList.push(movie) });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            axios.get(searchtvUrl)
                .then(response => {
                    // console.log(response.data.results);
                    if (response.data.results.length === 0) {
                        this.searchedTvList = null;
                    } else {
                        response.data.results.forEach(tv => this.searchedTvList.push(tv));
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            // console.log(store.searchedList);
        } else {
            this.searchedMovieList = null;
            this.searchedTvList = null;
        };
    },
    generateGenreLists() {
        const movieGenresUrl = `${this.genresListMovieUrl}?api_key=${this.apiKey}&${this.languageFilter}`;
        const tvGenresUrl = `${this.genresListTvUrl}?api_key=${this.apiKey}&${this.languageFilter}`;
        axios.get(movieGenresUrl)
            .then(response => {
                // console.log(response.data.genres);
                this.genresListMovie = response.data.genres
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get(tvGenresUrl)
            .then(response => {
                // console.log(response.data.genres);
                this.genresListTv = response.data.genres
            })
            .catch(function (error) {
                console.log(error);
            });
    },
})